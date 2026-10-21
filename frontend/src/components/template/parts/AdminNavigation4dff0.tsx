export default function AdminNavigation4dff0() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/panel/admin/comments/replied"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-text nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"></path>
              <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"></path>
            </svg>
            <div className="nav-item-text">
              <div>{'نظرات مرتبط با اسناد'}</div>
              <div>{'Comments Documents'}</div>
            </div>
            <div className="nav-item-text-2">{'نظرات'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a className="sidebar-extended-pages-link" href="/panel/admin/comments/replied">
            {' نظرات تائید شده '}
          </a>
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/panel/admin/comments/pending"
          >
            {' نظرات تائید نشده '}
          </a>
        </div>
      </div>
    </>
  );
}
