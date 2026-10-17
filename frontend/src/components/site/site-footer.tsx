export function SiteFooter() {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="iconostandari">
          <svg
            width="150"
            height="162"
            viewBox="0 0 150 162"
            fill="none"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="d-b63c8c82303a29"
          >
            <g filter="url(#s2473b8-0-filter0_d_1_209)">
              <path
                d="M70.3887 3.91504C73.2292 2.2204 76.7708 2.2204 79.6113 3.91504L134.563 36.6992C137.285 38.3231 138.952 41.2594 138.952 44.4287V110.571C138.952 113.741 137.285 116.677 134.563 118.301L79.6113 151.085C76.7708 152.78 73.2292 152.78 70.3887 151.085L15.4365 118.301C12.7148 116.677 11.0479 113.741 11.0479 110.571V44.4287C11.0479 41.2594 12.7148 38.3231 15.4365 36.6992L70.3887 3.91504Z"
                fill="white"
                stroke="#CFCFCF"
                strokeWidth="2"
              ></path>
              <rect
                x="28.5"
                y="29.5"
                width="93"
                height="93"
                fill="url(#s2473b8-0-pattern0_1_209)"
              ></rect>
            </g>
            <defs>
              <filter
                id="s2473b8-0-filter0_d_1_209"
                x="6.0481"
                y="1.64442"
                width="137.904"
                height="159.711"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_209"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_209"
                  result="shape"
                ></feBlend>
              </filter>
              <pattern
                id="s2473b8-0-pattern0_1_209"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use transform="scale(0.00195312)" xlinkHref="#s2473b8-0-image0_1_209"></use>
              </pattern>
              <image
                id="s2473b8-0-image0_1_209"
                width="512"
                height="512"
                preserveAspectRatio="none"
                xlinkHref="/design/shared/7ce925f0576fccad43cd.png"
              ></image>
            </defs>
          </svg>
        </div>
        <footer className="icx-footer-root">
          <div className="icx-footer-wrap">
            <div className="icx-footer-col">
              <h4 className="icx-footer-title">{'سایت'}</h4>
              <ul className="icx-footer-list">
                <li>
                  <a className="icx-footer-link" href="/counties">
                    {'فرمانداری‌ها'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/services">
                    {'خدمات'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/about">
                    {'معرفی استانداری'}
                  </a>
                </li>
              </ul>
            </div>
            <div className="icx-footer-col">
              <h4 className="icx-footer-title">{'صفحات'}</h4>
              <ul className="icx-footer-list">
                <li>
                  <a className="icx-footer-link" href="/services">
                    {'سرویس ها'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/counties">
                    {'فرمانداری‌ها'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/help">
                    {'امکانات'}
                  </a>
                </li>
              </ul>
            </div>
            <div className="icx-footer-col">
              <h4 className="icx-footer-title">{'سرویس ها'}</h4>
              <ul className="icx-footer-list">
                <li>
                  <a className="icx-footer-link" href="/help">
                    {'آموزشی'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/news">
                    {'روزانه'}
                  </a>
                </li>
                <li>
                  <a className="icx-footer-link" href="/news">
                    {'ویژه'}
                  </a>
                </li>
              </ul>
            </div>
            <div className="icx-footer-col icx-footer-contact">
              <h4 className="icx-footer-title">{'اطلاعات تماس'}</h4>
              <p className="icx-footer-text">
                <i className="fa-solid fa-location-dot icx-footer-icon"></i>
                {' مازندران، ساری، خیابان انقلاب، استانداری مازندران '}
              </p>
              <p className="icx-footer-text">
                <i className="fa-regular fa-envelope icx-footer-icon"></i>
                {' info@ostan-mz.ir '}
              </p>
              <p className="icx-footer-text">
                <i className="fa-solid fa-phone icx-footer-icon"></i>
                {' ۰۱۱۳۳۳۱۰۲۱۱–۱۹ '}
              </p>
              <div className="icx-footer-social">
                <a className="icx-footer-social-link" href="/social" aria-label="شبکه‌های اجتماعی">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a className="icx-footer-social-link" href="/social" aria-label="شبکه‌های اجتماعی">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="icx-footer-social-link" href="/social" aria-label="شبکه‌های اجتماعی">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="bottom-footer">
        <div className="d-812ca5ad2a1e69">{' صدرا رایانه نوین طبرستان '}</div>
        {' طراحی و توسعه یافته توسط '}
      </div>
    </div>
  );
}
