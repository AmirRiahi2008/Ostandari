import { all, commandArgs, one } from '@/lib/dom';
import type { PageContext } from '@/types/portal';

export function closeOverlays(root: HTMLElement): void {
  all(
    root,
    '.cbn-modal-overlay,.top-modal-overlay,.cbn-actions-menu,.install-app-overlay,#panel,#panelOverlay,#lightboxOverlay,#flagDropdown',
  ).forEach((element) =>
    element.classList.remove('active', 'show', 'open', 'cbn-actions-menu-open'),
  );
}

export function toggleModal(root: HTMLElement, open: boolean): void {
  one(root, '#cbnCreateMenuModalOverlay,#editCommitmentModal')?.classList.toggle('active', open);
}

export function bindUi(
  context: PageContext,
  dispatch: (command: string, element: HTMLElement, args: string[], event: Event) => void,
): void {
  const { root, signal } = context;
  const listen = (type: string, action: EventListener) =>
    root.addEventListener(type, action, { signal });
  listen('click', (event) => {
    const target = event.target as HTMLElement;
    const commandElement = target.closest<HTMLElement>('[data-command],[data-navigate]');
    if (commandElement && root.contains(commandElement)) {
      if (commandElement.dataset.navigate) {
        window.location.assign(commandElement.dataset.navigate);
        return;
      }
      if (!commandElement.dataset.commandEvent || commandElement.dataset.commandEvent === 'click') {
        event.preventDefault();
        dispatch(
          commandElement.dataset.command ?? '',
          commandElement,
          commandArgs(commandElement.dataset.commandArgs ?? ''),
          event,
        );
      }
    }
    if (target.closest('#cbnOpenCreateMenuModalBtn')) {
      event.preventDefault();
      toggleModal(root, true);
    }
    if (target.closest('#cbnCloseCreateMenuModalBtn,.cbn-modal-close')) toggleModal(root, false);
    if (target.matches('.cbn-modal-overlay,.top-modal-overlay,.install-app-overlay'))
      closeOverlays(root);
    const tab = target.closest<HTMLElement>('.tab-btn');
    if (tab?.dataset.tab) {
      const group = tab.closest('.tabs') ?? tab.parentElement;
      const tabs = all<HTMLElement>(group ?? root, '.tab-btn');
      tabs.forEach((element) => {
        const active = element === tab;
        element.classList.toggle('active', active);
        element.setAttribute('aria-selected', String(active));
        if (element.dataset.tab)
          one(root, '#' + CSS.escape(element.dataset.tab))?.classList.toggle('active', active);
      });
      tab.classList.add('active');
      one(root, '#' + CSS.escape(tab.dataset.tab))?.classList.add('active');
    }
    if (target.closest('#sidebarHamburgerBtn,.hambergur-responsive-btn')) {
      one(root, '#sidebarParent,.sidebar-parent,.sidebar')?.classList.toggle('open');
      one(root, '#sidebarDarkBg,.dark-background-tablet')?.classList.toggle('open');
    }
    if (target.closest('#clicksidebar')) {
      const sidebar = one(root, '.sidebar-parent,.sidebar');
      if (window.innerWidth <= 900) sidebar?.classList.toggle('open');
      else one(root, '.sidebar')?.classList.toggle('shrink');
    }
    if (
      target.closest('#sidebarCloseBtn,.sidebar-close-btn,#sidebarDarkBg,.dark-background-tablet')
    ) {
      all(root, '.sidebar-parent,.sidebar,.dark-background-tablet').forEach((element) =>
        element.classList.remove('open'),
      );
    }
    const accordion = target.closest<HTMLElement>('.sidebar-extended-pages-link');
    if (accordion?.closest('.menu-item')?.querySelector('.submenu-items')) {
      event.preventDefault();
      accordion.closest('.menu-item')?.querySelector('.submenu-items')?.classList.toggle('open');
    }
    const headerButton = target.closest<HTMLElement>('[id^=clickdiv]');
    if (headerButton) {
      const number = headerButton.id.replace('clickdiv', '');
      one(root, '#hiddendiv' + number)?.classList.toggle('active');
      headerButton.classList.toggle('highlight');
    }
    if (target.closest('#clickforsearch')) window.location.assign('/search');
    if (target.closest('#theme-toggle')) {
      const dark = root.classList.toggle('portal-dark');
      try {
        localStorage.setItem('portal-admin-theme', dark ? 'dark' : 'light');
      } catch {}
      target.closest('#theme-toggle')?.setAttribute('aria-pressed', String(dark));
    }
  });
  listen('keydown', (event) => {
    const key = event as KeyboardEvent;
    if (!['Enter', ' '].includes(key.key)) return;
    const button = (key.target as HTMLElement).closest<HTMLElement>(
      '[role="button"]:not(button):not(a)',
    );
    if (button && root.contains(button)) {
      key.preventDefault();
      button.click();
    }
  });
  listen('input', (event) => {
    const target = event.target as HTMLElement;
    if (target.dataset.command && target.dataset.commandEvent === 'input')
      dispatch(
        target.dataset.command,
        target,
        commandArgs(target.dataset.commandArgs ?? ''),
        event,
      );
  });
  listen('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.type === 'file' && input.files?.[0]) {
      const label = input.parentElement?.querySelector<HTMLElement>(
        '.file-name,[id*=FileName],[id*=fileName]',
      );
      if (label) label.textContent = input.files[0].name;
    }
  });
  root.addEventListener(
    'error',
    (event) => {
      const image = event.target as HTMLImageElement;
      if (image.tagName === 'IMG' && image.dataset.hideOnError) image.hidden = true;
    },
    { capture: true, signal },
  );
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') closeOverlays(root);
    },
    { signal },
  );
}

export function rowActions(root: HTMLElement, trigger: HTMLElement): void {
  const menu = trigger
    .closest('.cbn-actions-wrapper')
    ?.querySelector<HTMLElement>('.cbn-actions-menu');
  if (!menu) return;
  const wasOpen = menu.classList.contains('cbn-actions-menu-open');
  all(root, '.cbn-actions-menu-open').forEach((element) =>
    element.classList.remove('cbn-actions-menu-open'),
  );
  if (wasOpen) return;
  menu.classList.add('cbn-actions-menu-open');
  const box = trigger.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.left =
    Math.max(8, Math.min(box.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - 8)) +
    'px';
  menu.style.top =
    Math.max(8, Math.min(box.bottom + 6, window.innerHeight - menu.offsetHeight - 8)) + 'px';
}
