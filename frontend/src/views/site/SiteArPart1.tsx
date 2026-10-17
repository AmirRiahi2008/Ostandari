import { CountyMap } from '@/components/site/county-map';
export default function SiteArPart1() {
  return (
    <>
      <div className="container-asli">
        <section>
          <div className="header-container">
            <div className="nav-bala">
              <div className="nav-bala-right">
                <div className="tamas">
                  <a href="/contact">{'اتصل بنا'}</a>
                </div>
                <div className="dastresi">
                  <a href="/quick-access">{'الوصول السريع'}</a>
                </div>
                <div className="ghavanin">
                  <a href="/regulations">{'القوانين واللوائح'}</a>
                </div>
                <div className="etelaat">
                  <a href="/information">{'حرية الوصول إلى المعلومات'}</a>
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
                    <svg width="26" height="26" viewBox="0 0 26 26">
                      <defs>
                        <clipPath id="s904e2b-0-palMainClip">
                          <circle cx="13" cy="13" r="13"></circle>
                        </clipPath>
                      </defs>
                      <g clipPath="url(#s904e2b-0-palMainClip)">
                        <rect width="26" height="8.67" y="0" fill="#000000"></rect>
                        <rect width="26" height="8.67" y="8.67" fill="#ffffff"></rect>
                        <rect width="26" height="8.66" y="17.34" fill="#007A3D"></rect>
                        <path d="M0 0 L13 13 L0 26 Z" fill="#CE1126"></path>
                      </g>
                    </svg>
                    <div className="flag-dropdown" id="flagDropdown">
                      <div
                        className="flag-option"
                        data-lang="fa"
                        data-navigate="/"
                        role="button"
                        tabIndex={0}
                        aria-label="باز کردن بخش"
                      >
                        <svg width="22" height="16" viewBox="0 0 30 20">
                          <rect width="30" height="6.67" y="0" fill="#239F40"></rect>
                          <rect width="30" height="6.67" y="6.67" fill="#ffffff"></rect>
                          <rect width="30" height="6.66" y="13.34" fill="#DA0000"></rect>
                        </svg>
                        <span>{'فارسی'}</span>
                      </div>
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
                      <rect width="26" height="26" fill="url(#s904e2b-1-pattern0_6_293)"></rect>
                      <defs>
                        <pattern
                          id="s904e2b-1-pattern0_6_293"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#s904e2b-1-image0_6_293"
                          ></use>
                        </pattern>
                        <image
                          id="s904e2b-1-image0_6_293"
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
                      <span className="d-58d7da1d74b0f6">{'التسجيل '}</span>
                    </a>
                  </div>
                  <div className="vorod">
                    <a href="/login">
                      <span className="d-58d7da1d74b0f6">{'تسجيل الدخول'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="imageeee d-4fa00029d5b13b">
              <img
                className="icx-responsive-img"
                src="/design/site/assets/image/baner.png"
                alt=""
              />
              <div className="shoar-sal">
                <img
                  src="/design/site/assets/image/شعار پ.png"
                  alt=""
                  className="d-ed08e28b319a21"
                />
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
                          <rect width="18" height="18" fill="url(#s904e2b-2-pattern0_1_227)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-2-pattern0_1_227"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-2-image0_1_227"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-2-image0_1_227"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/12a13fc64388de60816a.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/">{'الرئيسية'}</a>
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
                          <rect width="18" height="18" fill="url(#s904e2b-3-pattern0_1_219)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-3-pattern0_1_219"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-3-image0_1_219"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-3-image0_1_219"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/cbbe09ece27bf5f281c5.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/services" id="khadmat">
                          {'الخدمات'}
                        </a>
                      </div>
                      <div className="mega-menu">
                        <ul className="categories">
                          <li data-target="sub1" className="active">
                            <span className="category-text">{'مديرو المحافظة'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub2">
                            <span className="category-text">{'الخدمات الإلكترونية'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub3">
                            <span className="category-text">{'المهام الوظيفية للوحدات'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub4">
                            <span className="category-text">{'اتفاقية مستوى الخدمة'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub5">
                            <span className="category-text">{'تعرف على مازندران'}</span>
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
                                <div className="submenu-text">{'نواب محافظ مازندران'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مديرو مقر محافظة مازندران'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'رؤساء أقضية مازندران'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مستشارو المحافظ'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'رؤساء الإدارات والأجهزة التنفيذية '}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="sub2" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'الخدمات الإلكترونية لمحافظة مازندران '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'الخدمات الإلكترونية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مكتب خدمة وزارة الداخلية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'الروابط'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'نظام إدارة الخدمات الحكومية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'شباك خدمة المراجعين'}</div>
                              </div>
                            </div>
                          </div>
                          <div id="sub3" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المهام والمسؤوليات الأساسية للمحافظات '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'نائب الشؤون السياسية والأمنية والاجتماعية'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'نائب تنسيق الشؤون الاقتصادية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'نائب تنمية الإدارة والموارد البشرية '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'نائب تنسيق شؤون التنمية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'مكتب المحافظ والعلاقات العامة والدولية: '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مكتب شؤون المرأة والأسرة'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'مكتب إدارة الأداء والتفتيش والشؤون القانونية'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'المديرية العامة للحراسة'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'وحدة الاختيار'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'مكتب التخطيط والتحديث والتحول الإداري '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'إدارة تقنية المعلومات'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'أمن الفضاء الإلكتروني والشبكة الحكومية '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون الإدارية والمالية'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون السياسية والانتخابات'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون الاجتماعية والثقافية'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون الأمنية'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للدفاع غير المسلح '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'إدارة شؤون الرعايا الأجانب والمهاجرين '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مكتب جذب ودعم الاستثمار'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'مكتب تنسيق الشؤون الاقتصادية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون الحضرية والمجالس'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة للشؤون الريفية والمجالس'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'المديرية العامة لإدارة الأزمات'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'مكتب الشؤون الفنية والتنموية والنقل والمرور'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="sub4" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'دعم الشبكة الحكومية'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'المتابعة'}</div>
                              </div>
                            </div>
                          </div>
                          <div id="sub5" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'معلومات عامة'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'المدن'}</div>
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
                        <a href="/install">{'تثبيت التطبيق'}</a>
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
                          <rect width="18" height="18" fill="url(#s904e2b-4-pattern0_1_195)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-4-pattern0_1_195"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-4-image0_1_195"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-4-image0_1_195"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/01d3830564ad0aa38112.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/polls">{'استطلاع الأجهزة التنفيذية'}</a>
                      </div>
                    </div>
                  </div>
                  <div className="logo-wrapper">
                    <img
                      src="/design/site/assets/image/logo.png"
                      alt="الشعار"
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
                          <rect width="18" height="18" fill="url(#s904e2b-5-pattern0_1_223)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-5-pattern0_1_223"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-5-image0_1_223"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-5-image0_1_223"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/989bbb43ae0c7c4dbfea.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/governorate">{'نظام الشفافية'}</a>
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
                          <rect width="18" height="18" fill="url(#s904e2b-6-pattern0_1_204)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-6-pattern0_1_204"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-6-image0_1_204"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-6-image0_1_204"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/0734cb762b5580fbb2f2.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/duties">{'الوظيفية للوحدات'}</a>
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
                          <rect width="18" height="18" fill="url(#s904e2b-7-pattern0_1_200)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-7-pattern0_1_200"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-7-image0_1_200"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-7-image0_1_200"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/653b3c9da2eb5f0ffa21.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/service-agreement">{' اتفاقية الخدمة'}</a>
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
                          <rect width="18" height="18" fill="url(#s904e2b-8-pattern0_1_208)"></rect>
                          <defs>
                            <pattern
                              id="s904e2b-8-pattern0_1_208"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-8-image0_1_208"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-8-image0_1_208"
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
                        <a href="/assistant">{'الذكاء الاصطناعي المؤسسي'}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-menu-overlay" id="mobileMenu">
                  <div className="mobile-menu-header-image"></div>
                  <div className="mobile-menu-header">
                    <span>
                      <svg
                        width="150"
                        height="162"
                        viewBox="0 0 150 162"
                        fill="none"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="d-dde2348af2fc85"
                      >
                        <g filter="url(#s904e2b-9-filter0_d_1_209)">
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
                            fill="url(#s904e2b-9-pattern0_1_209)"
                          ></rect>
                        </g>
                        <defs>
                          <filter
                            id="s904e2b-9-filter0_d_1_209"
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
                            id="s904e2b-9-pattern0_1_209"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="scale(0.00195312)"
                              xlinkHref="#s904e2b-9-image0_1_209"
                            ></use>
                          </pattern>
                          <image
                            id="s904e2b-9-image0_1_209"
                            width="512"
                            height="512"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/7ce925f0576fccad43cd.png"
                          ></image>
                        </defs>
                      </svg>
                    </span>
                    <span
                      className="close-mobile-menu"
                      id="closeMobileMenu"
                      role="button"
                      tabIndex={0}
                      aria-label="بستن منو"
                    >
                      {'×'}
                    </span>
                  </div>
                  <div className="mobile-nav-item">
                    <a href="/" className="mobile-nav-title">
                      {'الرئيسية'}
                    </a>
                  </div>
                  <div className="mobile-nav-item">
                    <a href="/governorate" className="mobile-nav-title">
                      {'نظام الشفافية'}
                    </a>
                  </div>
                  <div className="mobile-nav-item">
                    <div
                      className="mobile-nav-title"
                      data-command="toggleMobileMenu"
                      data-command-args="'mob-managers'"
                      data-command-event="click"
                      role="button"
                      tabIndex={0}
                      aria-label="باز کردن بخش"
                    >
                      <span>{'مديرو المقر'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-managers">
                      <li>
                        <a href="/deputies">{'نواب محافظ مازندران'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=1">{'مديرو مقر محافظة مازندران'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=4">{'رؤساء أقضية مازندران'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=6">{'مستشارو المحافظ'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=3">{'رؤساء الإدارات والأجهزة التنفيذية'}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mobile-nav-item">
                    <div
                      className="mobile-nav-title"
                      data-command="toggleMobileMenu"
                      data-command-args="'mob-mazandaran'"
                      data-command-event="click"
                      role="button"
                      tabIndex={0}
                      aria-label="باز کردن بخش"
                    >
                      <span>{'تعرف على مازندران'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-mazandaran">
                      <li>
                        <a href="/about">{'معلومات عامة'}</a>
                      </li>
                      <li>
                        <a href="/counties">{'المدن'}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mobile-nav-item">
                    <div
                      className="mobile-nav-title"
                      data-command="toggleMobileMenu"
                      data-command-args="'mob-services'"
                      data-command-event="click"
                      role="button"
                      tabIndex={0}
                      aria-label="باز کردن بخش"
                    >
                      <span>{'الخدمات'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-services">
                      <li>
                        <a href="/services">{'الخدمات الإلكترونية لمحافظة مازندران'}</a>
                      </li>
                      <li>
                        <a href="/services">{'روابط الخدمات الإلكترونية'}</a>
                      </li>
                      <li>
                        <a href="/services">{'مكتب خدمة وزارة الداخلية'}</a>
                      </li>
                      <li>
                        <a href="/services">{'نظام إدارة الخدمات الحكومية'}</a>
                      </li>
                      <li>
                        <a href="/services">{'شباك خدمة المراجعين'}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mobile-nav-item">
                    <div
                      className="mobile-nav-title"
                      data-command="toggleMobileMenu"
                      data-command-args="'mob-sla'"
                      data-command-event="click"
                      role="button"
                      tabIndex={0}
                      aria-label="باز کردن بخش"
                    >
                      <span>{'اتفاقية مستوى الخدمة'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-sla">
                      <li>
                        <a href="/support">{'دعم الشبكة الحكومية'}</a>
                      </li>
                      <li>
                        <a href="/track">{'المتابعة'}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mobile-nav-item">
                    <div
                      className="mobile-nav-title"
                      data-command="toggleMobileMenu"
                      data-command-args="'mob-duties'"
                      data-command-event="click"
                      role="button"
                      tabIndex={0}
                      aria-label="باز کردن بخش"
                    >
                      <span>{'المهام الوظيفية للوحدات'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-duties">
                      <li>
                        <a href="/deputies">{'المحافظ ونوابه'}</a>
                      </li>
                      <li>
                        <a href="/duties">{'وحدات أخرى'}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="header-paen">
                <div className="marquee">
                  <span>{'الاقتصاد المقاوم في ظل الوحدة الوطنية والأمن القومي'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container-body d-f6279acc73263f">
            <div className="container-body-center">
              <div className="akhbar-scroll-wrapper">
                <div className="akhbar-scroll-div">
                  <a className="akhbar-container" href="/news/design-1">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805571WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'الأخبار'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">{'الاجتماع الثاني للمتدربين الجدد'}</div>
                      <div className="akhbar-date">
                        {
                          'عُقد الاجتماع الثاني للتعريف بالمتدربين الجدد بهيئات النقابة، يوم الاثنين الموافق 1404/5/20 في قاعة الاجتماعات...'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-2">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805570WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'القرارات'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">{'الاجتماع الثاني للمتدربين الجدد'}</div>
                      <div className="akhbar-date">
                        {
                          'عُقد الاجتماع الثاني للتعريف بالمتدربين الجدد بهيئات النقابة، يوم الاثنين الموافق 1404/5/20 في قاعة الاجتماعات...'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-3">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805571WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'إعلان'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'إعلان: التسجيل في امتحان الخبراء القضائيين الرسميين'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'بدأ التسجيل في امتحان الخبراء القضائيين الرسميين لعام 1404 التابع للمجلس الأعلى للخبراء.'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-3">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805570WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'القرارات'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">{'الاجتماع الثاني للمتدربين الجدد'}</div>
                      <div className="akhbar-date">
                        {
                          'عُقد الاجتماع الثاني للتعريف بالمتدربين الجدد بهيئات النقابة، يوم الاثنين الموافق 1404/5/20 في قاعة الاجتماعات...'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-3">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805571WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'إعلان'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'إعلان: التسجيل في امتحان الخبراء القضائيين الرسميين'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'بدأ التسجيل في امتحان الخبراء القضائيين الرسميين لعام 1404 التابع للمجلس الأعلى للخبراء.'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-3">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805571WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'إعلان'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'إعلان: التسجيل في امتحان الخبراء القضائيين الرسميين'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'بدأ التسجيل في امتحان الخبراء القضائيين الرسميين لعام 1404 التابع للمجلس الأعلى للخبراء.'
                        }
                      </div>
                    </div>
                  </a>
                  <a className="akhbar-container" href="/news/design-3">
                    <img
                      src="/design/site/assets/image/SlideShowImage79805571WhatsApp Image 2025-05-31 at 11.26.35 2.jpg"
                      alt=""
                    />
                    <div className="akhbar-left">
                      <div className="akhbar-header">
                        <div className="akhbar-btn">{'إعلان'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'إعلان: التسجيل في امتحان الخبراء القضائيين الرسميين'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'بدأ التسجيل في امتحان الخبراء القضائيين الرسميين لعام 1404 التابع للمجلس الأعلى للخبراء.'
                        }
                      </div>
                    </div>
                  </a>
                </div>
                <div className="tabs">
                  <div className="tab right-flat">{'الكل'}</div>
                  <div className="tab both-slanted">{'إعلان'}</div>
                  <div className="tab both-slanted">{'الأخبار'}</div>
                  <div className="tab left-flat">{'القرارات'}</div>
                </div>
              </div>
            </div>
            <div className="container-body-right">
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/design/site/assets/image/SlideShowImage48554642IMG_20260323_133439_246.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
            <div className="container-body-left">
              <img src="/design/site/assets/image/ProfImage80906772photo15252682277.jpg" alt="" />
              <div className="name">
                <span>{'مهدي يونسي رستمي'}</span>
                <p>{'محافظ مازندران'}</p>
              </div>
              <div className="name-btn">{' التواصل مع المحافظ '}</div>
              <div className="name-btn2">{' التعريف بالمحافظين '}</div>
              <div className="name-icon">
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/bale-color.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/eitaa-icon-colorful.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/linkedin.png" alt="" />
                </a>
                <a href="/social" aria-label="شبکه‌های اجتماعی">
                  <img src="/design/site/assets/image/telegram.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="sections-container">
          <section>
            <CountyMap />
          </section>
          <section>
            <div className="container-peyvand">
              <div className="mz-portal-wrapper">
                <div className="mz-portal-news">
                  <h2 className="mz-portal-title">{'أحدث القرارات والإعلانات:'}</h2>
                  <p className="mz-portal-subtitle">{'اطّلع على أحدث قرارات وإعلانات الجهة.'}</p>
                  <ul className="mz-news-list" id="mzNewsList">
                    <li className="mz-news-item">
                      <div>
                        <svg
                          className="item-svg"
                          width="70"
                          height="78"
                          viewBox="0 0 70 78"
                          fill="none"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="70" height="78" rx="15" fill="#FEFEFE"></rect>
                          <rect
                            x="15"
                            y="19"
                            width="40"
                            height="40"
                            rx="15"
                            fill="url(#s904e2b-10-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s904e2b-10-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-10-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-10-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'الأربعاء، 23 أرديبهشت 1404'}</span>
                        <p>{'عقد اجتماع مجلس الإدارة.'}</p>
                      </div>
                    </li>
                    <li className="mz-news-item">
                      <div>
                        <svg
                          className="item-svg"
                          width="70"
                          height="78"
                          viewBox="0 0 70 78"
                          fill="none"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="70" height="78" rx="15" fill="#FEFEFE"></rect>
                          <rect
                            x="15"
                            y="19"
                            width="40"
                            height="40"
                            rx="15"
                            fill="url(#s904e2b-11-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s904e2b-11-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-11-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-11-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'الاثنين، 16 أرديبهشت 1404'}</span>
                        <p>{'عقد اجتماع مجلس الإدارة.'}</p>
                      </div>
                    </li>
                    <li className="mz-news-item">
                      <div>
                        <svg
                          className="item-svg"
                          width="70"
                          height="78"
                          viewBox="0 0 70 78"
                          fill="none"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="70" height="78" rx="15" fill="#FEFEFE"></rect>
                          <rect
                            x="15"
                            y="19"
                            width="40"
                            height="40"
                            rx="15"
                            fill="url(#s904e2b-12-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s904e2b-12-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-12-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-12-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'السبت، 14 أرديبهشت 1404'}</span>
                        <p>
                          {
                            'بدء التسجيل للدورة السابعة من المجالس الإسلامية للمدن والقرى اعتباراً من 21 دي 1404'
                          }
                        </p>
                      </div>
                    </li>
                    <li className="mz-news-item">
                      <div>
                        <svg
                          className="item-svg"
                          width="70"
                          height="78"
                          viewBox="0 0 70 78"
                          fill="none"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="70" height="78" rx="15" fill="#FEFEFE"></rect>
                          <rect
                            x="15"
                            y="19"
                            width="40"
                            height="40"
                            rx="15"
                            fill="url(#s904e2b-13-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s904e2b-13-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-13-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-13-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'الأحد، 1 أرديبهشت 1404'}</span>
                        <p>{'مجلس إدارة الدورة التاسعة عشرة.'}</p>
                      </div>
                    </li>
                    <li className="mz-news-item">
                      <div>
                        <svg
                          className="item-svg"
                          width="70"
                          height="78"
                          viewBox="0 0 70 78"
                          fill="none"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="70" height="78" rx="15" fill="#FEFEFE"></rect>
                          <rect
                            x="15"
                            y="19"
                            width="40"
                            height="40"
                            rx="15"
                            fill="url(#s904e2b-14-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s904e2b-14-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s904e2b-14-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s904e2b-14-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'الأحد، 1 أرديبهشت 1404'}</span>
                        <p>{'مجلس إدارة الدورة التاسعة عشرة.'}</p>
                      </div>
                    </li>
                  </ul>
                  <a href="/news" className="mz-news-more">
                    {'عرض الكل ←'}
                  </a>
                </div>
                <div className="mz-portal-links">
                  <h2 className="mz-portal-title">{'روابط مفيدة:'}</h2>
                  <p className="mz-portal-subtitle">{'اطّلع على روابط الجهة المفيدة هنا.'}</p>
                  <div className="mz-links-grid">
                    <a className="mz-link-btn" href="/ideas">
                      {'نموذج تقديم الأفكار'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'دعوة إدارة النفايات'}
                    </a>
                    <a className="mz-link-btn" href="/tenders">
                      {'نظام المشتريات الإلكترونية الحكومية'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'دعوة لتسجيل المتقدمين للخدمة العسكرية البديلة'}
                    </a>
                    <a className="mz-link-btn" href="/faq">
                      {'الأسئلة الشائعة'}
                    </a>
                    <a className="mz-link-btn" href="/polls">
                      {'استطلاع أجهزة المحافظة'}
                    </a>
                    <a className="mz-link-btn" href="/events">
                      {'فعالية جائزة شباب السكان'}
                    </a>
                    <a className="mz-link-btn" href="/transparency">
                      {'نظام شفافية المحافظة'}
                    </a>
                    <a className="mz-link-btn" href="/investments">
                      {'فرص الاستثمار في محافظة مازندران'}
                    </a>
                    <a className="mz-link-btn" href="/events">
                      {'البرامج الأسبوعية "الساحل السعيد" لمحافظة مازندران'}
                    </a>
                    <a className="mz-link-btn" href="/contracts">
                      {'قاعدة بيانات العقود الوطنية'}
                    </a>
                    <a className="mz-link-btn" href="/services">
                      {'مكتب الخدمات الإلكترونية'}
                    </a>
                    <a className="mz-link-btn" href="/links">
                      {'مقر إقامة الصلاة في مازندران'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'الامتحان المشترك الشامل الثاني عشر للأجهزة التنفيذية'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container-modiran">
              <section className="section">
                <div className="manager-tabs" role="tablist">
                  <span className="tab-indicator-bg"></span>
                  <button
                    className="tab-btn active"
                    data-tab="tab1"
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{'مديرو المقر'}</span>
                  </button>
                  <button className="tab-btn" data-tab="tab2" role="tab" aria-selected="false">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2 3 7v2h18V7z"></path>
                      <path d="M5 9v10"></path>
                      <path d="M9 9v10"></path>
                      <path d="M15 9v10"></path>
                      <path d="M19 9v10"></path>
                      <path d="M3 21h18"></path>
                    </svg>
                    <span>{'المحافظون'}</span>
                  </button>
                  <button className="tab-btn" data-tab="tab3" role="tab" aria-selected="false">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"></path>
                    </svg>
                    <span>{'رؤساء الأقضية'}</span>
                  </button>
                  <button className="tab-btn" data-tab="tab4" role="tab" aria-selected="false">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9.5 12 3l9 6.5"></path>
                      <path d="M5 10v10h14V10"></path>
                      <path d="M10 20v-6h4v6"></path>
                    </svg>
                    <span>{'مديرو النواحي'}</span>
                  </button>
                  <button className="tab-btn" data-tab="tab5" role="tab" aria-selected="false">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21c0-4 4-6 9-6s9 2 9 6"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{'رؤساء القرى'}</span>
                  </button>
                </div>
                <div className="tab-content active" id="tab1">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام للشؤون الأمنية بمحافظة مازندران'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'نائب المحافظ'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'نائب تنمية الإدارة والموارد'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام للشؤون الاجتماعية والثقافية'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام لمكتب المحافظ'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام للشؤون الحضرية والمجالس'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام لتقنية المعلومات بالمحافظة'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="ميثم يونسي"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'ميثم يونسي'}</h3>
                          <div className="badge">{'مدير عام'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'المدير العام للتفتيش وإدارة الأداء والشؤون القانونية'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'عرض المزيد'}</h3>
                        <p>{'القائمة الكاملة لمديري المقر'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="tab2">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img cart1-avatar">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                          </svg>
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'السيد محمد آل هاشم'}</h3>
                          <div className="badge">{'المحافظ'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'محافظ مازندران'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'عرض المزيد'}</h3>
                        <p>{'القائمة الكاملة للمحافظين'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="tab3">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img cart1-avatar">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                          </svg>
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'رئيس قضاء ساري'}</h3>
                          <div className="badge">{'رئيس القضاء'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'محافظة ساري الفرعية'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img cart1-avatar">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                          </svg>
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'رئيس قضاء بابل'}</h3>
                          <div className="badge">{'رئيس القضاء'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'محافظة بابل الفرعية'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'عرض المزيد'}</h3>
                        <p>{'القائمة الكاملة لرؤساء الأقضية'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="tab4">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img cart1-avatar">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                          </svg>
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'مدير الناحية المركزية'}</h3>
                          <div className="badge">{'مدير الناحية'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'مكتب الناحية المركزية للمحافظة'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'عرض المزيد'}</h3>
                        <p>{'القائمة الكاملة لمديري النواحي'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content" id="tab5">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img cart1-avatar">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                          </svg>
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'رئيس القرية النموذجي'}</h3>
                          <div className="badge">{'رئيس القرية'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'مجلس القرية النموذجية'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'الملف الشخصي'}</button>
                        <button className="btn-solid">{'تواصل'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'عرض المزيد'}</h3>
                        <p>{'القائمة الكاملة لرؤساء القرى'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section>
            <div className="container-omomi">
              <div className="stdprx-container">
                <div className="stdprx-header">
                  <span>{'العلاقات العامة للمحافظة'}</span>
                </div>
                <div className="stdprx-body">
                  <div className="stdprx-tv">
                    <div className="stdprx-screen">
                      <svg
                        width="467"
                        height="309"
                        viewBox="0 0 467 309"
                        fill="none"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width="467" height="309" fill="url(#s904e2b-15-pattern0_19_3)"></rect>
                        <defs>
                          <pattern
                            id="s904e2b-15-pattern0_19_3"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000938086 0 0 0.00141776 0 -0.067102)"
                              xlinkHref="#s904e2b-15-image0_19_3"
                            ></use>
                          </pattern>
                          <image
                            id="s904e2b-15-image0_19_3"
                            width="1066"
                            height="800"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/3594bc8858cf8f1346c6.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <span className="stdprx-play"></span>
                    </div>
                    <div className="stdprx-stand"></div>
                  </div>
                  <div className="stdprx-timeline">
                    <ul className="stdprx-list">
                      <li className="stdprx-item active">
                        {' زيارة محافظ مازندران لجسر ممر سد جلورد '}
                      </li>
                      <li className="stdprx-item">
                        {
                          ' زيارة الدكتور يونسي، محافظ مازندران، للمشاريع غير المكتملة في نور ومحمودآباد '
                        }
                      </li>
                      <li className="stdprx-item">
                        {
                          ' لقاء محافظ مازندران بممثلي الأحزاب والمنظمات والشباب والنساء الناشطين سياسياً '
                        }
                      </li>
                      <li className="stdprx-item">
                        {' حفل تعريف محافظ مازندران بحضور وزير الداخلية وممثل الولي الفقيه '}
                      </li>
                      <li className="stdprx-item">
                        {
                          ' استقبال محافظ ومسؤولي مازندران للأمين العام وسفراء دول التعاون الاقتصادي في المطار دشت ناز '
                        }
                      </li>
                      <li className="stdprx-item">
                        {' حفل افتتاح فعالية "ساري 2023 عاصمة السياحة لدول التعاون الاقتصادي" '}
                      </li>
                    </ul>
                    <div className="stdprx-actions">
                      <button className="stdprx-btn live">{'مباشر'}</button>
                      <button className="stdprx-btn archive">{'الأرشيف'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container-galery">
              <section className="gallery-section">
                <h2 className="gallery-title">{'معرض الصور'}</h2>
                <div className="gallery-wrapper">
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'المشاريع التنفيذية'}</span>
                      <div className="jahatha">
                        <span className="jahat">{'‹'}</span>
                        <span className="jahat">{'›'}</span>
                      </div>
                    </div>
                    <div className="image-box">
                      <svg
                        width="350"
                        height="265"
                        viewBox="0 0 350 265"
                        fill="none"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-16-pattern0_213_175)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-16-paint0_linear_213_175)"
                          fillOpacity="0.5"
                        ></rect>
                        <defs>
                          <pattern
                            id="s904e2b-16-pattern0_213_175"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000808913 0 0 0.00106838 -0.0177045 0)"
                              xlinkHref="#s904e2b-16-image0_213_175"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s904e2b-16-paint0_linear_213_175"
                            x1="175"
                            y1="0"
                            x2="175"
                            y2="265"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.8" stopOpacity="0.1"></stop>
                            <stop offset="0.9"></stop>
                          </linearGradient>
                          <image
                            id="s904e2b-16-image0_213_175"
                            width="1280"
                            height="936"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/4ec4d1148623880686cb.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">
                        {' زيارة المحافظ لعمليات تحسين وإعادة إعمار المطار '}
                      </p>
                    </div>
                  </div>
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'المشاريع التنفيذية'}</span>
                      <div className="jahatha">
                        <span className="jahat">{'‹'}</span>
                        <span className="jahat">{'›'}</span>
                      </div>
                    </div>
                    <div className="image-box">
                      <svg
                        width="350"
                        height="265"
                        viewBox="0 0 350 265"
                        fill="none"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-17-pattern0_213_161)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-17-paint0_linear_213_161)"
                          fillOpacity="0.2"
                        ></rect>
                        <defs>
                          <pattern
                            id="s904e2b-17-pattern0_213_161"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000823877 0 0 0.00108814 -0.0272812 0)"
                              xlinkHref="#s904e2b-17-image0_213_161"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s904e2b-17-paint0_linear_213_161"
                            x1="175"
                            y1="0"
                            x2="175"
                            y2="265"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.8" stopOpacity="0.1"></stop>
                            <stop offset="0.9"></stop>
                          </linearGradient>
                          <image
                            id="s904e2b-17-image0_213_161"
                            width="1280"
                            height="919"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/cc9e5a22e70a607c7570.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">{' زيارة المحافظ لجسر جديد قيد الإنشاء '}</p>
                    </div>
                  </div>
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'المشاريع التنفيذية'}</span>
                      <div className="jahatha">
                        <span className="jahat">{'‹'}</span>
                        <span className="jahat">{'›'}</span>
                      </div>
                    </div>
                    <div className="image-box">
                      <svg
                        width="350"
                        height="265"
                        viewBox="0 0 350 265"
                        fill="none"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-18-pattern0_167_68)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s904e2b-18-paint0_linear_167_68)"
                          fillOpacity="0.5"
                        ></rect>
                        <defs>
                          <pattern
                            id="s904e2b-18-pattern0_167_68"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000808913 0 0 0.00106838 -0.0177045 0)"
                              xlinkHref="#s904e2b-18-image0_167_68"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s904e2b-18-paint0_linear_167_68"
                            x1="175"
                            y1="0"
                            x2="175"
                            y2="265"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.8" stopOpacity="0.1"></stop>
                            <stop offset="0.9"></stop>
                          </linearGradient>
                          <image
                            id="s904e2b-18-image0_167_68"
                            width="1280"
                            height="936"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/29086cb1e1d6be9abdec.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">{' افتتاح مشروع تنموي بحضور المسؤولين '}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section>
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
                    <g filter="url(#s904e2b-19-filter0_d_1_209)">
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
                        fill="url(#s904e2b-19-pattern0_1_209)"
                      ></rect>
                    </g>
                    <defs>
                      <filter
                        id="s904e2b-19-filter0_d_1_209"
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
                        id="s904e2b-19-pattern0_1_209"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          transform="scale(0.00195312)"
                          xlinkHref="#s904e2b-19-image0_1_209"
                        ></use>
                      </pattern>
                      <image
                        id="s904e2b-19-image0_1_209"
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
                      <h4 className="icx-footer-title">{'الموقع'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/links">
                            {'عملاؤنا'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/services">
                            {'الخدمات'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/about">
                            {'من نحن'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col">
                      <h4 className="icx-footer-title">{'الصفحات'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/services">
                            {'الخدمات'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/links">
                            {'عملاؤنا'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/help">
                            {'الميزات'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col">
                      <h4 className="icx-footer-title">{'الخدمات'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/help">
                            {'التعليم'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/quick-access">
                            {'يومي'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/quick-access">
                            {'مميز'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col icx-footer-contact">
                      <h4 className="icx-footer-title">{'معلومات الاتصال'}</h4>
                      <p className="icx-footer-text">
                        <i className="fa-solid fa-location-dot icx-footer-icon"></i>
                        {' مازندران - ساري - شارع الشيخ طبرسي مقابل شارع ملت، مبنى طبرستان '}
                      </p>
                      <p className="icx-footer-text">
                        <i className="fa-regular fa-envelope icx-footer-icon"></i>
                        {' info@irancompile.com '}
                      </p>
                      <p className="icx-footer-text">
                        <i className="fa-solid fa-phone icx-footer-icon"></i>
                        {' 01133324056 '}
                      </p>
                      <div className="icx-footer-social">
                        <a
                          className="icx-footer-social-link"
                          href="/social"
                          aria-label="شبکه‌های اجتماعی"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                        <a
                          className="icx-footer-social-link"
                          href="/social"
                          aria-label="شبکه‌های اجتماعی"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a
                          className="icx-footer-social-link"
                          href="/social"
                          aria-label="شبکه‌های اجتماعی"
                        >
                          <i className="fab fa-telegram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
              <div className="bottom-footer">
                <div className="d-812ca5ad2a1e69">{' صدرا رايانه نوين طبرستان '}</div>
                {' تصميم و تم تطويره بواسطة '}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
