export default function AdminHeader7f990() {
  return (
    <>
      <div className="sadyar-header">
        <div className="sadyar-header-right makecenter">
          <div className="sadyar-header-right-text">
            <div>{'پنل'}</div>
            <div className="special-text-header">{'استانداری ماندران'}</div>
          </div>
        </div>
        <div className="sadyar-header-left">
          <div className="sadyar-header-left-right makecenter">
            <button
              className="hambergur-responsive-btn"
              id="sidebarHamburgerBtn"
              type="button"
              aria-label="باز کردن منو"
              aria-controls="sidebarParent"
              aria-expanded="false"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                ></path>
              </svg>
            </button>
          </div>
          <div className="sadyar-header-left-left">
            <div className="header-smallitem makecenter" id="clickdiv3">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
              </svg>
              <div className="bigitem-menu bigitem-menu3" id="hiddendiv3">
                <div className="bigitem-menu-top-notif">
                  <div className="bigitem-menu-top-notif-top">{' اعلان ها '}</div>
                  <div className="bigitem-menu-top-notif-bottom">{' بدون اعلان'}</div>
                </div>
                <div className="bigitem-menu-bottom">
                  <div className="bigitem-menu-bottom-item-notif">
                    <img alt="" />
                  </div>
                  <div className="makecenter notif-bottom-text">{' شما هیچ اعلانی ندارید.'}</div>
                </div>
              </div>
            </div>
            <div className="header-bigitem" id="clickdiv1">
              <div className="header-bigitem-logo makecenter">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                </svg>
              </div>
              <div className="bigitem-menu bigitem-menu1" id="hiddendiv1">
                <div className="bigitem-menu-top">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-video"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1z"></path>
                  </svg>
                  <p>{'آرمان قلی نژاد'}</p>
                </div>
                <div className="bigitem-menu-bottom">
                  <a className="bigitem-menu-bottom-item" href="/admin/account">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"></path>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"></path>
                    </svg>
                    <span>{' تنظیمات حساب'}</span>
                  </a>
                  <a className="bigitem-menu-bottom-item bigitem-menu-exit" href="/admin/logout">
                    <svg width="24" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16 9V15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M10.5 9.5L13 12L10.5 14.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M13 12H7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></circle>
                    </svg>
                    <span>{'خروج'}</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="header-bigitem" id="clickdiv2">
              <button className="header-bigitem-logo makecenter" type="button" aria-label="مدیریت">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope nav-item-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
                </svg>
              </button>
              <div className="header-bigitem-text makecenter">{' مکاتبات'}</div>
              <div className="bigitem-menu bigitem-menu2" id="hiddendiv2">
                <a href="/admin/account" className="bigitem-menu-options">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-grid"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"></path>
                  </svg>
                  {' سطح دسترسی '}
                </a>
                <div className="bigitem-menu-options">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-headset"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"></path>
                  </svg>
                  {' انتخاب '}
                </div>
                <div className="bigitem-menu-options">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-headset"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"></path>
                  </svg>
                  {' انتخاب '}
                </div>
                <div className="bigitem-menu-options">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-headset"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"></path>
                  </svg>
                  {' انتخاب '}
                </div>
                <div className="bigitem-menu-options">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-headset"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"></path>
                  </svg>
                  {' انتخاب '}
                </div>
              </div>
            </div>
            <div
              className="header-smallitem makecenter"
              id="openModalBtn"
              role="button"
              tabIndex={0}
              aria-label="باز کردن بخش"
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-headset"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"></path>
              </svg>
            </div>
            <div
              id="theme-toggle"
              className="header-smallitem makecenter"
              aria-label="Toggle dark/light mode"
              role="button"
              tabIndex={0}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-moon-stars"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"></path>
              </svg>
            </div>
            <div id="panel">
              <div id="handle"></div>
              <div className="content"></div>
            </div>
            <div className="container">
              <div className="chat-box" id="modalContent">
                <div className="chat-header">
                  <div className="header-img makecenter">
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
                  </div>
                  <div className="onvan-header">
                    <div className="title-name">{'کریمی'}</div>
                    <div className="title-text">{'پاسخگوی سوالات شما هستیم...'}</div>
                  </div>
                  <div
                    className="header-close"
                    data-command="closeModal"
                    data-command-args=""
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                    </svg>
                  </div>
                </div>
                <div className="chat-body">
                  <div className="send-container">
                    <div className="send-box">
                      <p>
                        {
                          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed reprehenderit voluptatibus ut, qui animi excepturi praesentium natus distinctio totam consequuntur obcaecati iusto rerum, aliquam illum numquam. Ut in saepe ea doloremque maxime ratione magnam eveniet!'
                        }
                      </p>
                      <div className="send-mosalas"></div>
                    </div>
                  </div>
                  <div className="recive-container">
                    <div className="recive-box">
                      <p>{'سلام امروز یک شنبه است و هنوزم نت ها وصل نشده است'}</p>
                      <div className="recive-mosalas"></div>
                    </div>
                  </div>
                  <div className="sadra">
                    <p>{'طراحی و توسعه، مهندسی صدرا رایانه نوین طبرستان'}</p>
                  </div>
                </div>
                <div className="chat-footer">
                  <form action="#" data-form="true">
                    <div className="chat-footer-right">
                      <div className="mice">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-mic"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"></path>
                          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"></path>
                        </svg>
                      </div>
                      <div className="payam-footer">
                        <input type="text" placeholder="پیام خود را بنویسید..." />
                      </div>
                    </div>
                    <div className="chat-footer-left">
                      <div className="emoji"></div>
                      <div className="sanjagh makecenter">
                        <label htmlFor="payam" className="makecenter payamsvg">
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-paperclip"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"></path>
                          </svg>
                        </label>
                        <input type="file" id="payam" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
