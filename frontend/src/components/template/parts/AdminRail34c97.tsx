export default function AdminRail34c97() {
  return (
    <>
      <div className="sidebar shrink">
        <div className="sidebar-contents">
          <div className="sidebar-profile">
            <div className="sidebar-profile-top">
              <div className="sidebar-profile-top-right makecenter">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  ></path>
                </svg>
                <div className="sidebar-profile-top-right-role">{'مدیر'}</div>
              </div>
              <div className="sidebar-profile-top-left">
                <div className="sidebar-profile-top-left-item">{'مدیر سامانه '}</div>
                <div className="sidebar-profile-top-left-item">
                  <div className="sidebar-profile-top-left-item-number">
                    <span> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar-profile-bottom"></div>
          </div>
          <div className="nav-bar-parent d-3b633e27ed6c97">
            <div className="nav-bar" dir="ltr">
              <a href="/admin" className="nav-item">
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'داشبورد'}</div>
                  <div>{'Dashboard'}</div>
                </div>
                <div className="nav-item-text-2">{' داشبورد'}</div>
              </a>
              <a href="/admin/menu-groups" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
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
              <a href="/admin/internal-users" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  ></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'مدیریت کاربران'}</div>
                  <div>{'Manage Users'}</div>
                </div>
                <div className="nav-item-text-2">{' کاربران'}</div>
              </a>
              <a href="/admin/organizations" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'مدیریت سازمان ها'}</div>
                  <div>{' Members'}</div>
                </div>
                <div className="nav-item-text-2">{'سازمان‌ها'}</div>
              </a>
              <a href="/admin/forum-groups" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{' مدیریت تالار گفتوگو '}</div>
                  <div>{' Discussion Forum'}</div>
                </div>
                <div className="nav-item-text-2">{' گفتوگو'}</div>
              </a>
              <a href="/admin/service-groups" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 112 81"
                  fill="none"
                  className="bi bi-book nav-item-icon"
                >
                  <g clipPath="url(#s3998a4-0-clip0_479_107)">
                    <path
                      d="M69.7358 55.1798C76.8591 55.1798 82.6336 49.4052 82.6336 42.2819C82.6336 35.1586 76.8591 29.384 69.7358 29.384C62.6125 29.384 56.8379 35.1586 56.8379 42.2819C56.8379 49.4052 62.6125 55.1798 69.7358 55.1798Z"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M106.073 51.4463C103.839 60.2935 98.4536 68.0214 90.9268 73.1796C83.4 78.3379 74.2493 80.5718 65.1923 79.4622C56.1353 78.3525 47.7946 73.9756 41.7357 67.1529C35.6767 60.3302 32.316 51.5307 32.2844 42.406C32.2528 33.2814 35.5524 24.4588 41.5639 17.5942C47.5754 10.7297 55.8855 6.29504 64.9346 5.12263C73.9837 3.95023 83.1496 6.12067 90.712 11.2266C98.2744 16.3325 103.713 24.0229 106.008 32.8544"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M100.006 50.9109C97.9266 58.2101 93.2824 64.5133 86.927 68.6616C80.5716 72.8099 72.9322 74.5244 65.4136 73.4897C57.895 72.4551 51.0027 68.7409 46.0041 63.0301C41.0054 57.3193 38.2364 49.9959 38.2063 42.4066C38.1762 34.8172 40.887 27.472 45.8402 21.7218C50.7934 15.9716 57.6561 12.2028 65.1662 11.1085C72.6763 10.0143 80.3291 11.6681 86.7172 15.7658C93.1053 19.8636 97.7994 26.1298 99.9361 33.4122"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M79.1562 32.8645H110.651V51.4466H79.1562"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M69.7354 51.7017C74.9378 51.7017 79.1553 47.4842 79.1553 42.2817C79.1553 37.0793 74.9378 32.8618 69.7354 32.8618C64.5329 32.8618 60.3154 37.0793 60.3154 42.2817C60.3154 47.4842 64.5329 51.7017 69.7354 51.7017Z"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M69.7362 9.3268C70.5494 9.3268 71.2086 8.66755 71.2086 7.85432C71.2086 7.04109 70.5494 6.38184 69.7362 6.38184C68.9229 6.38184 68.2637 7.04109 68.2637 7.85432C68.2637 8.66755 68.9229 9.3268 69.7362 9.3268Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M69.7362 78.2584C70.5494 78.2584 71.2086 77.5992 71.2086 76.786C71.2086 75.9727 70.5494 75.3135 69.7362 75.3135C68.9229 75.3135 68.2637 75.9727 68.2637 76.786C68.2637 77.5992 68.9229 78.2584 69.7362 78.2584Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M94.1082 19.421C94.9215 19.421 95.5807 18.7618 95.5807 17.9486C95.5807 17.1353 94.9215 16.4761 94.1082 16.4761C93.295 16.4761 92.6357 17.1353 92.6357 17.9486C92.6357 18.7618 93.295 19.421 94.1082 19.421Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M45.366 68.1642C46.1793 68.1642 46.8385 67.505 46.8385 66.6917C46.8385 65.8785 46.1793 65.2192 45.366 65.2192C44.5528 65.2192 43.8936 65.8785 43.8936 66.6917C43.8936 67.505 44.5528 68.1642 45.366 68.1642Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M35.2713 43.7914C36.0845 43.7914 36.7438 43.1322 36.7438 42.3189C36.7438 41.5057 36.0845 40.8464 35.2713 40.8464C34.4581 40.8464 33.7988 41.5057 33.7988 42.3189C33.7988 43.1322 34.4581 43.7914 35.2713 43.7914Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M94.1082 68.1642C94.9215 68.1642 95.5807 67.505 95.5807 66.6917C95.5807 65.8785 94.9215 65.2192 94.1082 65.2192C93.295 65.2192 92.6357 65.8785 92.6357 66.6917C92.6357 67.505 93.295 68.1642 94.1082 68.1642Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M45.366 19.421C46.1793 19.421 46.8385 18.7618 46.8385 17.9486C46.8385 17.1353 46.1793 16.4761 45.366 16.4761C44.5528 16.4761 43.8936 17.1353 43.8936 17.9486C43.8936 18.7618 44.5528 19.421 45.366 19.421Z"
                      fill="#3d4855"
                    ></path>
                    <path
                      d="M21.3 57.0981V79.7481H6.09668V57.0981"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M6.09668 28.7394V1.73145H21.3V28.7394"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M26.1391 28.7395H1.04492V57.1009H26.1391V28.7395Z"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M33.7995 53.6178H26.1396V30.9456H33.7995"
                      stroke="#3d4855"
                      strokeWidth="2.65261"
                      strokeMiterlimit="10"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="s3998a4-0-clip0_479_107">
                      <rect
                        width="111.589"
                        height="80"
                        fill="white"
                        transform="translate(0.0537109 0.73999)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                <div className="nav-item-text">
                  <div>{' مدیریت امکانات '}</div>
                  <div>{' Manage Facilities '}</div>
                </div>
                <div className="nav-item-text-2">{'امکانات'}</div>
              </a>
              <a href="/admin/subscribers" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search nav-item-icon nav-item-icon-active"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'مدیریت اعضا خبرنامه'}</div>
                  <div>{'Newsletter Users'}</div>
                </div>
                <div className="nav-item-text-2">{'خبرنامه'}</div>
              </a>
              <a href="/admin/employees" className="nav-item">
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
                  <div>{' مدیریت فرم ها '}</div>
                  <div>{'Manage Forms '}</div>
                </div>
                <div className="nav-item-text-2">{'فرم‌ها'}</div>
              </a>
              <a href="/admin/governor/replied" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'پیام‌های رئیس سازمان'}</div>
                  <div>{' Sms Organization '}</div>
                </div>
                <div className="nav-item-text-2">{' پیام‌ها'}</div>
              </a>
              <a href="/admin/comments/replied" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'نظرات'}</div>
                  <div>{'Comments Documents'}</div>
                </div>
                <div className="nav-item-text-2">{' نظرات'}</div>
              </a>
              <a href="/admin/contact/pending" className="nav-item">
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
                  <div>{'تماس باما'}</div>
                  <div>{'contact us'}</div>
                </div>
                <div className="nav-item-text-2">{' تماس باما'}</div>
              </a>
              <a href="/services" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'گزارشات'}</div>
                  <div>{'Reports'}</div>
                </div>
                <div className="nav-item-text-2">{' گزارشات'}</div>
              </a>
              <a href="/admin/images" className="nav-item">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-building nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{'متفرقه ها'}</div>
                  <div>{'Misc'}</div>
                </div>
                <div className="nav-item-text-2">{' متفرقه ها'}</div>
              </a>
            </div>
            <div className="nav-bar-bottom">
              <a className="nav-item" href="/admin/forms">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"></path>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.291.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"></path>
                </svg>
                <div className="nav-item-text">
                  <div>{' Manage Work Page '}</div>
                  <div>{' مدیریت مکاتبات'}</div>
                </div>
                <div className="nav-item-text-2">{'مدیریت '}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
