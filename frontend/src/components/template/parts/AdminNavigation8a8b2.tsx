export default function AdminNavigation8a8b2() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/admin/contact/replied"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi bi-chat nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 1 .737-.149l2.522 1.01c.329.132.445.52.274.822l-1.096 1.83a.678.678 0 0 0 .145.856l2.457 2.457a.678.678 0 0 0 .856.145l1.83-1.096a.678.678 0 0 1 .822.274l1.01 2.522a.678.678 0 0 1-.148.737l-1.2 1.2a1.745 1.745 0 0 1-1.86.437c-2.7-.9-5.7-3.9-6.6-6.6a1.745 1.745 0 0 1 .437-1.86z"></path>
            </svg>
            <div className="nav-item-text">
              <div>{'پیام های تماس با ما'}</div>
              <div>{'Manage Users'}</div>
            </div>
            <div className="nav-item-text-2">{' سایت'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a className="sidebar-extended-pages-link" href="/admin/governor/replied">
            {' پیام های پاسخ داده شده '}
          </a>
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/admin/governor/pending"
          >
            {' پیام های پاسخ داده نشده '}
          </a>
        </div>
      </div>
    </>
  );
}
