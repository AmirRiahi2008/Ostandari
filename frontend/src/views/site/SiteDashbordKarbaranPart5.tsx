export default function SiteDashbordKarbaranPart5() {
  return (
    <>
      <section id="screen-dashboard" className="screen">
        <div className="ribbon"></div>
        <header className="topbar">
          <div className="topbar-inner">
            <div className="topbar-brand">
              <div className="emblem">
                <svg viewBox="0 0 24 24" fill="none" stroke="#123C6D" strokeWidth="1.8">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div className="titles">
                <b>{'استانداری مازندران'}</b>
                <span>{'پرتال خدمات مردمی'}</span>
              </div>
            </div>
            <div className="topbar-actions">
              <div className="d-898c1886231cb0">
                <button
                  className="icon-btn"
                  data-command="toggleDD"
                  data-command-args="'dd-notif'"
                  data-command-event="click"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9">
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 01-3.46 0"></path>
                  </svg>
                  <span className="badge-dot">{'3'}</span>
                </button>
                <div className="dropdown wide" id="dd-notif">
                  <div className="dd-title">{'اعلان‌ها'}</div>
                  <div className="notif-item">
                    <b>{'گزارش شما بررسی شد'}</b>
                    <span>{'گزارش پسماند در ساری — وضعیت: ارجاع به سازمان مربوطه'}</span>
                  </div>
                  <div className="notif-item">
                    <b>{'پاسخ دفتر استاندار'}</b>
                    <span>{'به پیام شما درباره «کیفیت آب شرب» پاسخ داده شد'}</span>
                  </div>
                  <div className="notif-item">
                    <b>{'نظرسنجی جدید'}</b>
                    <span>{'اولویت‌های توسعه استان — نظر خود را ثبت کنید'}</span>
                  </div>
                </div>
              </div>
              <div
                className="user-chip d-898c1886231cb0"
                data-command="toggleDD"
                data-command-args="'dd-user'"
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <div className="avatar" id="user-avatar-initial">
                  {'ک'}
                </div>
                <div className="who">
                  <b id="chip-name">{'محمدرضا عزیزی'}</b>
                  <span className="num" id="chip-phone">
                    {'09121234567'}
                  </span>
                </div>
                <svg className="chev" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
                <div className="dropdown" id="dd-user">
                  <div
                    className="dd-item"
                    data-command="showView"
                    data-command-args="'profile'"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {' پروفایل من'}
                  </div>
                  <div
                    className="dd-item"
                    data-command="showView"
                    data-command-args="'track'"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    {' گزارش‌های من'}
                  </div>
                  <hr />
                  <div
                    className="dd-item danger"
                    data-command="logout"
                    data-command-args=""
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    {' خروج از حساب'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="dash-main">
          <nav className="sidebar" id="sidebar">
            <div className="nav-group open" data-group="home">
              <div
                className="nav-group-head"
                data-command="toggleGroup"
                data-command-args="this"
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <span>{'داشبورد'}</span>
                <svg className="grp-chev" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
              <div className="nav-group-body">
                <div
                  className="nav-item active"
                  data-view="home"
                  data-command="showView"
                  data-command-args="'home'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                    <path d="M9 22V12h6v10"></path>
                  </svg>
                  {' خانه '}
                </div>
              </div>
            </div>
            <div className="nav-group" data-group="report">
              <div
                className="nav-group-head"
                data-command="toggleGroup"
                data-command-args="this"
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <span>{'گزارش و پیگیری'}</span>
                <svg className="grp-chev" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
              <div className="nav-group-body">
                <div
                  className="nav-item"
                  data-view="report"
                  data-command="showView"
                  data-command-args="'report'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  {' ثبت گزارش جدید '}
                </div>
                <div
                  className="nav-item"
                  data-view="track"
                  data-command="showView"
                  data-command-args="'track'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  {' پیگیری گزارش‌ها '}
                  <span className="nav-count" id="count-reports">
                    {'4'}
                  </span>
                </div>
              </div>
            </div>
            <div className="nav-group" data-group="comm">
              <div
                className="nav-group-head"
                data-command="toggleGroup"
                data-command-args="this"
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <span>{'ارتباطات'}</span>
                <svg className="grp-chev" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
              <div className="nav-group-body">
                <div
                  className="nav-item"
                  data-view="governor"
                  data-command="showView"
                  data-command-args="'governor'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  {' ارتباط با استاندار '}
                </div>
                <div
                  className="nav-item"
                  data-view="news"
                  data-command="showView"
                  data-command-args="'news'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M15.54 8.46a5 5 0 010 7.07"></path>
                  </svg>
                  {' اطلاعیه‌ها و اخبار '}
                </div>
                <div
                  className="nav-item"
                  data-view="poll"
                  data-command="showView"
                  data-command-args="'poll'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  {' نظرسنجی مردمی '}
                </div>
              </div>
            </div>
            <div className="nav-group" data-group="help">
              <div
                className="nav-group-head"
                data-command="toggleGroup"
                data-command-args="this"
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <span>{'راهنما'}</span>
                <svg className="grp-chev" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
              <div className="nav-group-body">
                <div
                  className="nav-item"
                  data-view="faq"
                  data-command="showView"
                  data-command-args="'faq'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 115.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  {' سوالات متداول '}
                </div>
                <div
                  className="nav-item"
                  data-view="directory"
                  data-command="showView"
                  data-command-args="'directory'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  {' دفترچه تلفن ادارات '}
                </div>
              </div>
            </div>
            <div className="side-divider"></div>
            <div
              className="nav-item"
              data-view="profile"
              data-command="showView"
              data-command-args="'profile'"
              data-command-event="click"
              role="button"
              tabIndex={0}
              aria-label="باز کردن بخش"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {' پروفایل من '}
            </div>
            <div
              className="nav-item danger"
              data-command="logout"
              data-command-args=""
              data-command-event="click"
              role="button"
              tabIndex={0}
              aria-label="باز کردن بخش"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {' خروج از حساب کاربری '}
            </div>
            <div className="sidebar-cta">
              <p>
                {
                  'مشکلی که با گزینه‌های موجود مطابقت ندارد؟ مستقیماً برای دفتر استاندار پیام بفرستید.'
                }
              </p>
              <button
                data-command="showView"
                data-command-args="'governor'"
                data-command-event="click"
              >
                {'ارسال پیام مستقیم'}
              </button>
            </div>
          </nav>
          <main className="content">
            <div className="view active" id="view-home">
              <div className="view-head">
                <div>
                  <h1 id="home-greeting">{'صبح بخیر، محمدرضا'}</h1>
                  <p>{'خلاصه‌ای از فعالیت‌های شما در پرتال خدمات مردمی مازندران'}</p>
                </div>
                <span className="greeting-pill num" id="home-date">
                  {'1404/04/15'}
                </span>
              </div>
              <div className="quick-actions">
                <div
                  className="qa-btn primary"
                  data-command="showView"
                  data-command-args="'report'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  {' ثبت گزارش جدید '}
                </div>
                <div
                  className="qa-btn"
                  data-command="showView"
                  data-command-args="'governor'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  {' پیام به استاندار '}
                </div>
                <div
                  className="qa-btn"
                  data-command="showView"
                  data-command-args="'directory'"
                  data-command-event="click"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  {' شماره‌های ضروری '}
                </div>
              </div>
              <div className="grid-3">
                <div className="card">
                  <div className="card-head">
                    <h3>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                      {' گزارش‌های من'}
                    </h3>
                    <a
                      data-command="showView"
                      data-command-args="'track'"
                      data-command-event="click"
                      href="/news"
                    >
                      {'مشاهده'}
                    </a>
                  </div>
                  <div className="stat-row">
                    <span>{'در حال بررسی'}</span>
                    <b>{'2'}</b>
                  </div>
                  <div className="stat-row">
                    <span>{'بسته‌شده / نتیجه‌دار'}</span>
                    <b className="pos">{'2'}</b>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    <h3>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {' پیام‌های استاندار'}
                    </h3>
                    <a
                      data-command="showView"
                      data-command-args="'governor'"
                      data-command-event="click"
                      href="/news"
                    >
                      {'مشاهده'}
                    </a>
                  </div>
                  <div className="stat-row">
                    <span>{'در انتظار پاسخ'}</span>
                    <b className="neg">{'1'}</b>
                  </div>
                  <div className="stat-row">
                    <span>{'پاسخ‌داده‌شده'}</span>
                    <b className="pos">{'3'}</b>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    <h3>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                      {' نظرسنجی‌ها'}
                    </h3>
                    <a
                      data-command="showView"
                      data-command-args="'poll'"
                      data-command-event="click"
                      href="/news"
                    >
                      {'مشاهده'}
                    </a>
                  </div>
                  <div className="stat-row">
                    <span>{'نظرسنجی فعال'}</span>
                    <b>{'1'}</b>
                  </div>
                  <div className="stat-row">
                    <span>{'مشارکت‌های شما'}</span>
                    <b>{'3'}</b>
                  </div>
                </div>
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {' آخرین وضعیت گزارش شما'}
                    </h3>
                    <a
                      data-command="showView"
                      data-command-args="'track'"
                      data-command-event="click"
                      href="/news"
                    >
                      {'جزئیات'}
                    </a>
                  </div>
                  <div className="ring-wrap">
                    <div className="ring">
                      <svg width="96" height="96" viewBox="0 0 96 96">
                        <circle
                          className="bg"
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          strokeWidth="9"
                        ></circle>
                        <circle
                          className="fg"
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          strokeWidth="9"
                          strokeDasharray="251.2"
                          strokeDashoffset="90"
                        ></circle>
                      </svg>
                      <div className="ring-label">
                        <b>{'روز ۳'}</b>
                        <span>{'از ۷ روز'}</span>
                      </div>
                    </div>
                    <div className="ring-info">
                      <b>{'گزارش پسماند خیابان فرهنگ، ساری'}</b>
                      <span>
                        {
                          'گزارش شما در حال بررسی توسط سازمان مدیریت پسماند شهرداری ساری است. مهلت پاسخ‌گویی استاندارد ۷ روز کاری می‌باشد.'
                        }
                      </span>
                      <span className="status-badge status-review">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {' در حال بررسی'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    <h3>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M15.54 8.46a5 5 0 010 7.07"></path>
                      </svg>
                      {' آخرین اطلاعیه‌ها'}
                    </h3>
                    <a
                      data-command="showView"
                      data-command-args="'news'"
                      data-command-event="click"
                      href="/news"
                    >
                      {'همه اخبار'}
                    </a>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">{'افتتاح فاز نخست بازسازی ساحل بابلسر'}</div>
                      <div className="li-sub">{'حوزه عمرانی و گردشگری'}</div>
                    </div>
                    <div className="li-date num">{'1404/04/10'}</div>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">{'برگزاری جلسه شورای ترافیک استان'}</div>
                      <div className="li-sub">{'حوزه حمل‌ونقل شهری'}</div>
                    </div>
                    <div className="li-date num">{'1404/04/06'}</div>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">
                        {'فراخوان مشارکت مردمی طرح تفکیک زباله از مبدا'}
                      </div>
                      <div className="li-sub">{'حوزه محیط‌زیست'}</div>
                    </div>
                    <div className="li-date num">{'1404/03/29'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="view" id="view-report">
              <div className="view-head">
                <div>
                  <h1>{'ثبت گزارش جدید'}</h1>
                  <p>{'موضوع مورد نظر خود را انتخاب کرده و مشکل را با جزئیات شرح دهید.'}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h3>{'۱. انتخاب موضوع گزارش'}</h3>
                </div>
                <div className="cat-grid" id="cat-grid"></div>
                <div className="card-head">
                  <h3>{'۲. جزئیات گزارش'}</h3>
                </div>
                <div className="form-grid">
                  <div className="field full">
                    <label>{'عنوان کوتاه گزارش'}</label>
                    <input
                      className="input"
                      id="rep-title"
                      placeholder="مثال: تجمع زباله در خیابان فرهنگ"
                    />
                  </div>
                  <div className="field">
                    <label>{'شهرستان'}</label>
                    <select className="input" id="rep-city">
                      <option>{'ساری'}</option>
                      <option>{'بابل'}</option>
                      <option>{'آمل'}</option>
                      <option>{'قائم‌شهر'}</option>
                      <option>{'بهشهر'}</option>
                      <option>{'چالوس'}</option>
                      <option>{'نوشهر'}</option>
                      <option>{'رامسر'}</option>
                      <option>{'تنکابن'}</option>
                      <option>{'بابلسر'}</option>
                      <option>{'محمودآباد'}</option>
                      <option>{'سایر'}</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>{'آدرس دقیق یا نشانی محل'}</label>
                    <input
                      className="input"
                      id="rep-address"
                      placeholder="خیابان، محله، نشانه‌ها..."
                    />
                  </div>
                  <div className="field full">
                    <label>{'شرح کامل مشکل'}</label>
                    <textarea
                      className="input"
                      id="rep-desc"
                      placeholder="مثال: پسماند های جمع‌آوری نشده در این منطقه از شهر باعث نارضایتی ساکنین شده و بوی نامطبوع ایجاد کرده است..."
                    ></textarea>
                  </div>
                  <div className="field full">
                    <label>{'سطح اهمیت'}</label>
                    <div className="seg" id="urgency-seg">
                      <div className="seg-opt" data-val="کم">
                        {'کم'}
                      </div>
                      <div className="seg-opt selected" data-val="متوسط">
                        {'متوسط'}
                      </div>
                      <div className="seg-opt" data-val="زیاد">
                        {'زیاد'}
                      </div>
                      <div className="seg-opt urgent" data-val="فوری">
                        {'فوری / خطرساز'}
                      </div>
                    </div>
                  </div>
                  <div className="field full">
                    <label>{'افزودن عکس (اختیاری)'}</label>
                    <div className="upload-box">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <div>
                        <b>{'برای انتخاب تصویر کلیک کنید'}</b>
                        {' یا فایل را بکشید و رها کنید'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    className="btn btn-secondary"
                    data-command="resetReportForm"
                    data-command-args=""
                    data-command-event="click"
                  >
                    {'پاک کردن فرم'}
                  </button>
                  <button
                    className="btn btn-submit"
                    data-command="submitReport"
                    data-command-args=""
                    data-command-event="click"
                  >
                    {' ثبت و ارسال گزارش '}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="view" id="view-track">
              <div className="view-head">
                <div>
                  <h1>{'پیگیری گزارش‌ها'}</h1>
                  <p>{'وضعیت گزارش‌های ثبت‌شده توسط شما'}</p>
                </div>
              </div>
              <div className="filter-row" id="filter-row">
                <div className="filter-chip active" data-f="all">
                  {'همه'}
                </div>
                <div className="filter-chip" data-f="review">
                  {'در حال بررسی'}
                </div>
                <div className="filter-chip" data-f="referred">
                  {'ارجاع‌شده'}
                </div>
                <div className="filter-chip" data-f="resolved">
                  {'حل‌شده'}
                </div>
                <div className="filter-chip" data-f="rejected">
                  {'رد‌شده'}
                </div>
              </div>
              <div id="reports-list"></div>
            </div>
            <div className="view" id="view-governor">
              <div className="view-head">
                <div>
                  <h1>{'ارتباط با استاندار'}</h1>
                  <p>{'پیام خود را مستقیماً برای دفتر استاندار مازندران ارسال کنید.'}</p>
                </div>
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3>{'ارسال پیام جدید'}</h3>
                  </div>
                  <div className="field">
                    <label>{'موضوع پیام'}</label>
                    <input
                      className="input"
                      id="gov-subject"
                      placeholder="مثال: پیگیری وضعیت آب شرب روستای ... "
                    />
                  </div>
                  <div className="field">
                    <label>{'متن پیام'}</label>
                    <textarea
                      className="input"
                      id="gov-msg"
                      placeholder="پیام خود را با احترام و به‌طور شفاف شرح دهید..."
                    ></textarea>
                  </div>
                  <div className="form-actions d-f62bc9de219970">
                    <button
                      className="btn btn-submit"
                      data-command="submitGovMsg"
                      data-command-args=""
                      data-command-event="click"
                    >
                      {' ارسال پیام '}
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="gov-card">
                    <div className="gov-photo">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="gov-info">
                      <b>{'دفتر استاندار مازندران'}</b>
                      <span>{'واحد ارتباطات مردمی و سرکشی'}</span>
                    </div>
                  </div>
                  <div className="info-line">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {' میانگین زمان پاسخ‌گویی: ۳ تا ۵ روز کاری'}
                  </div>
                  <div className="info-line">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"></path>
                    </svg>
                    {' تلفن دفتر ارتباطات مردمی: '}
                    <span className="num d-71542b8fb4fd03">{'011-33333333'}</span>
                  </div>
                  <div className="info-line">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {' آدرس: ساری، خیابان پاسداران، ساختمان مرکزی استانداری'}
                  </div>
                  <div className="side-divider"></div>
                  <div className="card-head d-fc9258d7a8fdd5">
                    <h3>{'پیام‌های پیشین شما'}</h3>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">{'وضعیت آسفالت جاده روستایی'}</div>
                      <div className="li-sub">{'پاسخ داده شد'}</div>
                    </div>
                    <span className="status-badge status-resolved">{'پاسخ‌داده‌شد'}</span>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">{'کیفیت آب شرب منطقه'}</div>
                      <div className="li-sub">{'پاسخ داده شد'}</div>
                    </div>
                    <span className="status-badge status-resolved">{'پاسخ‌داده‌شد'}</span>
                  </div>
                  <div className="list-item">
                    <div className="list-dot"></div>
                    <div>
                      <div className="li-title">{'درخواست بازدید میدانی'}</div>
                      <div className="li-sub">{'در انتظار بررسی'}</div>
                    </div>
                    <span className="status-badge status-review">{'در انتظار'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="view" id="view-news">
              <div className="view-head">
                <div>
                  <h1>{'اطلاعیه‌ها و اخبار استان'}</h1>
                  <p>{'آخرین رویدادها و تصمیمات استانداری مازندران'}</p>
                </div>
              </div>
              <div className="card">
                <div className="news-card">
                  <div className="news-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <path d="M3 21h18"></path>
                      <path d="M5 21V7l7-4 7 4v14"></path>
                      <path d="M9 9h1M9 13h1M14 9h1M14 13h1"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="news-tag num">{'1404/04/10 · عمرانی'}</span>
                    <h4>{'افتتاح فاز نخست بازسازی ساحل بابلسر'}</h4>
                    <p>
                      {
                        'پروژه بازسازی خط ساحلی بابلسر با هدف توسعه گردشگری و ایمن‌سازی سواحل، با حضور مسئولان استانی افتتاح شد.'
                      }
                    </p>
                  </div>
                </div>
                <div className="news-card">
                  <div className="news-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </div>
                  <div>
                    <span className="news-tag num">{'1404/04/06 · حمل‌ونقل'}</span>
                    <h4>{'برگزاری جلسه شورای ترافیک استان'}</h4>
                    <p>
                      {
                        'در این جلسه، طرح‌های کاهش بار ترافیکی محورهای گردشگری استان در فصل تابستان بررسی و تصویب شد.'
                      }
                    </p>
                  </div>
                </div>
                <div className="news-card">
                  <div className="news-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="news-tag num">{'1404/03/29 · محیط‌زیست'}</span>
                    <h4>{'فراخوان مشارکت مردمی طرح تفکیک زباله از مبدا'}</h4>
                    <p>
                      {
                        'شهروندان مازندرانی می‌توانند با ثبت‌نام در طرح تفکیک زباله از مبدا، در کاهش آلودگی محیط‌زیست استان سهیم باشند.'
                      }
                    </p>
                  </div>
                </div>
                <div className="news-card">
                  <div className="news-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="news-tag num">{'1404/03/18 · آب و فاضلاب'}</span>
                    <h4>{'آغاز عملیات آبرسانی به روستاهای کوهستانی'}</h4>
                    <p>
                      {
                        'عملیات اجرایی آبرسانی پایدار به ۱۲ روستای کوهستانی استان با اعتبار ملی آغاز شد.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="view" id="view-poll">
              <div className="view-head">
                <div>
                  <h1>{'نظرسنجی مردمی'}</h1>
                  <p>{'در تصمیم‌گیری‌های استان مشارکت کنید'}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h3>{'به نظر شما مهم‌ترین اولویت توسعه استان مازندران در سال جاری چیست؟'}</h3>
                </div>
                <div id="poll-options">
                  <div className="poll-opt" data-opt="road" data-pct="38">
                    <div className="poll-fill"></div>
                    <div className="poll-opt-inner">
                      <span>{'زیرساخت و راه‌های ارتباطی'}</span>
                      <span className="pct num">{'38%'}</span>
                    </div>
                  </div>
                  <div className="poll-opt" data-opt="waste" data-pct="29">
                    <div className="poll-fill"></div>
                    <div className="poll-opt-inner">
                      <span>{'مدیریت پسماند و محیط‌زیست'}</span>
                      <span className="pct num">{'29%'}</span>
                    </div>
                  </div>
                  <div className="poll-opt" data-opt="tourism" data-pct="22">
                    <div className="poll-fill"></div>
                    <div className="poll-opt-inner">
                      <span>{'گردشگری و اشتغال‌زایی'}</span>
                      <span className="pct num">{'22%'}</span>
                    </div>
                  </div>
                  <div className="poll-opt" data-opt="health" data-pct="11">
                    <div className="poll-fill"></div>
                    <div className="poll-opt-inner">
                      <span>{'بهداشت و درمان'}</span>
                      <span className="pct num">{'11%'}</span>
                    </div>
                  </div>
                </div>
                <div className="poll-note d-d0466aa33fa806" id="poll-note">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  {' رای شما ثبت شد — از مشارکت شما در تصمیم‌سازی استان سپاسگزاریم. '}
                </div>
              </div>
            </div>
            <div className="view" id="view-faq">
              <div className="view-head">
                <div>
                  <h1>{'سوالات متداول'}</h1>
                  <p>{'پیش از ارسال تیکت، پاسخ سوال خود را اینجا جست‌وجو کنید'}</p>
                </div>
              </div>
              <div className="card" id="faq-list">
                <div className="faq-item open">
                  <div
                    className="faq-q"
                    data-command="toggleFaq"
                    data-command-args="this"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    {'چطور می‌توانم گزارش خودم را پیگیری کنم؟'}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <div className="faq-a">
                    {
                      'از منوی سمت راست وارد بخش «پیگیری گزارش‌ها» شوید. تمامی گزارش‌های ثبت‌شده به همراه وضعیت لحظه‌ای آن‌ها در این بخش نمایش داده می‌شود.'
                    }
                  </div>
                </div>
                <div className="faq-item">
                  <div
                    className="faq-q"
                    data-command="toggleFaq"
                    data-command-args="this"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    {'زمان پاسخ‌گویی به گزارش‌ها چقدر است؟'}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <div className="faq-a">
                    {
                      'بازه استاندارد بررسی و پاسخ‌گویی به گزارش‌های عمومی ۷ روز کاری و برای پیام‌های ارسالی به دفتر استاندار بین ۳ تا ۵ روز کاری است. گزارش‌های با اولویت «فوری» در اولویت رسیدگی قرار می‌گیرند. '
                    }
                  </div>
                </div>
                <div className="faq-item">
                  <div
                    className="faq-q"
                    data-command="toggleFaq"
                    data-command-args="this"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    {'آیا اطلاعات هویتی من محرمانه باقی می‌ماند؟'}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <div className="faq-a">
                    {
                      'اطلاعات هویتی شما تنها برای احراز هویت و پیگیری گزارش استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد.'
                    }
                  </div>
                </div>
                <div className="faq-item">
                  <div
                    className="faq-q"
                    data-command="toggleFaq"
                    data-command-args="this"
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    {'چگونه می‌توانم گزارش اشتباه ثبت‌شده را ویرایش یا حذف کنم؟'}
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </div>
                  <div className="faq-a">
                    {
                      'در حال حاضر ویرایش گزارش پس از ثبت امکان‌پذیر نیست؛ در صورت ثبت اشتباه، لطفاً از طریق بخش «ارتباط با استاندار» موضوع را اطلاع دهید تا گزارش اصلاح یا مسدود شود.'
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="view" id="view-directory">
              <div className="view-head">
                <div>
                  <h1>{'دفترچه تلفن ادارات و شماره‌های ضروری'}</h1>
                  <p>{'در شرایط اضطراری با شماره‌های زیر تماس بگیرید'}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h3>{'شماره‌های اضطراری'}</h3>
                </div>
                <div className="dir-grid">
                  <a className="dir-card" href="tel:110">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <b>{'پلیس ۱۱۰'}</b>
                      <span className="num">{'110'}</span>
                    </div>
                  </a>
                  <a className="dir-card" href="tel:125">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <b>{'آتش‌نشانی'}</b>
                      <span className="num">{'125'}</span>
                    </div>
                  </a>
                  <a className="dir-card" href="tel:115">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <b>{'اورژانس'}</b>
                      <span className="num">{'115'}</span>
                    </div>
                  </a>
                  <a className="dir-card" href="tel:112">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <b>{'هلال‌احمر'}</b>
                      <span className="num">{'112'}</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="card d-76977cc9f24231">
                <div className="card-head">
                  <h3>{'ادارات و سازمان‌های استانی'}</h3>
                </div>
                <div className="dir-grid">
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <b>{'شرکت آب و فاضلاب مازندران'}</b>
                      <span className="num">{'011-33067000'}</span>
                    </div>
                  </div>
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <b>{'برق منطقه‌ای مازندران'}</b>
                      <span className="num">{'011-33251000'}</span>
                    </div>
                  </div>
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <div>
                      <b>{'راهداری و حمل‌ونقل جاده‌ای'}</b>
                      <span className="num">{'141'}</span>
                    </div>
                  </div>
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M3 6l9 6 9-6"></path>
                        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                      </svg>
                    </div>
                    <div>
                      <b>{'سازمان مدیریت پسماند'}</b>
                      <span className="num">{'011-33440022'}</span>
                    </div>
                  </div>
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <b>{'اداره کل حفاظت محیط‌زیست'}</b>
                      <span className="num">{'011-33291080'}</span>
                    </div>
                  </div>
                  <div className="dir-card util">
                    <div className="dico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <b>{'دفتر ارتباطات مردمی استانداری'}</b>
                      <span className="num">{'011-33333333'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="view" id="view-profile">
              <div className="view-head">
                <div>
                  <h1>{'پروفایل من'}</h1>
                  <p>{'مشاهده و ویرایش اطلاعات هویتی و تماس'}</p>
                </div>
              </div>
              <div className="card">
                <div className="profile-head">
                  <div className="profile-avatar" id="profile-avatar-initial">
                    {'ک'}
                  </div>
                  <div>
                    <h3 id="profile-name-show">{'محمدرضا عزیزی'}</h3>
                    <span className="num" id="profile-phone-show">
                      {'09121234567'}
                    </span>
                    <div className="verified-chip">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {' هویت تأیید شده'}
                    </div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="field">
                    <label>{'نام و نام خانوادگی'}</label>
                    <input className="input" id="prof-name" readOnly={true} />
                  </div>
                  <div className="field">
                    <label>{'کد ملی'}</label>
                    <input className="input num d-510c841f5fe656" id="prof-melli" readOnly={true} />
                  </div>
                  <div className="field">
                    <label>{'شماره موبایل'}</label>
                    <input className="input num d-510c841f5fe656" id="prof-phone" readOnly={true} />
                  </div>
                  <div className="field">
                    <label>{'شهرستان محل سکونت'}</label>
                    <select className="input">
                      <option>{'ساری'}</option>
                      <option>{'بابل'}</option>
                      <option>{'آمل'}</option>
                      <option>{'سایر'}</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label>{'آدرس محل سکونت (اختیاری)'}</label>
                    <input
                      className="input"
                      placeholder="برای دریافت خدمات محلی دقیق‌تر، آدرس خود را ثبت کنید"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    className="btn btn-submit"
                    data-command="toast"
                    data-command-args="'اطلاعات پروفایل ذخیره شد','success'"
                    data-command-event="click"
                  >
                    {'ذخیره تغییرات'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
