export default function SiteLoginOtpPart1() {
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
              <div className="login-row login-row-title">{' ورود کد ارسالی '}</div>
              <div className="login-row">
                <input type="text" placeholder=" کد یک بار مصرف  " />
              </div>
              <button className="login-row login-button">{' ورود'}</button>
            </form>
            <div className="login-row login-text-1"></div>
            <div className="login-row login-line-parent">
              <div className="login-line"></div>
              <div className="login-line-middle">{' یا'}</div>
              <div className="login-line"></div>
            </div>
            <div className="login-row login-google">
              <svg width="24" height="24" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <div className="login-row login-bottom-text">
              <span>
                <span>{' ورود شما به معنای پذیرش '}</span>
                <span className="login-special-text2">{' شرایط استفاده از خدمات '}</span>
              </span>
              <span>
                <span className="login-special-text2">{' و سیاست حفظ حریم خصوصی '}</span>
                <span>{' صدرا رایانه نوین طبرستان است'}</span>
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
      </div>
    </>
  );
}
