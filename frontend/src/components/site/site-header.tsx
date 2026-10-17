export function SiteHeader() {
  return (
    <section>
      <div className="header-container">
        <div className="nav-bala">
          <div className="nav-bala-right">
            <div className="tamas">
              <a href="/contact">{'تماس با ما'}</a>
            </div>
            <div className="dastresi">
              <a href="/quick-access">{'دسترسی سریع'}</a>
            </div>
            <div className="ghavanin">
              <a href="/regulations">{'قوانین و مقررات'}</a>
            </div>
            <div className="etelaat">
              <a href="/information">{'دسترسی آزاد به اطلاعات'}</a>
            </div>
          </div>
          <div className="nav-bala-left">
            <div className="iran-container">
              <div
                className="iran-img"
                id="flagSwitcher"
                role="button"
                tabIndex={0}
                aria-label="انتخاب زبان"
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M13 0C16.5894 0 19.8397 1.45559 22.192 3.80797C24.5444 6.1603 26 9.41059 26 13C26 16.5894 24.5444 19.8397 22.192 22.192C19.8397 24.5444 16.5894 26 13 26C9.41095 26 6.1603 24.5444 3.80797 22.192C1.45559 19.8397 0 16.589 0 13C0 9.41059 1.45559 6.1603 3.80797 3.80797C6.1603 1.45559 9.41059 0 13 0Z"
                    fill="#4D4D4D"
                  ></path>
                  <path
                    d="M13.0002 0.995274C16.3151 0.995274 19.3165 2.33924 21.4889 4.51151C23.6611 6.68387 25.0051 9.68528 25.0051 13.0002C25.0051 16.3151 23.6611 19.3165 21.4888 21.4887C19.3165 23.6611 16.3151 25.0051 13.0002 25.0051C9.68531 25.0051 6.6839 23.6611 4.51153 21.4889C2.33927 19.3165 0.9953 16.3151 0.9953 13.0002C0.9953 9.68528 2.33927 6.68387 4.51153 4.51151C6.6839 2.33924 9.68531 0.995274 13.0002 0.995274Z"
                    fill="white"
                  ></path>
                  <path
                    d="M23.0281 17.5016C21.3085 21.3264 17.4655 23.9896 13.0002 23.9896C8.53516 23.9896 4.69276 21.3271 2.97281 17.503L2.97322 17.5039H23.027L23.0281 17.5016Z"
                    fill="#DA0000"
                  ></path>
                  <path
                    d="M2.95837 8.5304H23.0418C21.3292 4.68886 17.4776 2.01083 13.0002 2.01083C8.52256 2.01083 4.67086 4.68886 2.95837 8.5304Z"
                    fill="#239F40"
                  ></path>
                  <path
                    d="M22.3637 7.24581C22.4357 7.36283 22.5055 7.48119 22.5731 7.60082V7.90225H22.7372C22.7737 7.97152 22.8093 8.04139 22.8443 8.11172H22.3637V7.69283H21.7355V7.90225H22.1542V8.11172H21.5261V7.48356H22.3637V7.24581ZM22.9456 8.32099C23.011 8.45931 23.0734 8.59895 23.133 8.73983H21.5261V8.32099H22.9456ZM2.8674 8.73983C2.92693 8.59894 2.98937 8.4593 3.05468 8.32099H4.50387V8.73983H2.8674ZM3.15614 8.11172C3.18615 8.05129 3.21642 7.99117 3.2476 7.9315V8.11172H3.15614ZM3.37577 7.69283C3.41458 7.62267 3.4541 7.55291 3.49434 7.48356H3.66644V7.90225H4.2946V7.69283H3.87576V7.48356H4.50402V8.11172H3.45702V7.69283H3.37577ZM3.61896 7.27414C3.66197 7.20381 3.70559 7.13399 3.75008 7.06472H5.34145V7.27414H3.61896ZM19.4322 8.32099H21.3167V8.73983H19.4322V8.32099ZM19.4322 7.06472H22.1542V7.27414H19.4322V7.06472ZM19.4322 8.11172V7.48356H20.4792V7.90225H21.1072V7.69283H20.6885V7.48356H21.3168V8.11172H20.2697V7.69283H19.6417V8.11172H19.4322ZM19.8509 7.90225H20.0604V8.11172H19.8509V7.90225ZM15.2291 8.32099H17.1135V8.73983H15.2291V8.32099ZM17.3228 8.32099H19.2072V8.73983H17.3228V8.32099ZM15.2291 7.06472H17.9511V7.27414H15.2291V7.06472ZM15.2291 8.11172V7.48356H16.276V7.90225H16.9041V7.69283H16.4853V7.48356H17.1135V8.11172H16.0665V7.69283H15.4386V8.11172H15.2291ZM15.6478 7.90225H15.8571V8.11172H15.6478V7.90225ZM17.9511 8.11172H17.3228V7.48356H18.1604V7.06472H18.3698V7.90225H18.5791V7.06472H18.7885V7.90225H18.9978V7.06472H19.2074V8.11172H18.1604V7.69283H17.5323V7.90225H17.9511V8.11172ZM11.0258 8.32099H12.9103V8.73983H11.0258V8.32099ZM13.1197 8.32099H15.0041V8.73983H13.1197V8.32099ZM11.0258 7.06472H13.7479V7.27414H11.0258V7.06472ZM11.0258 8.11172V7.48356H12.0727V7.90225H12.7009V7.69283H12.2821V7.48356H12.9104V8.11172H11.8634V7.69283H11.2353V8.11172H11.0258ZM11.4446 7.90225H11.654V8.11172H11.4446V7.90225ZM13.7479 8.11172H13.1197V7.48356H13.9571V7.06472H14.1667V7.90225H14.376V7.06472H14.5854V7.90225H14.7947V7.06472H15.0042V8.11172H13.9571V7.69283H13.3291V7.90225H13.7479V8.11172ZM6.82259 8.32099H8.70712V8.73983H6.82259V8.32099ZM8.91654 8.32099H10.801V8.73983H8.91654V8.32099ZM6.82259 7.06472H9.5447V7.27414H6.82259V7.06472ZM6.82259 8.11172V7.48356H7.86974V7.90225H8.4977V7.69283H8.07901V7.48356H8.70712V8.11172H7.66017V7.69283H7.03216V8.11172H6.82259ZM7.24143 7.90225H7.45085V8.11172H7.24143V7.90225ZM9.5447 8.11172H8.91654V7.48356H9.75397V7.06472H9.96344V7.90225H10.1727V7.06472H10.3821V7.90225H10.5916V7.06472H10.801V8.11172H9.75397V7.69283H9.12586V7.90225H9.5447V8.11172ZM4.71329 8.32099H6.59773V8.73983H4.71329V8.32099ZM5.34145 8.11172H4.71329V7.48356H5.55088V7.06472H5.7603V7.90225H5.96957V7.06472H6.17914V7.90225H6.38841V7.06472H6.59773V8.11172H5.55088V7.69283H4.92271V7.90225H5.34145V8.11172ZM23.1186 17.2945C23.0587 17.4357 22.9957 17.5753 22.9299 17.7134H21.4173V17.2945H23.1186ZM22.8274 17.9226C22.7776 18.0221 22.7264 18.1208 22.6735 18.2187V17.9226H22.8274ZM22.4642 18.5877C22.3965 18.7026 22.3267 18.8163 22.2548 18.9287V18.5507H21.6267V18.7602H22.0454V18.9696H21.4173V18.3415H22.2548V17.9226H22.4642V18.5877ZM3.77242 18.9696C3.72755 18.9003 3.68344 18.8305 3.64009 18.7602H4.24783V18.5507H3.82909V18.3415H4.45725V18.9696H3.77242ZM3.61967 18.7274C3.5421 18.6003 3.46713 18.4716 3.39481 18.3415H3.61967V18.7274ZM3.28101 18.132C3.24423 18.0626 3.2082 17.9928 3.17295 17.9226H5.29484V18.132H3.28101ZM3.07058 17.7134C3.00465 17.5751 2.94172 17.4354 2.88182 17.2945H4.45725V17.7134H3.07058ZM19.3234 17.9226H22.0454V18.132H19.3234V17.9226ZM19.3234 18.9696V18.3415H20.3704V18.7602H20.9984V18.5507H20.5797V18.3415H21.2078V18.9696H20.1608V18.5507H19.5328V18.9696H19.3234ZM19.7423 18.7602H19.9515V18.9696H19.7423V18.7602ZM19.3234 17.2945H21.2078V17.7134H19.3234V17.2945ZM15.1357 17.9226H17.8577V18.132H15.1357V17.9226ZM15.1357 18.9696V18.3415H16.1827V18.7602H16.8107V18.5507H16.3921V18.3415H17.0201V18.9696H15.9733V18.5507H15.3452V18.9696H15.1357ZM15.5546 18.7602H15.7639V18.9696H15.5546V18.7602ZM17.8577 18.9696H17.2296V18.3415H18.0671V17.9226H18.2766V18.7602H18.4858V17.9226H18.6952V18.7602H18.9046V17.9226H19.1141V18.9696H18.0671V18.5507H17.439V18.7602H17.8577V18.9696ZM15.1357 17.2945H17.0203V17.7134H15.1357V17.2945ZM17.2296 17.2945H19.1141V17.7134H17.2296V17.2945ZM10.948 17.9226H13.67V18.132H10.948V17.9226ZM10.948 18.9696V18.3415H11.995V18.7602H12.6232V18.5507H12.2045V18.3415H12.8326V18.9696H11.7856V18.5507H11.1576V18.9696H10.948ZM11.3669 18.7602H11.5764V18.9696H11.3669V18.7602ZM13.67 18.9696H13.0419V18.3415H13.8795V17.9226H14.0889V18.7602H14.2982V17.9226H14.5076V18.7602H14.7169V17.9226H14.9264V18.9696H13.8795V18.5507H13.2513V18.7602H13.67V18.9696ZM10.948 17.2945H12.8326V17.7134H10.948V17.2945ZM13.0419 17.2945H14.9264V17.7134H13.0419V17.2945ZM6.76038 17.9226H9.48234V18.132H6.76038V17.9226ZM6.76038 18.9696V18.3415H7.80733V18.7602H8.43549V18.5507H8.0168V18.3415H8.64491V18.9696H7.59796V18.5507H6.96995V18.9696H6.76038ZM7.17922 18.7602H7.38864V18.9696H7.17922V18.7602ZM9.48234 18.9696H8.85439V18.3415H9.69177V17.9226H9.90119V18.7602H10.1105V17.9226H10.3201V18.7602H10.5293V17.9226H10.7388V18.9696H9.69177V18.5507H9.06381V18.7602H9.48234V18.9696ZM6.76038 17.2945H8.64491V17.7134H6.76038V17.2945ZM8.85418 17.2945H10.7388V17.7134H8.85418V17.2945ZM5.29484 18.9696H4.66668V18.3415H5.50411V17.9226H5.71368V18.7602H5.92295V17.9226H6.13237V18.7602H6.34164V17.9226H6.55111V18.9696H5.50411V18.5507H4.8761V18.7602H5.29484V18.9696ZM4.66668 17.2945H6.55111V17.7134H4.66668V17.2945Z"
                    fill="white"
                  ></path>
                  <path
                    d="M15.018 15.2428C15.4087 15.0173 15.7332 14.6929 15.9588 14.3022C16.1845 13.9115 16.3032 13.4683 16.3032 13.0171C16.3032 11.8381 15.5006 10.8092 14.3572 10.5231C14.7742 10.8367 15.1126 11.2429 15.3457 11.7098C15.5788 12.1766 15.7002 12.6912 15.7003 13.213C15.7 13.9459 15.4605 14.6586 15.018 15.2428ZM10.8569 15.2428C10.4661 15.0173 10.1416 14.6929 9.91602 14.3022C9.69042 13.9115 9.57167 13.4683 9.57172 13.0171C9.57172 11.8381 10.3743 10.8092 11.5176 10.5231C11.1006 10.8367 10.7622 11.2429 10.5291 11.7098C10.296 12.1766 10.1746 12.6912 10.1745 13.213C10.1748 13.9459 10.4144 14.6586 10.8569 15.2428ZM12.9356 9.90623C12.8953 9.97584 12.8374 10.0336 12.7678 10.0738C12.6981 10.114 12.6192 10.1351 12.5388 10.1352C12.4316 10.1349 12.3279 10.0973 12.2454 10.0288C12.163 9.96035 12.1071 9.86525 12.0873 9.75993C12.0645 9.81743 12.0528 9.87872 12.0529 9.94056C12.0529 10.0044 12.0654 10.0675 12.0899 10.1265C12.1143 10.1854 12.1501 10.239 12.1952 10.2841C12.2403 10.3292 12.2939 10.365 12.3528 10.3894C12.4118 10.4138 12.4749 10.4264 12.5388 10.4264C12.6964 10.4264 12.8453 10.3488 12.9374 10.22C13.0297 10.3488 13.1784 10.4264 13.3361 10.4264C13.3999 10.4264 13.4631 10.4138 13.522 10.3894C13.581 10.365 13.6346 10.3292 13.6797 10.2841C13.7248 10.239 13.7606 10.1854 13.785 10.1265C13.8094 10.0675 13.822 10.0044 13.822 9.94056C13.822 9.87947 13.8106 9.81716 13.7877 9.75993C13.7469 9.97743 13.5562 10.1352 13.3361 10.1352C13.1721 10.1352 13.017 10.0474 12.9356 9.90623ZM14.7818 15.8316C14.475 15.9309 14.1545 15.9816 13.8319 15.9818C13.6165 15.9818 13.4062 15.9595 13.2033 15.9171L13.1991 16.0218L12.9372 16.3822L12.6754 16.0218L12.6712 15.9172C12.4645 15.9602 12.254 15.9819 12.0429 15.9818C11.7204 15.9816 11.3999 15.9309 11.0931 15.8316C11.1465 15.8341 11.2035 15.8355 11.2569 15.8355C11.6502 15.8359 12.0405 15.7672 12.41 15.6326C11.4314 15.1196 10.763 14.0938 10.763 12.9128C10.7631 12.4712 10.8585 12.0347 11.0427 11.6333C11.2268 11.2318 11.4954 10.8748 11.8302 10.5866C11.4537 11.1427 11.2526 11.7988 11.2527 12.4702C11.2527 13.59 11.8002 14.5823 12.6419 15.194L12.5401 12.6792L12.5398 10.7011C12.6985 10.6256 12.8352 10.5109 12.9372 10.3679C13.0392 10.5109 13.176 10.6256 13.3347 10.7011L13.3344 12.6792L13.2326 15.1943C14.0745 14.5826 14.6222 13.5902 14.6222 12.4702C14.6223 11.7988 14.4212 11.1427 14.0448 10.5866C14.3795 10.8748 14.648 11.2318 14.8322 11.6333C15.0163 12.0347 15.1117 12.4712 15.1118 12.9128C15.1118 14.0938 14.4435 15.1196 13.4648 15.6326C13.8344 15.7672 14.2247 15.8359 14.6179 15.8355C14.6714 15.8355 14.7284 15.8341 14.7818 15.8316Z"
                    fill="#DA0000"
                  ></path>
                </svg>
                <div className="flag-dropdown" id="flagDropdown">
                  <div
                    className="flag-option"
                    data-lang="en"
                    data-navigate="/en"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg width="22" height="16" viewBox="0 0 30 20">
                      <rect width="30" height="20" fill="#ffffff"></rect>
                      <rect y="0" width="30" height="10" fill="#00B140"></rect>
                      <path
                        d="M6 10c0-3 2-5 4-6-1 2-1 4 0 6-1 2-1 4 0 6-2-1-4-3-4-6z"
                        fill="#C8102E"
                      ></path>
                      <path
                        d="M6 10c1-1 3-1.5 5-1.2-1 .6-1.7 1.2-1.7 1.2s.7.6 1.7 1.2c-2 .3-4-.2-5-1.2z"
                        fill="#C8102E"
                      ></path>
                    </svg>
                    <span>{'English'}</span>
                  </div>
                  <div
                    className="flag-option"
                    data-lang="ar"
                    data-navigate="/ar"
                    role="button"
                    tabIndex={0}
                    aria-label="باز کردن بخش"
                  >
                    <svg width="22" height="16" viewBox="0 0 30 20">
                      <rect width="30" height="6.67" y="0" fill="#000000"></rect>
                      <rect width="30" height="6.67" y="6.67" fill="#ffffff"></rect>
                      <rect width="30" height="6.66" y="13.34" fill="#007A3D"></rect>
                      <path d="M0 0 L15 10 L0 20 Z" fill="#CE1126"></path>
                    </svg>
                    <span>{'العربية'}</span>
                  </div>
                </div>
              </div>
              <div className="search">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="26" height="26" fill="url(#sfb20fc-0-pattern0_6_293)"></rect>
                  <defs>
                    <pattern
                      id="sfb20fc-0-pattern0_6_293"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use transform="scale(0.00195312)" xlinkHref="#sfb20fc-0-image0_6_293"></use>
                    </pattern>
                    <image
                      id="sfb20fc-0-image0_6_293"
                      width="512"
                      height="512"
                      preserveAspectRatio="none"
                      xlinkHref="/design/shared/ffbd0c40f2137b5b5610.png"
                    ></image>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="sabtnam-container">
              <div className="sabtnan">
                <a href="/register">
                  <span className="d-58d7da1d74b0f6">{'ثبت نام '}</span>
                </a>
              </div>
              <div className="vorod">
                <a href="/login">
                  <span className="d-58d7da1d74b0f6">{'ورود به حساب'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="imageeee d-4fa00029d5b13b">
          <img className="icx-responsive-img" src="/design/site/assets/image/baner.png" alt="" />
          <div className="shoar-sal">
            <img src="/design/site/assets/image/شعار پ.png" alt="" className="d-ed08e28b319a21" />
          </div>
        </div>
        <div className="top-header">
          <div className="header-box">
            <div
              className="header-hamburger"
              id="hamburgerBtn"
              role="button"
              tabIndex={0}
              aria-label="باز کردن منو"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="hum-logo">
              <img src="/design/site/assets/image/logo.png" alt="" />
            </div>
            <div className="desktop-menu">
              <div className="menu-right">
                <div className="menu-item">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-1-pattern0_1_227)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-1-pattern0_1_227"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-1-image0_1_227"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-1-image0_1_227"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/12a13fc64388de60816a.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/">{'صفحه اصلی'}</a>
                  </div>
                </div>
                <div className="menu-item has-mega">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-2-pattern0_1_219)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-2-pattern0_1_219"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-2-image0_1_219"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-2-image0_1_219"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/cbbe09ece27bf5f281c5.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/services" id="khadmat">
                      {'خدمات'}
                    </a>
                  </div>
                  <div className="mega-menu">
                    <ul className="categories">
                      <li data-target="sub1" className="active">
                        <span className="category-text">{'مدیران استان'}</span>
                        <svg className="arrow10" viewBox="0 0 24 24">
                          <path d="M16 5l-8 7 8 7"></path>
                        </svg>
                      </li>
                      <li data-target="sub2">
                        <span className="category-text">{'خدمات الکترونیکی'}</span>
                        <svg className="arrow10" viewBox="0 0 24 24">
                          <path d="M16 5l-8 7 8 7"></path>
                        </svg>
                      </li>
                      <li data-target="sub3">
                        <span className="category-text">{'شرح وظایف واحد ها'}</span>
                        <svg className="arrow10" viewBox="0 0 24 24">
                          <path d="M16 5l-8 7 8 7"></path>
                        </svg>
                      </li>
                      <li data-target="sub4">
                        <span className="category-text">{'بیانیه سطح توافق خدمات'}</span>
                        <svg className="arrow10" viewBox="0 0 24 24">
                          <path d="M16 5l-8 7 8 7"></path>
                        </svg>
                      </li>
                      <li data-target="sub5">
                        <span className="category-text">{'آشنایی با مازندران'}</span>
                        <svg className="arrow10" viewBox="0 0 24 24">
                          <path d="M16 5l-8 7 8 7"></path>
                        </svg>
                      </li>
                    </ul>
                    <div className="submenus">
                      <div id="sub1" className="submenu active">
                        <div className="submenu-grid">
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'معاونین استاندار مازندران'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'مدیران ستادی استانداری مازندران'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'فرمانداران مازندران'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'مشاورین استاندار'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">
                              {'مدیران ادارات و دستگاه های اجرایی '}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="sub2" className="submenu">
                        <div className="submenu-grid">
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">
                              {'خدمات الکترونیکی استانداری مازندران '}
                            </div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'خدمات الکترونیکی'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'میز خدمت وزارت کشور'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'پیوند ها'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'سامانه مدیریت خدمات دولت'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'پیشخوان ارباب رجوع'}</div>
                          </div>
                        </div>
                      </div>
                      <div id="sub3" className="submenu submenu-nested">
                        <div className="nested-mega">
                          <ul className="nested-categories">
                            <li data-target="sub3-1" className="active">
                              <span className="category-text">{'شرح وظایف کلی استانداری'}</span>
                              <svg className="arrow10" viewBox="0 0 24 24">
                                <path d="M16 5l-8 7 8 7"></path>
                              </svg>
                            </li>
                            <li data-target="sub3-2">
                              <span className="category-text">
                                {'معاونت سیاسی، امنیتی و اجتماعی'}
                              </span>
                              <svg className="arrow10" viewBox="0 0 24 24">
                                <path d="M16 5l-8 7 8 7"></path>
                              </svg>
                            </li>
                            <li data-target="sub3-3">
                              <span className="category-text">{'معاون هماهنگی امور اقتصادی'}</span>
                              <svg className="arrow10" viewBox="0 0 24 24">
                                <path d="M16 5l-8 7 8 7"></path>
                              </svg>
                            </li>
                            <li data-target="sub3-4">
                              <span className="category-text">
                                {'معاونت توسعه مدیریت و منابع انسانی'}
                              </span>
                              <svg className="arrow10" viewBox="0 0 24 24">
                                <path d="M16 5l-8 7 8 7"></path>
                              </svg>
                            </li>
                            <li data-target="sub3-5">
                              <span className="category-text">{'معاونت هماهنگی امور عمرانی'}</span>
                              <svg className="arrow10" viewBox="0 0 24 24">
                                <path d="M16 5l-8 7 8 7"></path>
                              </svg>
                            </li>
                          </ul>
                          <div className="nested-submenus">
                            <div id="sub3-1" className="nested-submenu active">
                              <div className="submenu-grid">
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'شرح وظایف و ماموریتهای اساسی استانداری ها '}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="sub3-2" className="nested-submenu">
                              <div className="submenu-grid">
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'دفتر استاندار و روابط عمومی و بین الملل : '}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'دفتر امور بانوان و خانواده'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل حراست'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'هسته گزینش'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل سیاسی و انتخابات'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'اداره کل امور اجتماعی و فرهنگی'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'اداره کل امور امنیتی و انتظامی'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل پدافند غیرعامل'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'مدیریت امور اتباع و مهاجرین'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل شهری و شوراها'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل روستایی و شوراها'}</div>
                                </div>
                              </div>
                            </div>
                            <div id="sub3-3" className="nested-submenu">
                              <div className="submenu-grid">
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'دفتر هماهنگی امور اقتصادی'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'دفتر جذب و حمایت از سرمایه گذاری'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="sub3-4" className="nested-submenu">
                              <div className="submenu-grid">
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'دفتر ، مدیریت عملکرد، بازرسی و امور حقوقی'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'دفتر برنامه ریزی ، نوسازی وتحول اداری '}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'مدیریت فناوری اطلاعات'}</div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'امنیت فضای مجازی و شبکه دولت'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل امور اداری و مالی'}</div>
                                </div>
                              </div>
                            </div>
                            <div id="sub3-5" className="nested-submenu">
                              <div className="submenu-grid">
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">
                                    {'دفتر فنی ،امور عمرانی و حمل ونقل و ترافیک'}
                                  </div>
                                </div>
                                <div className="submenu-item">
                                  <div className="gerd"></div>
                                  <div className="submenu-text">{'اداره کل مدیریت بحران'}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="sub4" className="submenu">
                        <div className="submenu-grid">
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'پشتیبانی شبکه دولت'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'رهگیری'}</div>
                          </div>
                        </div>
                      </div>
                      <div id="sub5" className="submenu">
                        <div className="submenu-grid">
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'اطلاعات عمومی'}</div>
                          </div>
                          <div className="submenu-item">
                            <div className="gerd"></div>
                            <div className="submenu-text">{'شهرستان‌ها'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="menu-item install-app-menu-item"
                  id="installAppBtn"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <div className="rast">
                    <svg
                      className="immg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="3"></rect>
                      <path d="M9 18h6"></path>
                      <path d="M12 6v6"></path>
                      <path d="M9.5 9.5 12 12l2.5-2.5"></path>
                    </svg>
                    <span className="install-badge">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v12"></path>
                        <path d="M7 10l5 5 5-5"></path>
                        <path d="M5 21h14"></path>
                      </svg>
                      {' App '}
                    </span>
                    <a href="/install">{'نصب اپلیکیشن'}</a>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-3-pattern0_1_195)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-3-pattern0_1_195"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-3-image0_1_195"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-3-image0_1_195"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/01d3830564ad0aa38112.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/polls">{'نظرسنجی دستگاه های اجرایی'}</a>
                  </div>
                </div>
              </div>
              <div className="logo-wrapper">
                <img
                  src="/design/site/assets/image/logo.png"
                  alt="لوگو"
                  data-hide-on-error="true"
                />
              </div>
              <div className="menu-left">
                <div className="menu-item">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-4-pattern0_1_223)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-4-pattern0_1_223"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-4-image0_1_223"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-4-image0_1_223"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/989bbb43ae0c7c4dbfea.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/transparency">{'سامانه شفافیت'}</a>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-5-pattern0_1_204)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-5-pattern0_1_204"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-5-image0_1_204"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-5-image0_1_204"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/0734cb762b5580fbb2f2.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/duties">{'شرح وظایف واحدها'}</a>
                  </div>
                </div>
                <div className="menu-item">
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-6-pattern0_1_200)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-6-pattern0_1_200"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-6-image0_1_200"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-6-image0_1_200"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/653b3c9da2eb5f0ffa21.png"
                        ></image>
                      </defs>
                    </svg>
                    <a href="/service-agreement">{' سطح توافق خدمات'}</a>
                  </div>
                </div>
                <div
                  className="menu-item ai-menu-item"
                  id="openBtn"
                  role="button"
                  tabIndex={0}
                  aria-label="باز کردن بخش"
                >
                  <div className="rast">
                    <svg
                      className="immg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="18" height="18" fill="url(#sfb20fc-7-pattern0_1_208)"></rect>
                      <defs>
                        <pattern
                          id="sfb20fc-7-pattern0_1_208"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#sfb20fc-7-image0_1_208"
                          ></use>
                        </pattern>
                        <image
                          id="sfb20fc-7-image0_1_208"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlinkHref="/design/shared/fd3b3981cf81006dd389.png"
                        ></image>
                      </defs>
                    </svg>
                    <span className="ai-badge">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z"></path>
                        <path d="M19 14l.9 2.6L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.4L19 14z"></path>
                      </svg>
                      {' AI '}
                    </span>
                    <a href="/assistant">{'هوش مصنوعی سازمانی'}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mm-backdrop" id="mmBackdrop"></div>
            <div className="mobile-menu-overlay" id="mobileMenu">
              <div className="mm-topbar">
                <div className="mm-brand">
                  <img
                    src="/design/site/assets/image/logo.png"
                    alt="استانداری مازندران"
                    className="mm-logo"
                  />
                  <span className="mm-brand-text">{'استانداری مازندران'}</span>
                </div>
                <button
                  type="button"
                  className="close-mobile-menu"
                  id="closeMobileMenu"
                  aria-label="بستن منو"
                >
                  {'×'}
                </button>
              </div>
              <nav className="mm-nav">
                <a href="/" className="mm-link">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 10.5 12 3l9 7.5"></path>
                      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'صفحه اصلی'}</span>
                </a>
                <a href="/transparency" className="mm-link">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'سامانه شفافیت'}</span>
                </a>
                <div className="mm-item">
                  <button
                    type="button"
                    className="mm-trigger"
                    data-command="mmToggle"
                    data-command-args="this"
                    data-command-event="click"
                  >
                    <span className="mm-trigger-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                      </svg>
                    </span>
                    <span className="mm-trigger-text">{'خدمات'}</span>
                    <svg
                      className="mm-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                  <div className="mm-panel">
                    <div className="mm-panel-inner">
                      <div className="mm-item mm-item--sub">
                        <button
                          type="button"
                          className="mm-trigger mm-trigger--sub"
                          data-command="mmToggle"
                          data-command-args="this"
                          data-command-event="click"
                        >
                          <span className="mm-trigger-text">{'مدیران استان'}</span>
                          <svg
                            className="mm-chevron"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        <div className="mm-panel">
                          <div className="mm-panel-inner">
                            <ul className="mm-list">
                              <li>
                                <a href="/deputies">{'معاونین استاندار مازندران'}</a>
                              </li>
                              <li>
                                <a href="/managers?group=1">{'مدیران ستادی استانداری مازندران'}</a>
                              </li>
                              <li>
                                <a href="/managers?group=4">{'فرمانداران مازندران'}</a>
                              </li>
                              <li>
                                <a href="/managers?group=6">{'مشاورین استاندار'}</a>
                              </li>
                              <li>
                                <a href="/managers?group=3">
                                  {'مدیران ادارات و دستگاه های اجرایی'}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mm-item mm-item--sub">
                        <button
                          type="button"
                          className="mm-trigger mm-trigger--sub"
                          data-command="mmToggle"
                          data-command-args="this"
                          data-command-event="click"
                        >
                          <span className="mm-trigger-text">{'خدمات الکترونیکی'}</span>
                          <svg
                            className="mm-chevron"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        <div className="mm-panel">
                          <div className="mm-panel-inner">
                            <ul className="mm-list">
                              <li>
                                <a href="/services">{'خدمات الکترونیکی استانداری مازندران'}</a>
                              </li>
                              <li>
                                <a href="/services">{'خدمات الکترونیکی'}</a>
                              </li>
                              <li>
                                <a href="/services">{'میز خدمت وزارت کشور'}</a>
                              </li>
                              <li>
                                <a href="/links">{'پیوند ها'}</a>
                              </li>
                              <li>
                                <a href="/services">{'سامانه مدیریت خدمات دولت'}</a>
                              </li>
                              <li>
                                <a href="/services">{'پیشخوان ارباب رجوع'}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mm-item mm-item--sub">
                        <button
                          type="button"
                          className="mm-trigger mm-trigger--sub"
                          data-command="mmToggle"
                          data-command-args="this"
                          data-command-event="click"
                        >
                          <span className="mm-trigger-text">{'شرح وظایف واحد ها'}</span>
                          <svg
                            className="mm-chevron"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        <div className="mm-panel">
                          <div className="mm-panel-inner">
                            <div className="mm-item mm-item--sub2">
                              <button
                                type="button"
                                className="mm-trigger mm-trigger--sub2"
                                data-command="mmToggle"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <span className="mm-trigger-text">{'شرح وظایف کلی استانداری'}</span>
                                <svg
                                  className="mm-chevron"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </button>
                              <div className="mm-panel">
                                <div className="mm-panel-inner">
                                  <ul className="mm-list">
                                    <li>
                                      <a href="/duties">
                                        {'شرح وظایف و ماموریتهای اساسی استانداری ها'}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="mm-item mm-item--sub2">
                              <button
                                type="button"
                                className="mm-trigger mm-trigger--sub2"
                                data-command="mmToggle"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <span className="mm-trigger-text">
                                  {'معاونت سیاسی، امنیتی و اجتماعی'}
                                </span>
                                <svg
                                  className="mm-chevron"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </button>
                              <div className="mm-panel">
                                <div className="mm-panel-inner">
                                  <ul className="mm-list">
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D8%AF%D8%A7%D8%B1%20%D9%88%20%D8%B1%D9%88%D8%A7%D8%A8%D8%B7%20%D8%B9%D9%85%D9%88%D9%85%DB%8C%20%D9%88%20%D8%A8%DB%8C%D9%86%20%D8%A7%D9%84%D9%85%D9%84%D9%84">
                                        {'دفتر استاندار و روابط عمومی و بین الملل'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A8%D8%A7%D9%86%D9%88%D8%A7%D9%86%20%D9%88%20%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87">
                                        {'دفتر امور بانوان و خانواده'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%AD%D8%B1%D8%A7%D8%B3%D8%AA">
                                        {'اداره کل حراست'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D9%87%D8%B3%D8%AA%D9%87%20%DA%AF%D8%B2%DB%8C%D9%86%D8%B4">
                                        {'هسته گزینش'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C%20%D9%88%20%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8%D8%A7%D8%AA">
                                        {'اداره کل سیاسی و انتخابات'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%DB%8C%20%D9%88%20%D9%81%D8%B1%D9%87%D9%86%DA%AF%DB%8C">
                                        {'اداره کل امور اجتماعی و فرهنگی'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A7%D9%85%D9%86%DB%8C%D8%AA%DB%8C%20%D9%88%20%D8%A7%D9%86%D8%AA%D8%B8%D8%A7%D9%85%DB%8C">
                                        {'اداره کل امور امنیتی و انتظامی'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D9%BE%D8%AF%D8%A7%D9%81%D9%86%D8%AF%20%D8%BA%DB%8C%D8%B1%D8%B9%D8%A7%D9%85%D9%84">
                                        {'اداره کل پدافند غیرعامل'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A7%D8%AA%D8%A8%D8%A7%D8%B9%20%D9%88%20%D9%85%D9%87%D8%A7%D8%AC%D8%B1%DB%8C%D9%86">
                                        {'مدیریت امور اتباع و مهاجرین'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%B4%D9%87%D8%B1%DB%8C%20%D9%88%20%D8%B4%D9%88%D8%B1%D8%A7%D9%87%D8%A7">
                                        {'اداره کل شهری و شوراها'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%B1%D9%88%D8%B3%D8%AA%D8%A7%DB%8C%DB%8C%20%D9%88%20%D8%B4%D9%88%D8%B1%D8%A7%D9%87%D8%A7">
                                        {'اداره کل روستایی و شوراها'}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="mm-item mm-item--sub2">
                              <button
                                type="button"
                                className="mm-trigger mm-trigger--sub2"
                                data-command="mmToggle"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <span className="mm-trigger-text">
                                  {'معاون هماهنگی امور اقتصادی'}
                                </span>
                                <svg
                                  className="mm-chevron"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </button>
                              <div className="mm-panel">
                                <div className="mm-panel-inner">
                                  <ul className="mm-list">
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D9%87%D9%85%D8%A7%D9%87%D9%86%DA%AF%DB%8C%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF%DB%8C">
                                        {'دفتر هماهنگی امور اقتصادی'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D8%AC%D8%B0%D8%A8%20%D9%88%20%D8%AD%D9%85%D8%A7%DB%8C%D8%AA%20%D8%A7%D8%B2%20%D8%B3%D8%B1%D9%85%D8%A7%DB%8C%D9%87%20%DA%AF%D8%B0%D8%A7%D8%B1%DB%8C">
                                        {'دفتر جذب و حمایت از سرمایه گذاری'}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="mm-item mm-item--sub2">
                              <button
                                type="button"
                                className="mm-trigger mm-trigger--sub2"
                                data-command="mmToggle"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <span className="mm-trigger-text">
                                  {'معاونت توسعه مدیریت و منابع انسانی'}
                                </span>
                                <svg
                                  className="mm-chevron"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </button>
                              <div className="mm-panel">
                                <div className="mm-panel-inner">
                                  <ul className="mm-list">
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D8%8C%20%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA%20%D8%B9%D9%85%D9%84%DA%A9%D8%B1%D8%AF%D8%8C%20%D8%A8%D8%A7%D8%B2%D8%B1%D8%B3%DB%8C%20%D9%88%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%AD%D9%82%D9%88%D9%82%DB%8C">
                                        {'دفتر ، مدیریت عملکرد، بازرسی و امور حقوقی'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87%20%D8%B1%DB%8C%D8%B2%DB%8C%20%D8%8C%20%D9%86%D9%88%D8%B3%D8%A7%D8%B2%DB%8C%20%D9%88%D8%AA%D8%AD%D9%88%D9%84%20%D8%A7%D8%AF%D8%A7%D8%B1%DB%8C">
                                        {'دفتر برنامه ریزی ، نوسازی وتحول اداری'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA%20%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C%20%D8%A7%D8%B7%D9%84%D8%A7%D8%B9%D8%A7%D8%AA">
                                        {'مدیریت فناوری اطلاعات'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D9%85%D9%86%DB%8C%D8%AA%20%D9%81%D8%B6%D8%A7%DB%8C%20%D9%85%D8%AC%D8%A7%D8%B2%DB%8C%20%D9%88%20%D8%B4%D8%A8%DA%A9%D9%87%20%D8%AF%D9%88%D9%84%D8%AA">
                                        {'امنیت فضای مجازی و شبکه دولت'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D8%A7%D9%85%D9%88%D8%B1%20%D8%A7%D8%AF%D8%A7%D8%B1%DB%8C%20%D9%88%20%D9%85%D8%A7%D9%84%DB%8C">
                                        {'اداره کل امور اداری و مالی'}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="mm-item mm-item--sub2">
                              <button
                                type="button"
                                className="mm-trigger mm-trigger--sub2"
                                data-command="mmToggle"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <span className="mm-trigger-text">
                                  {'معاونت هماهنگی امور عمرانی'}
                                </span>
                                <svg
                                  className="mm-chevron"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </button>
                              <div className="mm-panel">
                                <div className="mm-panel-inner">
                                  <ul className="mm-list">
                                    <li>
                                      <a href="/unit?name=%D8%AF%D9%81%D8%AA%D8%B1%20%D9%81%D9%86%DB%8C%20%D8%8C%D8%A7%D9%85%D9%88%D8%B1%20%D8%B9%D9%85%D8%B1%D8%A7%D9%86%DB%8C%20%D9%88%20%D8%AD%D9%85%D9%84%20%D9%88%D9%86%D9%82%D9%84%20%D9%88%20%D8%AA%D8%B1%D8%A7%D9%81%DB%8C%DA%A9">
                                        {'دفتر فنی ،امور عمرانی و حمل ونقل و ترافیک'}
                                      </a>
                                    </li>
                                    <li>
                                      <a href="/unit?name=%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%DA%A9%D9%84%20%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA%20%D8%A8%D8%AD%D8%B1%D8%A7%D9%86">
                                        {'اداره کل مدیریت بحران'}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mm-item mm-item--sub">
                        <button
                          type="button"
                          className="mm-trigger mm-trigger--sub"
                          data-command="mmToggle"
                          data-command-args="this"
                          data-command-event="click"
                        >
                          <span className="mm-trigger-text">{'بیانیه سطح توافق خدمات'}</span>
                          <svg
                            className="mm-chevron"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        <div className="mm-panel">
                          <div className="mm-panel-inner">
                            <ul className="mm-list">
                              <li>
                                <a href="/support">{'پشتیبانی شبکه دولت'}</a>
                              </li>
                              <li>
                                <a href="/track">{'رهگیری'}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mm-item mm-item--sub">
                        <button
                          type="button"
                          className="mm-trigger mm-trigger--sub"
                          data-command="mmToggle"
                          data-command-args="this"
                          data-command-event="click"
                        >
                          <span className="mm-trigger-text">{'آشنایی با مازندران'}</span>
                          <svg
                            className="mm-chevron"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        <div className="mm-panel">
                          <div className="mm-panel-inner">
                            <ul className="mm-list">
                              <li>
                                <a href="/about">{'اطلاعات عمومی'}</a>
                              </li>
                              <li>
                                <a href="/counties">{'شهرستان‌ها'}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="/install" className="mm-link js-install-app">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <path d="M7 10l5 5 5-5"></path>
                      <path d="M12 15V3"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'نصب اپلیکیشن'}</span>
                </a>
                <a href="/polls" className="mm-link">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'نظرسنجی دستگاه‌های اجرایی'}</span>
                </a>
                <a href="/duties" className="mm-link">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <path d="M9 13h6"></path>
                      <path d="M9 17h6"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'شرح وظایف واحدها'}</span>
                </a>
                <a href="/services" className="mm-link">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'سطح توافق خدمات'}</span>
                </a>
                <a href="/assistant" className="mm-link mm-link--ai js-open-ai">
                  <span className="mm-link-icon">
                    <svg
                      viewBox="0 0 18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 2l1.5 4.5L15 8l-4.5 1.5L9 14l-1.5-4.5L3 8l4.5-1.5L9 2z"></path>
                    </svg>
                  </span>
                  <span className="mm-link-text">{'هوش مصنوعی سازمانی'}</span>
                  <span className="mm-ai-badge">{'AI'}</span>
                </a>
              </nav>
            </div>
          </div>
          <div className="header-paen">
            <div className="marquee">
              <span>{'اقتصاد مقاومتی در سایه وحدت ملی و امنیت ملی'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
