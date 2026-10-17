import { api, ApiError, jsonBody, upload } from '@/lib/api/client';
import { all, date, feedback, fieldError, one, setImage, setOptions } from '@/lib/dom';
import { closeOverlays, rowActions, toggleModal } from '@/lib/alpine/ui';
import { collectFields, fieldForColumn, fillFields } from './fields';
import type { PageContext, RecordData } from '@/types/portal';

export function adminController(context: PageContext) {
  const { root, page, signal, preview } = context;
  let records: RecordData[] = [];
  let editing: RecordData | null = null;
  let busy = false;
  const tbody = one<HTMLTableSectionElement>(
    root,
    '#educationTableBody, .main-content table tbody',
  );
  const prototype = tbody?.querySelector('tr')?.cloneNode(true) as HTMLTableRowElement | undefined;
  const headers = all(root, '.main-content table thead th').map((cell) =>
    fieldForColumn(cell.textContent ?? ''),
  );
  const modal = () => one<HTMLElement>(root, '#cbnCreateMenuModalOverlay');
  const endpoint = page.resource === 'media' ? 'media' : 'admin/' + page.resource;
  const writeable = () => {
    if (preview)
      throw new Error(
        'حالت نمایش طرح فعال است. برای ثبت واقعی، TEMPLATE_PREVIEW=false و بک‌اند را اجرا کنید.',
      );
  };

  function paint() {
    if (!tbody || !prototype) return;
    tbody.replaceChildren();
    records.forEach((record, index) => {
      const row = prototype.cloneNode(true) as HTMLTableRowElement;
      row.dataset.record = String(record.reference ?? record.id ?? index);
      all<HTMLTableCellElement>(row, 'td').forEach((cell, i) => {
        const key = headers[i];
        if (key === '_actions') return;
        if (key === '_inactive' || cell.querySelector('input[type=checkbox]')) {
          const input = one<HTMLInputElement>(cell, 'input');
          if (input) {
            input.checked = key === '_inactive' ? !record.is_active : Boolean(record.is_active);
            input.dataset.toggleActive = 'true';
          }
          return;
        }
        if (key === 'image') {
          setImage(one<HTMLImageElement>(cell, 'img'), record.image ?? record.cover);
          return;
        }
        const data =
          key === '_index'
            ? index + 1
            : key === 'created_at'
              ? date(record.created_at)
              : key === 'locale'
                ? ({ fa: 'فارسی', en: 'انگلیسی', ar: 'عربی' }[String(record.locale) as 'fa'] ??
                  record.locale)
                : key === 'is_active'
                  ? record.is_active
                    ? 'فعال'
                    : 'غیرفعال'
                  : key === 'name' && page.resource === 'media'
                    ? record.original_name
                    : record[key];
        cell.textContent =
          data === null || data === undefined || typeof data === 'object' ? '' : String(data);
      });
      tbody.append(row);
    });
  }

  async function load(query = '') {
    if (preview || !page.resource) return;
    const params = new URLSearchParams({ ...page.defaults, per_page: '100' });
    if (query) params.set('q', query);
    if (['settings', 'roles'].includes(page.resource)) params.delete('per_page');
    const result = await api<RecordData[] | RecordData>(endpoint + '?' + params, { signal });
    records = Array.isArray(result.data) ? result.data : [];
    paint();
    root.dataset.ready = 'true';
  }

  async function relatedOptions() {
    if (preview) return;
    const node = modal();
    if (!node) return;
    const mapping: Record<string, string> = {
      organization_id: 'organizations',
      county_id: 'counties',
      menu_id: 'menus',
      parent_id: page.resource,
      category_id: 'categories',
      role_id: 'roles',
      assigned_to: 'users',
    };
    await Promise.all(
      all<HTMLSelectElement>(node, 'select[data-field]').map(async (select) => {
        const key = select.dataset.field ?? '';
        const resource = select.dataset.lookup ?? mapping[key];
        if (!resource) return;
        try {
          const result = await api<RecordData[]>(
            (resource === 'media' ? 'media' : 'admin/' + resource) + '?per_page=100',
            { signal },
          );
          if (Array.isArray(result.data))
            setOptions(
              select,
              result.data,
              resource === 'media'
                ? 'original_name'
                : resource === 'roles'
                  ? 'label'
                  : result.data[0]?.name !== undefined
                    ? 'name'
                    : 'title',
            );
        } catch {
          select.replaceChildren(new Option('دسترسی یا داده‌ای موجود نیست', ''));
        }
      }),
    );
  }

  async function save() {
    writeable();
    const node = modal();
    if (!node || busy) return;
    const form = one<HTMLFormElement>(node, 'form');
    if (form && !form.reportValidity()) return;
    busy = true;
    try {
      let data: RecordData = { ...page.defaults, ...collectFields(node) };
      delete data.person_type;
      if (page.resource === 'users') {
        data.person_type = page.defaults.person_type ?? 'staff';
        if (!editing) {
          const roles = (await api<RecordData[]>('admin/roles')).data;
          data.role_id ??= roles.find(
            (role) => role.name === (data.person_type === 'citizen' ? 'citizen' : 'editor'),
          )?.id;
        }
      }
      if (page.resource === 'menus' && !editing && !data.key)
        data.key = 'menu-' + crypto.randomUUID().slice(0, 8);
      if (page.resource === 'categories' && !data.type) data.type = 'news';
      if (page.resource === 'organizations' && !data.type) data.type = 'department';
      if (page.resource === 'members' && !data.kind) data.kind = 'manager';
      if (['calls', 'publications'].includes(page.resource) && !data.body)
        data.body = String(data.description ?? '');
      const file = one<HTMLInputElement>(node, 'input[type=file]')?.files?.[0];
      if (file)
        data[one<HTMLInputElement>(node, 'input[type=file]')?.dataset.mediaField ?? 'media_id'] =
          await upload(file, 'public');
      if (page.resource === 'media') {
        if (!file) throw new Error('فایل را انتخاب کنید.');
        closeOverlays(root);
        await load();
        return;
      }
      if (editing) delete data.password_confirmation;
      if (
        ['tickets', 'submissions', 'subscribers'].includes(page.resource) ||
        page.resource.startsWith('moderation/')
      ) {
        if (!editing) throw new Error('ابتدا یک مورد را از فهرست برای بررسی انتخاب کنید.');
      }
      const key = editing ? String(editing.reference ?? editing.id) : '';
      const reply = page.resource === 'tickets' ? String(data.reply ?? '') : '';
      if (page.resource === 'tickets') delete data.reply;
      await api(endpoint + (page.resource === 'settings' ? '' : editing ? '/' + key : ''), {
        method: page.resource === 'settings' ? 'PUT' : editing ? 'PATCH' : 'POST',
        body: jsonBody(data),
      });
      if (reply.trim())
        await api(endpoint + '/' + key + '/messages', {
          method: 'POST',
          body: jsonBody({ body: reply }),
        });
      closeOverlays(root);
      editing = null;
      await load();
    } finally {
      busy = false;
    }
  }

  async function dispatch(command: string, element: HTMLElement) {
    try {
      if (command === 'printSection') {
        window.print();
        return;
      }
      const key = element.closest<HTMLElement>('tr[data-record]')?.dataset.record;
      const record = records.find((item) => String(item.reference ?? item.id) === key);
      if (command === 'cbnToggleActionsMenu') {
        rowActions(root, element);
        return;
      }
      if (['closeModal', 'closeEditCommitmentModal'].includes(command)) {
        closeOverlays(root);
        return;
      }
      if (['openEditCommitmentModal', 'editRecord'].includes(command)) {
        editing = record ?? null;
        if (
          editing &&
          !preview &&
          !['roles', 'settings', 'subscribers'].includes(page.resource) &&
          !page.resource.startsWith('moderation/')
        )
          editing = (
            await api<RecordData>(endpoint + '/' + String(editing.reference ?? editing.id))
          ).data;
        if (modal()) {
          fillFields(
            modal()!,
            page.resource === 'settings'
              ? {
                  settings: records.map((record) => ({
                    key: record.key,
                    value: record.value,
                    is_public: record.is_public,
                  })),
                }
              : (editing ?? {}),
          );
          if (editing && ['tickets', 'submissions'].includes(page.resource)) {
            let details = one<HTMLElement>(modal()!, '[data-record-detail]');
            if (!details) {
              details = document.createElement('div');
              details.dataset.recordDetail = 'true';
              details.className = 'portal-record-detail';
              modal()!.querySelector('.cbn-modal-body')?.prepend(details);
            }
            details.textContent =
              String(editing.subject ?? editing.reference ?? '') +
              '\n' +
              String(editing.body ?? JSON.stringify(editing.data ?? ''));
          }
          toggleModal(root, true);
        }
        return;
      }
      if (command === 'saveRecord') {
        await save();
        return;
      }
      if (command === 'deleteRecord' && record) {
        if (
          ['tickets', 'submissions', 'settings'].includes(page.resource) ||
          page.resource.startsWith('moderation/')
        )
          throw new Error('این بخش از طریق بررسی و تغییر وضعیت مدیریت می‌شود.');
        writeable();
        if (!window.confirm('این مورد حذف شود؟')) return;
        await api(endpoint + '/' + String(record.reference ?? record.id), { method: 'DELETE' });
        await load();
      }
    } catch (error) {
      fieldError(modal() ?? root, error);
    }
  }

  function init() {
    const setProfile = (name: string, mobile = '') => {
      all<HTMLElement>(
        root,
        '#clickdiv1 .header-bigitem-text,.sidebar-profile-top-left-item:first-child,.bigitem-menu1 .bigitem-menu-top p',
      ).forEach((element) => {
        element.textContent = name;
      });
      all(root, '.sidebar-profile-top-left-item-number span').forEach((element) => {
        element.textContent = mobile;
      });
    };
    if (preview) setProfile('مدیر محلی');
    else
      void api<{ name: string; mobile?: string }>('auth/me', { signal })
        .then((result) => setProfile(result.data.name, result.data.mobile))
        .catch(() => {});

    all<HTMLElement>(root, '.bigitem-menu-bottom-item').forEach((item) => {
      const label = item.textContent?.trim();
      if (label === 'خروج') item.setAttribute('data-admin-logout', 'true');
      else if (label === 'تنظیمات حساب') item.setAttribute('data-navigate', '/admin/account');
      else if (label === 'وظایف') item.setAttribute('data-navigate', '/duties');
      if (label === 'خروج' || label === 'تنظیمات حساب' || label === 'وظایف') {
        item.setAttribute('role', 'button');
        item.tabIndex = 0;
      }
    });
    root.addEventListener(
      'click',
      (event) => {
        const target = event.target as HTMLElement;
        if (target.closest('[data-admin-logout],a[href="/admin/logout"]')) {
          event.preventDefault();
          void import('@/components/admin/account')
            .then((module) => module.logoutAdmin(preview))
            .catch((error) => feedback(root, error.message));
        }
        if (target.closest('.sadyar-header-left-righ-createbtn'))
          window.location.assign('/admin/menu-items');
        if (target.closest('#openBtn,#openModalBtn')) window.location.assign('/assistant');
      },
      { signal },
    );
    if (preview) {
      all(root, '.header-bigitem-text,.sidebar-profile-top-left-item').forEach((item) => {
        if (/کامیار|حق شناس|093607/.test(item.textContent ?? '')) item.textContent = 'مدیر محلی';
      });
      const area = one(root, '.main-content');
      if (area) {
        const note = document.createElement('p');
        note.className = 'portal-preview-note';
        note.textContent =
          'نمایش محلی طرح‌ها؛ برای ثبت و ویرایش اطلاعات پایگاه داده، بک‌اند را اجرا کنید و TEMPLATE_PREVIEW=false قرار دهید.';
        area.prepend(note);
      }
    }
    try {
      if (localStorage.getItem('portal-admin-theme') === 'dark') root.classList.add('portal-dark');
    } catch {}

    one(root, '#cbnOpenCreateMenuModalBtn')?.addEventListener(
      'click',
      () => {
        editing = null;
        const node = modal();
        if (node)
          fillFields(
            node,
            page.resource === 'settings'
              ? {
                  settings: records.map((record) => ({
                    key: record.key,
                    value: record.value,
                    is_public: record.is_public,
                  })),
                }
              : { locale: 'fa', priority: 0, is_active: true, ...page.defaults },
          );
      },
      { signal },
    );
    root.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (form.closest('#cbnCreateMenuModalOverlay'))
          void save().catch((error) => fieldError(form, error));
        else if (form.classList.contains('search-box-wrapper'))
          void load(one<HTMLInputElement>(root, '#searchInput')?.value ?? '').catch((error) =>
            feedback(root, String(error)),
          );
      },
      { signal },
    );
    one(root, '#resetSearchBtn')?.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        const input = one<HTMLInputElement>(root, '#searchInput');
        if (input) input.value = '';
        void load();
      },
      { signal },
    );
    root.addEventListener(
      'change',
      (event) => {
        const input = event.target as HTMLInputElement;
        if (!input.dataset.toggleActive) return;
        const record = records.find(
          (item) => String(item.id) === input.closest<HTMLElement>('tr')?.dataset.record,
        );
        if (!record) return;
        try {
          writeable();
          void api(endpoint + '/' + record.id, {
            method: 'PATCH',
            body: jsonBody({ is_active: !record.is_active }),
          })
            .then(() => load())
            .catch((error) => feedback(root, error.message));
        } catch (error) {
          feedback(root, String(error));
        }
      },
      { signal },
    );
    if (!preview && page.resource)
      void Promise.all([load(), relatedOptions()]).catch((error) => {
        if (error instanceof ApiError && error.status === 401)
          window.location.assign('/login?return=' + encodeURIComponent(page.path));
        else feedback(root, error.message);
      });
  }
  return { init, dispatch };
}
