export default function SiteRegisterLoginPart1() {
  return (
    <>
      <div className="login-website">
        <div className="login-website-left">
          <div className="login-bottom-part">
            <a href="https://sadrasoft.ir/" target="_blank" rel="noopener noreferrer">
              {' طراحی و توسعه یافته شده توسط شرکت مهندسی صدرا رایانه نوین طبرستان'}
            </a>
          </div>
          <div className="login-website-left-middle-parent">
            <div className="login-website-left-middle">
              <img
                src="/design/site/login-panel-ostandari/IMG_20260802_085817_814.png"
                className="img"
                alt=""
              />
            </div>
          </div>
          <div className="login-website-right-login">
            <form className="login-form" action="#" data-form="true">
              <div className="login-row login-row-title">{'ثبت نام در پنل استانداری '}</div>
              <div className="login-row">
                <input type="text" placeholder="نام و نام خانوادگی:" className="paddingleftpass" />
              </div>
              <div className="login-row">
                <input type="text" placeholder="شماره همراه:" className="paddingleftpass" />
              </div>
              <div className="login-row">
                <input type="text" placeholder="نام کاربری:" className="paddingleftpass" />
              </div>
              <div className="login-row">
                <input type="password" placeholder="رمز عبور:" className="paddingleftpass" />
                <div
                  className="showpassbutton"
                  role="button"
                  tabIndex={0}
                  aria-label="نمایش یا پنهان کردن رمز"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"></path>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"></path>
                  </svg>
                </div>
              </div>
              <div className="login-row">
                <input type="password" placeholder="تکرار رمز عبور:" className="paddingleftpass" />
                <div
                  className="showpassbutton"
                  role="button"
                  tabIndex={0}
                  aria-label="نمایش یا پنهان کردن رمز"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"></path>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"></path>
                  </svg>
                </div>
              </div>
              <button className="login-row login-button">{'ثبت نام'}</button>
            </form>
            <div className="login-row login-text-1">
              <span>
                <span>{' حساب کابری دارید؟'}</span>
                <a href="/login" className="login-special-text1">
                  {'ورود'}
                </a>
              </span>
            </div>
            <div className="login-backtowebsite-phone">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                ></path>
              </svg>
              {' بازگشت '}
            </div>
          </div>
        </div>
        <div className="login-website-right"></div>
        <div className="login-backtowebsite">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            ></path>
          </svg>
          {' بازگشت به سایت '}
        </div>
        <button className="login-language-change">
          <span className="makecenter">
            <svg
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              ></path>
            </svg>
            {' fa '}
          </span>
        </button>
      </div>
    </>
  );
}
