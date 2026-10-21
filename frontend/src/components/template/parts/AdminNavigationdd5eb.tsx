export default function AdminNavigationdd5eb() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/panel/admin/images"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
            </svg>
            <div className="nav-item-text">
              <div>{'متفرقه ها'}</div>
              <div>{'Misc'}</div>
            </div>
            <div className="nav-item-text-2">{' متفرقه'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a className="sidebar-extended-pages-link" href="/panel/admin/images">
            {' عکس های متفرقه '}
          </a>
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/panel/admin/files"
          >
            {' فایل های متفرقه '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/item-order">
            {' تنظیمات آیتم ها '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/item-order">
            {' تنظیمات متفرقه ها '}
          </a>
        </div>
      </div>
    </>
  );
}
