import type { Alpine as AlpineType } from 'alpinejs';
import type { PageContext, TemplatePage } from '@/types/portal';
import { bindUi, closeOverlays } from './ui';

type ContextInput = {
  page: TemplatePage;
  preview: boolean;
  path: string;
  navigate?: (href: string) => void;
};
const contexts = new WeakMap<HTMLElement, ContextInput>();
let singleton: Promise<AlpineType> | undefined;

function getAlpine(): Promise<AlpineType> {
  singleton ??= import('alpinejs').then(({ default: Alpine }) => {
    Alpine.data('portalPage', () => ({
      busy: false,
      mobileOpen: false,
      abort: new AbortController(),
      async init() {
        const root = this.$el as HTMLElement;
        const input = contexts.get(root);
        if (!input) return;
        const context: PageContext = { ...input, root, signal: this.abort.signal };
        const controller =
          input.page.controller === 'admin'
            ? (await import('@/features/admin/controller')).adminController(context)
            : input.page.controller === 'citizen'
              ? (await import('@/features/citizen/controller')).citizenController(context)
              : input.page.controller === 'auth'
                ? { init: () => {}, dispatch: () => {} }
                : (await import('@/features/site/controller')).siteController(context);
        if (this.abort.signal.aborted) return;
        bindUi(context, (command, element, args) => {
          this.busy = true;
          Promise.resolve(controller.dispatch(command, element, args)).finally(() => {
            this.busy = false;
          });
        });
        this.$watch('mobileOpen', (open: boolean) => {
          root.querySelector('#mobileMenu')?.classList.toggle('active', open);
          root.querySelector('#mobileMenu')?.classList.toggle('open', open);
          root.querySelector('#mmBackdrop')?.classList.toggle('active', open);
        });
        root.addEventListener(
          'portal:mobile',
          (event) => {
            this.mobileOpen = (event as CustomEvent<boolean>).detail;
          },
          { signal: this.abort.signal },
        );
        root.setAttribute('x-bind:aria-busy', 'busy');
        root.setAttribute('x-on:keydown.escape.window', 'dismiss()');
        if (input.page.controller === 'auth')
          (await import('@/features/auth/controller')).initAuth(context);
        else controller.init();
      },
      dismiss() {
        closeOverlays(this.$el as HTMLElement);
        this.mobileOpen = false;
      },
      destroy() {
        this.abort.abort();
      },
    }));
    Alpine.start();
    return Alpine;
  });
  return singleton;
}

export function mountPortal(root: HTMLElement, input: ContextInput): () => void {
  contexts.set(root, input);
  let cancelled = false;
  let instance: AlpineType | undefined;
  void getAlpine().then((Alpine) => {
    if (cancelled) return;
    instance = Alpine;
    Alpine.mutateDom(() => {
      // Alpine's observer may mark React's new DOM before this effect adds x-data.
      // Reset that earlier scan so page navigation still initializes portalPage.
      Alpine.destroyTree(root);
      root.setAttribute('x-data', 'portalPage');
      Alpine.initTree(root);
    });
  });
  return () => {
    cancelled = true;
    if (instance)
      instance.mutateDom(() => {
        instance?.destroyTree(root);
        root.removeAttribute('x-data');
      });
    contexts.delete(root);
  };
}
