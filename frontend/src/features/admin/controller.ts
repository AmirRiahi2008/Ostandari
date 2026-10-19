import { api, ApiError, jsonBody, upload } from '@/lib/api/client';
import { all, date, feedback, fieldError, one, setImage, setOptions } from '@/lib/dom';
import { closeOverlays, rowActions, toggleModal } from '@/lib/alpine/ui';
import { collectFields, fieldForColumn, fillFields } from './fields';
import { lookupRecords, lookupResource, resourceRows, resourceScope } from './resources';
import type { PageContext, RecordData } from '@/types/portal';

export function adminController(context: PageContext) {
  const { root, page, signal, preview } = context;
  let records: RecordData[] = [];
  let editing: RecordData | null = null;
  let busy = false;
  let currentQuery = '';
  let currentPage = 1;
  let loadVersion = 0;
  const tbody = one<HTMLTableSectionElement>(
    root,
    '#educationTableBody, .main-content table tbody',
  );
  const prototype = tbody?.querySelector('tr')?.cloneNode(true) as HTMLTableRowElement | undefined;
  const headers = all(root, '.main-content table thead th').map((cell) =>
    fieldForColumn(cell.textContent ?? '', page.resource),
  );
  const modal = () => one<HTMLElement>(root, '#cbnCreateMenuModalOverlay');
  const endpoint = page.resource === 'media' ? 'media' : 'admin/' + page.resource;
  const reviewOnly =
    ['tickets', 'submissions', 'subscribers'].includes(page.resource) ||
    page.resource.startsWith('moderation/');
  if (prototype)
    all(prototype, '#cbnOpenCreateMenuModalBtn').forEach((button) => button.removeAttribute('id'));
  all(root, 'tbody #cbnOpenCreateMenuModalBtn').forEach((button) => button.removeAttribute('id'));
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
      all<HTMLAnchorElement>(row, '[data-related-resource="menu-items"]').forEach((link) => {
        link.href = '/admin/menu-items?menu_id=' + encodeURIComponent(String(record.id));
      });
      if (page.resource === 'media')
        all(row, '[data-command="editRecord"],[data-command="openEditCommitmentModal"]').forEach(
          (button) => button.remove(),
        );
      all<HTMLTableCellElement>(row, 'td').forEach((cell, i) => {
        const key = headers[i];
        if (key === '_actions' || cell.querySelector('[data-command]')) return;
        if (key === '_inactive' || cell.querySelector('input[type=checkbox]')) {
          const input = one<HTMLInputElement>(cell, 'input');
          if (input) {
            input.checked = key === '_inactive' ? !record.is_active : Boolean(record.is_active);
            input.dataset.toggleActive = 'true';
          }
          return;
        }
        if (key === 'image') {
          setImage(
            one<HTMLImageElement>(cell, 'img'),
            record.image ?? record.cover ?? (page.resource === 'media' ? record : null),
          );
          return;
        }
        if (page.resource === 'media' && cell.textContent?.includes('دانلود')) {
          const link = document.createElement('a');
          link.href = '/api/backend/media/' + encodeURIComponent(String(record.id)) + '/download';
          link.textContent = 'دانلود فایل';
          cell.replaceChildren(link);
          return;
        }
        const data =
          key === '_index'
            ? index + 1
            : key === '_form_title'
              ? (record.form as RecordData | undefined)?.title
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
    if (!records.length) tableMessage('موردی برای نمایش وجود ندارد.');
  }

  function tableMessage(message: string) {
    if (!tbody) return;
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = Math.max(headers.length, 1);
    cell.textContent = message;
    row.append(cell);
    tbody.replaceChildren(row);
  }

  function pagination(meta?: { current_page: number; last_page: number }) {
    let navigation = one<HTMLElement>(root, '[data-admin-pagination]');
    if (!navigation) {
      navigation = document.createElement('nav');
      navigation.dataset.adminPagination = 'true';
      navigation.setAttribute('aria-label', 'صفحه‌های فهرست');
      tbody?.closest('table')?.parentElement?.after(navigation);
    }
    navigation.replaceChildren();
    if (!meta || meta.last_page <= 1) return;
    const status = document.createElement('span');
    status.setAttribute('aria-live', 'polite');
    status.textContent = ` صفحهٔ ${meta.current_page.toLocaleString('fa-IR')} از ${meta.last_page.toLocaleString('fa-IR')} `;
    for (const [label, target] of [
      ['صفحهٔ قبل', meta.current_page - 1],
      ['صفحهٔ بعد', meta.current_page + 1],
    ] as const) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button-designv2';
      button.textContent = label;
      button.dataset.adminPage = String(target);
      button.disabled = target < 1 || target > meta.last_page;
      navigation.append(button);
      if (target < meta.current_page) navigation.append(status);
    }
  }

  async function load(query = currentQuery, selectedPage = currentPage) {
    if (preview || !page.resource) return;
    const version = ++loadVersion;
    const params = new URLSearchParams({ ...page.defaults, per_page: '100' });
    params.set('page', String(selectedPage));
    if (page.resource === 'menu-items') {
      const menu = new URLSearchParams(window.location.search).get('menu_id');
      if (menu && /^\d+$/.test(menu)) params.set('menu_id', menu);
    }
    if (query) params.set('q', query);
    if (['settings', 'roles'].includes(page.resource)) params.delete('per_page');
    const result = await api<RecordData[] | RecordData>(endpoint + '?' + params, { signal });
    if (signal.aborted || version !== loadVersion) return;
    currentQuery = query;
    currentPage = result.meta?.current_page ?? selectedPage;
    records = resourceRows(page.resource, result.data);
    if (!records.length && currentPage > 1) return load(query, currentPage - 1);
    paint();
    pagination(result.meta);
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
        const lookup = select.dataset.lookup ?? mapping[key];
        const resource = lookup ? lookupResource(lookup) : '';
        if (!resource) return;
        try {
          const records = await lookupRecords(resource, signal);
          setOptions(
            select,
            records,
            resource === 'media'
              ? 'original_name'
              : resource === 'roles'
                ? 'label'
                : records[0]?.name !== undefined
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
      let data: RecordData = {
        ...page.defaults,
        ...collectFields(node),
        ...resourceScope(page.resource),
      };
      for (const key of ['type', 'kind']) if (page.defaults[key]) data[key] = page.defaults[key];
      delete data.person_type;
      if (page.resource === 'users') {
        data.person_type = page.defaults.person_type ?? 'staff';
        if (!editing) {
          if (!data.role_id) {
            const result = await api<unknown>('admin/roles');
            data.role_id = resourceRows('roles', result.data).find(
              (role) => role.name === (data.person_type === 'citizen' ? 'citizen' : 'editor'),
            )?.id;
          }
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
            const attachments = (parent: HTMLElement, media: unknown) => {
              if (!Array.isArray(media)) return;
              for (const file of media as RecordData[]) {
                if (!file.id) continue;
                const link = document.createElement('a');
                link.href =
                  '/api/backend/media/' + encodeURIComponent(String(file.id)) + '/download';
                link.textContent = 'دریافت پیوست: ' + String(file.original_name ?? file.id);
                const line = document.createElement('p');
                line.append(link);
                parent.append(line);
              }
            };
            attachments(details, editing.media);
            if (Array.isArray(editing.messages))
              for (const message of editing.messages as RecordData[]) {
                const paragraph = document.createElement('p');
                const author = message.author as RecordData | undefined;
                paragraph.textContent =
                  (message.is_internal ? 'یادداشت داخلی — ' : '') +
                  String(author?.name ?? '') +
                  ': ' +
                  String(message.body ?? '');
                attachments(paragraph, message.media);
                details.append(paragraph);
              }
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
      const editor = modal();
      if (editor?.classList.contains('active')) fieldError(editor, error);
      else feedback(root, error instanceof Error ? error.message : 'عملیات ناموفق بود.');
    }
  }

  function init() {
    if (page.resource && tbody && modal()) {
      if (reviewOnly)
        one<HTMLElement>(root, '#cbnOpenCreateMenuModalBtn')?.setAttribute('hidden', '');
      else if (!one(root, '#cbnOpenCreateMenuModalBtn')) {
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'cbnOpenCreateMenuModalBtn';
        button.className = 'button-designv1';
        button.textContent = 'افزودن مورد جدید';
        one(root, '.main-content section header,.main-content-header')?.append(button);
      }
      if (
        !['settings', 'roles', 'media'].includes(page.resource) &&
        !one(root, '.main-content form.search-box-wrapper')
      ) {
        const form = document.createElement('form');
        form.className = 'search-box-wrapper';
        const input = document.createElement('input');
        input.id = 'searchInput';
        input.type = 'search';
        input.placeholder = 'جستجو…';
        input.setAttribute('aria-label', 'جستجو در فهرست');
        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.className = 'button-designv1';
        submit.textContent = 'جستجو';
        form.append(input, submit);
        tbody.closest('table')?.parentElement?.before(form);
      }
      if (
        !reviewOnly &&
        page.resource !== 'settings' &&
        prototype &&
        !prototype.querySelector('[data-command="deleteRecord"]')
      ) {
        const cell = prototype.children[headers.indexOf('_actions')];
        if (cell) {
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.className = 'button-designv2';
          remove.dataset.command = 'deleteRecord';
          remove.textContent = 'حذف';
          cell.append(remove);
        }
      }
    }
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
        const paging = target.closest<HTMLElement>('[data-admin-page]');
        if (paging)
          void load(currentQuery, Number(paging.dataset.adminPage)).catch((error) =>
            feedback(root, error.message),
          );
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
              : {
                  locale: 'fa',
                  priority: 0,
                  is_active: true,
                  ...resourceScope(page.resource),
                  ...page.defaults,
                },
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
          void load(one<HTMLInputElement>(root, '#searchInput')?.value ?? '', 1).catch((error) =>
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
        void load('', 1).catch((error) => feedback(root, error.message));
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
        const previous =
          headers[Array.from(input.closest('tr')!.children).indexOf(input.closest('td')!)] ===
          '_inactive'
            ? !record.is_active
            : Boolean(record.is_active);
        input.disabled = true;
        try {
          writeable();
          void api(endpoint + '/' + record.id, {
            method: 'PATCH',
            body: jsonBody({ is_active: !record.is_active }),
          })
            .then(() => load())
            .catch((error) => {
              input.checked = previous;
              feedback(root, error.message);
            })
            .finally(() => {
              input.disabled = false;
            });
        } catch (error) {
          input.checked = previous;
          input.disabled = false;
          feedback(root, String(error));
        }
      },
      { signal },
    );
    if (!preview && page.resource) {
      tableMessage('در حال دریافت اطلاعات…');
      void Promise.all([load(), relatedOptions()]).catch((error) => {
        tableMessage('دریافت اطلاعات انجام نشد. دوباره تلاش کنید.');
        if (error instanceof ApiError && error.status === 401)
          window.location.assign('/admin/login?return=' + encodeURIComponent(page.path));
        else feedback(root, error.message);
      });
    }
  }
  return { init, dispatch };
}
