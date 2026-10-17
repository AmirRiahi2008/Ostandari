export default function AdminNavigation90a32() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/admin/governor/pending"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a1 1 0 0 0-.8.4L8 8.917 14.8 3.9A1 1 0 0 0 14 3.5zm13 1.183-4.708 3.472L15 12.25zM14.247 13 9.163 9.345 8 10.083l-1.163-.738L1.753 13zM1 12.25l4.708-4.095L1 4.683z"></path>
            </svg>
            <div className="nav-item-text">
              <div>{'پیام های رئیس سازمان'}</div>
              <div>{'Manage Users'}</div>
            </div>
            <div className="nav-item-text-2">{' سایت'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/admin/governor/replied"
          >
            {' پیام های پاسخ داده شده '}
          </a>
          <a className="sidebar-extended-pages-link" href="/admin/governor/pending">
            {' پیام های پاسخ داده نشده '}
          </a>
        </div>
      </div>
    </>
  );
}
