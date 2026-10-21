export default function AdminNavigation950ad() {
  return (
    <>
      <div className="sidebar-extended">
        <div className="sidebar-extended-top">
          <a
            href="/panel/admin/employees"
            className="nav-item av-item-active nav-item-new-mail remove-border"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-map nav-item-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"
              ></path>
            </svg>
            <div className="nav-item-text">
              <div>{'مدیریت فرم ها'}</div>
              <div>{' Manage Forms '}</div>
            </div>
            <div className="nav-item-text-2">{' امکانات'}</div>
          </a>
        </div>
        <div className="sidebar-extended-pages">
          <a className="sidebar-extended-pages-link" href="/panel/admin/employees">
            {' مدیریت کارمندان '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/experts">
            {' مدیریت کارشناسان فرم '}
          </a>
          <a
            className="sidebar-extended-pages-link sidebar-extended-pages-link-active"
            href="/panel/admin/form-groups"
          >
            {' لیست گروه بندی ویژگی ها '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/forms">
            {' لیست فرم ها '}
          </a>
          <a className="sidebar-extended-pages-link" href="/panel/admin/submissions">
            {' متقاضیان فرم ها '}
          </a>
        </div>
      </div>
    </>
  );
}
