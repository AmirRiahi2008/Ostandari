export default function AdminNavigationcce32() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/panel/admin/menu-groups"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
            </svg>
            <div className="nav-item-text">
              <div>{'مدیریت سایت'}</div>
              <div>{'Manage Site'}</div>
            </div>
            <div className="nav-item-text-2">{' سایت'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a className="sidebar-extended-pages-link" href="/panel/admin/menu-groups">
            {' منو '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/slide-groups">
            {' اسلایدشوها '}
          </a>
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/panel/admin/news-groups"
          >
            {' گروه های خبری '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/document-groups">
            {' اسناد '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/tags">
            {' تگ های خبری '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/organization-contact">
            {' تعیین موقعیت جغرافیایی '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/gallery-groups">
            {' گالری تصاویر '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/media-groups">
            {' چندرسانه ای '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/quotes">
            {' سخن روز '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/faqs">
            {' پرسش های متداول '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/polls">
            {' نظرسنجی '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/links">
            {' پیوندها '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/calls">
            {' مدیریت فراخوانها '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/advertisements">
            {' مدیریت تبلیغات '}
          </a>
        </div>
      </div>
    </>
  );
}
