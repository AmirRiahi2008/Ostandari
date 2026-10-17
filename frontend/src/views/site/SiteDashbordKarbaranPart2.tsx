export default function SiteDashbordKarbaranPart2() {
  return (
    <>
      <section id="screen-login" className="screen active">
        <div className="horizon">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path
              className="waveA"
              fill="rgba(255,255,255,0.05)"
              d="M0,140 C120,110 220,170 340,150 C460,130 540,90 660,100 C780,110 860,160 980,150 C1100,140 1180,100 1300,110 C1360,115 1400,130 1440,140 L1440,200 L0,200 Z"
            ></path>
            <path
              className="waveA"
              fill="rgba(255,255,255,0.05)"
              d="M0,140 C120,110 220,170 340,150 C460,130 540,90 660,100 C780,110 860,160 980,150 C1100,140 1180,100 1300,110 C1360,115 1400,130 1440,140 L1440,200 L0,200 Z"
              transform="translate(1440,0)"
            ></path>
          </svg>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path
              className="waveB"
              fill="rgba(201,162,39,0.08)"
              d="M0,170 C100,155 200,185 320,175 C440,165 520,150 640,158 C760,165 840,185 960,178 C1080,170 1160,150 1280,158 C1360,163 1400,168 1440,172 L1440,200 L0,200 Z"
            ></path>
            <path
              className="waveB"
              fill="rgba(201,162,39,0.08)"
              d="M0,170 C100,155 200,185 320,175 C440,165 520,150 640,158 C760,165 840,185 960,178 C1080,170 1160,150 1280,158 C1360,163 1400,168 1440,172 L1440,200 L0,200 Z"
              transform="translate(1440,0)"
            ></path>
          </svg>
        </div>
        <div className="login-shell">
          <div className="login-brand">
            <div className="horizon">
              <svg viewBox="0 0 700 200" preserveAspectRatio="none">
                <path
                  fill="rgba(255,255,255,0.06)"
                  d="M0,120 L60,80 L110,110 L170,60 L230,105 L300,70 L360,115 L430,90 L500,120 L560,95 L630,118 L700,100 L700,200 L0,200 Z"
                ></path>
              </svg>
            </div>
            <div className="brand-top">
              <div className="emblem">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div className="titles">
                <b>{'استانداری مازندران'}</b>
                <span>{'پرتال ارتباط مردمی و خدمات شهروندی'}</span>
              </div>
            </div>
            <div className="headline">
              <h1>
                {'صدای شما،'}
                <br />
                {'مسیر پیشرفت مازندران'}
              </h1>
              <p>
                {
                  'گزارش مشکلات شهری، ارتباط مستقیم با دفتر استاندار و پیگیری روند رسیدگی — همه در یک پرتال، ویژه شهروندان استان مازندران.'
                }
              </p>
            </div>
            <div className="stripe">
              <span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                {' ثبت گزارش آنی'}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                {' پیگیری شفاف'}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                {' پاسخ‌گویی مستقیم'}
              </span>
            </div>
          </div>
          <div className="login-form-wrap">
            <div className="step active" id="step-identity">
              <h2>{'ورود به پرتال'}</h2>
              <p className="sub">
                {
                  'برای ورود، اطلاعات هویتی خود را با دقت وارد کنید. کد تأیید برای شماره موبایل شما ارسال خواهد شد.'
                }
              </p>
              <div className="field" id="f-name">
                <label>{'نام و نام خانوادگی'}</label>
                <input
                  className="input"
                  id="in-name"
                  type="text"
                  placeholder="مثال: محمدرضا عزیزی"
                />
                <div className="err">{'لطفاً نام و نام خانوادگی را کامل وارد کنید.'}</div>
              </div>
              <div className="field" id="f-melli">
                <label>{'کد ملی'}</label>
                <input
                  className="input d-0deeda800798aa"
                  id="in-melli"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="مثال: 2091234567"
                  dir="ltr"
                />
                <div className="err">{'کد ملی وارد شده معتبر نیست.'}</div>
              </div>
              <div className="field" id="f-phone">
                <label>{'شماره تلفن همراه'}</label>
                <input
                  className="input d-0deeda800798aa"
                  id="in-phone"
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="مثال: 09121234567"
                  dir="ltr"
                />
                <div className="err">{'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.'}</div>
              </div>
              <button
                className="btn btn-primary"
                data-command="goToOtp"
                data-command-args=""
                data-command-event="click"
              >
                {' دریافت کد تأیید '}
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="d-87dec954737471">
                  <path d="M5 12h14"></path>
                  <path d="M13 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="legal">
                {
                  'با ورود به پرتال، «قوانین استفاده از خدمات الکترونیک استانداری مازندران» را می‌پذیرید.'
                }
              </p>
            </div>
            <div className="step" id="step-otp">
              <div
                className="back-link"
                data-command="backToIdentity"
                data-command-args=""
                data-command-event="click"
                role="button"
                tabIndex={0}
                aria-label="باز کردن بخش"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="d-87dec954737471">
                  <path d="M19 12H5"></path>
                  <path d="M12 19l-7-7 7-7"></path>
                </svg>
                {' بازگشت و ویرایش اطلاعات '}
              </div>
              <h2>{'کد تأیید را وارد کنید'}</h2>
              <p className="sub">
                {'کد ۴ رقمی برای شماره '}
                <b className="num d-d0f222df91cfa0" id="otp-phone-show"></b>
                {' ارسال شد.'}
              </p>
              <div className="field">
                <div className="otp-boxes">
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,0"
                    data-command-event="input"
                    aria-label="رقم 1 کد تأیید"
                  />
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,1"
                    data-command-event="input"
                    aria-label="رقم 2 کد تأیید"
                  />
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,2"
                    data-command-event="input"
                    aria-label="رقم 3 کد تأیید"
                  />
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,3"
                    data-command-event="input"
                    aria-label="رقم 4 کد تأیید"
                  />
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,4"
                    data-command-event="input"
                    aria-label="رقم 5 کد تأیید"
                  />
                  <input
                    maxLength={1}
                    inputMode="numeric"
                    data-command="otpMove"
                    data-command-args="this,5"
                    data-command-event="input"
                    aria-label="رقم 6 کد تأیید"
                  />
                </div>
                <div className="otp-meta">
                  <span id="resend-wrap">
                    {'ارسال مجدد کد تا '}
                    <b id="resend-timer" className="num">
                      {'0:60'}
                    </b>
                  </span>
                  <span
                    className="btn-ghost d-6aa34d7432e79e"
                    id="resend-btn"
                    data-command="resendOtp"
                    data-command-args=""
                    data-command-event="click"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    {'ارسال مجدد کد'}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-primary d-a33b8fc2ff7780"
                data-command="confirmOtp"
                data-command-args=""
                data-command-event="click"
              >
                {' ورود به داشبورد '}
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className="d-87dec954737471">
                  <path d="M5 12h14"></path>
                  <path d="M13 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
