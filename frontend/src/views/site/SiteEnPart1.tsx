import { CountyMap } from '@/components/site/county-map';
export default function SiteEnPart1() {
  return (
    <>
      <div className="container-asli">
        <section>
          <div className="header-container">
            <div className="nav-bala">
              <div className="nav-bala-right">
                <div className="tamas">
                  <a href="/contact">{'Contact Us'}</a>
                </div>
                <div className="dastresi">
                  <a href="/quick-access">{'Quick Access'}</a>
                </div>
                <div className="ghavanin">
                  <a href="/regulations">{'Laws & Regulations'}</a>
                </div>
                <div className="etelaat">
                  <a href="/information">{'Freedom of Information'}</a>
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
                        <clipPath id="s85f25f-0-walesMainClip">
                          <circle cx="13" cy="13" r="13"></circle>
                        </clipPath>
                      </defs>
                      <g clipPath="url(#s85f25f-0-walesMainClip)">
                        <rect width="26" height="13" y="0" fill="#ffffff"></rect>
                        <rect width="26" height="13" y="13" fill="#00B140"></rect>
                        <path
                          d="M5 13c0-4 3-7 6-8-1.5 3-1.5 6 0 8-1.5 2-1.5 5 0 8-3-1-6-4-6-8z"
                          fill="#C8102E"
                        ></path>
                        <path
                          d="M5 13c1.5-1.5 4-2 7-1.6-1.5.9-2.5 1.6-2.5 1.6s1 .7 2.5 1.6c-3 .4-5.5-.1-7-1.6z"
                          fill="#C8102E"
                        ></path>
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
                      <rect width="26" height="26" fill="url(#s85f25f-1-pattern0_6_293)"></rect>
                      <defs>
                        <pattern
                          id="s85f25f-1-pattern0_6_293"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            transform="scale(0.00195312)"
                            xlinkHref="#s85f25f-1-image0_6_293"
                          ></use>
                        </pattern>
                        <image
                          id="s85f25f-1-image0_6_293"
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
                      <span className="d-58d7da1d74b0f6">{'Register '}</span>
                    </a>
                  </div>
                  <div className="vorod">
                    <a href="/login">
                      <span className="d-58d7da1d74b0f6">{'Sign In'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="imageeee d-4fa00029d5b13b">
              <img className="icx-responsive-img" alt="" />
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
                          <rect width="18" height="18" fill="url(#s85f25f-2-pattern0_1_227)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-2-pattern0_1_227"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-2-image0_1_227"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-2-image0_1_227"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/12a13fc64388de60816a.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/">{'Home'}</a>
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
                          <rect width="18" height="18" fill="url(#s85f25f-3-pattern0_1_219)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-3-pattern0_1_219"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-3-image0_1_219"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-3-image0_1_219"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/cbbe09ece27bf5f281c5.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/services" id="khadmat">
                          {'Services'}
                        </a>
                      </div>
                      <div className="mega-menu">
                        <ul className="categories">
                          <li data-target="sub1" className="active">
                            <span className="category-text">{'Provincial Managers'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub2">
                            <span className="category-text">{'Electronic Services'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub3">
                            <span className="category-text">{'Unit Job Descriptions'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub4">
                            <span className="category-text">{'Service Level Agreement'}</span>
                            <svg className="arrow10" viewBox="0 0 24 24">
                              <path d="M16 5l-8 7 8 7"></path>
                            </svg>
                          </li>
                          <li data-target="sub5">
                            <span className="category-text">{'About Mazandaran'}</span>
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
                                <div className="submenu-text">
                                  {'Deputy Governors of Mazandaran'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Headquarters Managers of Mazandaran Governorate'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'County Governors of Mazandaran'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{"Governor's Advisors"}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Heads of Departments & Executive Agencies '}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="sub2" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Electronic Services of Mazandaran Governorate '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Electronic Services'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Ministry of Interior Service Desk '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Links'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Government Services Management System '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Client Service Counter'}</div>
                              </div>
                            </div>
                          </div>
                          <div id="sub3" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Duties & Core Missions of Governorates '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Political, Security & Social Affairs Deputy'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Deputy for Economic Affairs'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Management & HR Development Deputy '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Deputy for Development Affairs'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {"Governor's Office, Public & International Relations: "}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Women & Family Affairs Office'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Performance Management, Inspection & Legal Affairs Office'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Protection '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Selection Unit'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Planning, Modernization & Administrative Reform Office '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Information Technology Management '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Cyberspace & Government Network Security'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Administrative & Financial Affairs'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Political Affairs & Elections'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Social & Cultural Affairs'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Security Affairs'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Passive Defense '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Foreign Nationals & Migrants Affairs Management'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Investment Attraction & Support Office '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Economic Affairs Coordination Office '}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Urban Affairs & Councils'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Rural Affairs & Councils'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'General Directorate of Crisis Management'}
                                </div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">
                                  {'Technical, Development, Transport & Traffic Affairs Office'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="sub4" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Government Network Support'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Tracking'}</div>
                              </div>
                            </div>
                          </div>
                          <div id="sub5" className="submenu">
                            <div className="submenu-grid">
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'General Information'}</div>
                              </div>
                              <div className="submenu-item">
                                <div className="gerd"></div>
                                <div className="submenu-text">{'Counties'}</div>
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
                        <a href="/install">{'Install App'}</a>
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
                          <rect width="18" height="18" fill="url(#s85f25f-4-pattern0_1_195)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-4-pattern0_1_195"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-4-image0_1_195"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-4-image0_1_195"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/01d3830564ad0aa38112.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/polls">{'Executive Bodies Survey'}</a>
                      </div>
                    </div>
                  </div>
                  <div className="logo-wrapper">
                    <img
                      src="/design/site/assets/image/logo.png"
                      alt="Logo"
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
                          <rect width="18" height="18" fill="url(#s85f25f-5-pattern0_1_223)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-5-pattern0_1_223"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-5-image0_1_223"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-5-image0_1_223"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/989bbb43ae0c7c4dbfea.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/governorate">{'Transparency System'}</a>
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
                          <rect width="18" height="18" fill="url(#s85f25f-6-pattern0_1_204)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-6-pattern0_1_204"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-6-image0_1_204"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-6-image0_1_204"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/0734cb762b5580fbb2f2.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/duties">{'Unit Job Descriptions'}</a>
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
                          <rect width="18" height="18" fill="url(#s85f25f-7-pattern0_1_200)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-7-pattern0_1_200"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-7-image0_1_200"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-7-image0_1_200"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/653b3c9da2eb5f0ffa21.png"
                            ></image>
                          </defs>
                        </svg>
                        <a href="/service-agreement">{' Service Level Agreement'}</a>
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
                          <rect width="18" height="18" fill="url(#s85f25f-8-pattern0_1_208)"></rect>
                          <defs>
                            <pattern
                              id="s85f25f-8-pattern0_1_208"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-8-image0_1_208"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-8-image0_1_208"
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
                        <a href="/assistant">{'Enterprise AI'}</a>
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
                        <g filter="url(#s85f25f-9-filter0_d_1_209)">
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
                            fill="url(#s85f25f-9-pattern0_1_209)"
                          ></rect>
                        </g>
                        <defs>
                          <filter
                            id="s85f25f-9-filter0_d_1_209"
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
                            id="s85f25f-9-pattern0_1_209"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="scale(0.00195312)"
                              xlinkHref="#s85f25f-9-image0_1_209"
                            ></use>
                          </pattern>
                          <image
                            id="s85f25f-9-image0_1_209"
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
                      {'Home'}
                    </a>
                  </div>
                  <div className="mobile-nav-item">
                    <a href="/governorate" className="mobile-nav-title">
                      {'Transparency System'}
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
                      <span>{'Headquarters Managers'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-managers">
                      <li>
                        <a href="/deputies">{'Deputy Governors of Mazandaran'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=1">
                          {'Headquarters Managers of Mazandaran Governorate'}
                        </a>
                      </li>
                      <li>
                        <a href="/managers?group=4">{'County Governors of Mazandaran'}</a>
                      </li>
                      <li>
                        <a href="/managers?group=6">{"Governor's Advisors"}</a>
                      </li>
                      <li>
                        <a href="/managers?group=3">
                          {'Heads of Departments & Executive Agencies'}
                        </a>
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
                      <span>{'About Mazandaran'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-mazandaran">
                      <li>
                        <a href="/about">{'General Information'}</a>
                      </li>
                      <li>
                        <a href="/counties">{'Counties'}</a>
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
                      <span>{'Services'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-services">
                      <li>
                        <a href="/services/provincial">
                          {'Electronic Services of Mazandaran Governorate'}
                        </a>
                      </li>
                      <li>
                        <a href="/links">{'Electronic Services Links'}</a>
                      </li>
                      <li>
                        <a href="/services">{'Ministry of Interior Service Desk'}</a>
                      </li>
                      <li>
                        <a href="/transparency">{'Government Services Management System'}</a>
                      </li>
                      <li>
                        <a href="/services">{'Client Service Counter'}</a>
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
                      <span>{'Service Level Agreement'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-sla">
                      <li>
                        <a href="/support">{'Government Network Support'}</a>
                      </li>
                      <li>
                        <a href="/track">{'Tracking'}</a>
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
                      <span>{'Unit Job Descriptions'}</span>
                      <span className="arrow-mobile-nav">{'⌄'}</span>
                    </div>
                    <ul className="mobile-submenu" id="mob-duties">
                      <li>
                        <a href="/deputies">{'Governor & Deputies'}</a>
                      </li>
                      <li>
                        <a href="/duties">{'Other Units'}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="header-paen">
                <div className="marquee">
                  <span>{'Resistance Economy Amid National Unity and Security'}</span>
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
                        <div className="akhbar-btn">{'News'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Second Meeting of Newly Admitted Trainees'}
                      </div>
                      <div className="akhbar-date">
                        {
                          "Second Orientation Meeting Held for Newly Admitted Trainees with the association's bodies, on Monday 1404/5/20 in the conference hall... "
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
                        <div className="akhbar-btn">{'Rulings'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Second Meeting of Newly Admitted Trainees'}
                      </div>
                      <div className="akhbar-date">
                        {
                          "Second Orientation Meeting Held for Newly Admitted Trainees with the association's bodies, on Monday 1404/5/20 in the conference hall... "
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
                        <div className="akhbar-btn">{'Notice'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Notice: Registration for the Official Judicial Experts Exam'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'Registration for the 1404 Official Judicial Expert Examination of the Supreme Council of Experts has begun.'
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
                        <div className="akhbar-btn">{'Rulings'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Second Meeting of Newly Admitted Trainees'}
                      </div>
                      <div className="akhbar-date">
                        {
                          "Second Orientation Meeting Held for Newly Admitted Trainees with the association's bodies, on Monday 1404/5/20 in the conference hall... "
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
                        <div className="akhbar-btn">{'Notice'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Notice: Registration for the Official Judicial Experts Exam'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'Registration for the 1404 Official Judicial Expert Examination of the Supreme Council of Experts has begun.'
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
                        <div className="akhbar-btn">{'Notice'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Notice: Registration for the Official Judicial Experts Exam'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'Registration for the 1404 Official Judicial Expert Examination of the Supreme Council of Experts has begun.'
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
                        <div className="akhbar-btn">{'Notice'}</div>
                        <div className="akhbar-date d-3d9df89ef84d77">{'12:12 | 1405/04/13'}</div>
                      </div>
                      <div className="akhbar-onvan">
                        {'Notice: Registration for the Official Judicial Experts Exam'}
                      </div>
                      <div className="akhbar-date">
                        {
                          'Registration for the 1404 Official Judicial Expert Examination of the Supreme Council of Experts has begun.'
                        }
                      </div>
                    </div>
                  </a>
                </div>
                <div className="tabs">
                  <div className="tab left-flat">{'All'}</div>
                  <div className="tab both-slanted">{'News'}</div>
                  <div className="tab both-slanted">{'Notice'}</div>
                  <div className="tab right-flat">{'Rulings'}</div>
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
                <span>{'Mehdi Younesi Rostami'}</span>
                <p>{'Governor of Mazandaran'}</p>
              </div>
              <div className="name-btn">{' Contact Governor '}</div>
              <div className="name-btn2">{' Previou Governors '}</div>
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
                  <h2 className="mz-portal-title">{'Latest Rulings & Announcements:'}</h2>
                  <p className="mz-portal-subtitle">
                    {"Read the organization's latest resolutions and announcements. "}
                  </p>
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
                            fill="url(#s85f25f-10-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s85f25f-10-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-10-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-10-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'Wednesday, 23 Ordibehesht 1404'}</span>
                        <p>{'Board of Directors Meeting Held.'}</p>
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
                            fill="url(#s85f25f-11-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s85f25f-11-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-11-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-11-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'Monday, 16 Ordibehesht 1404'}</span>
                        <p>{'Board of Directors Meeting Held.'}</p>
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
                            fill="url(#s85f25f-12-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s85f25f-12-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-12-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-12-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'Saturday, 14 Ordibehesht 1404'}</span>
                        <p>
                          {
                            'Registration for the 7th Term of Islamic City & Village Councils Begins 21 Dey 1404'
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
                            fill="url(#s85f25f-13-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s85f25f-13-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-13-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-13-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'Sunday, 1 Ordibehesht 1404'}</span>
                        <p>{'19th Term Board of Directors.'}</p>
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
                            fill="url(#s85f25f-14-pattern0_183_23)"
                          ></rect>
                          <defs>
                            <pattern
                              id="s85f25f-14-pattern0_183_23"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                transform="scale(0.00195312)"
                                xlinkHref="#s85f25f-14-image0_183_23"
                              ></use>
                            </pattern>
                            <image
                              id="s85f25f-14-image0_183_23"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="/design/shared/785d04f60761d8552b74.png"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="mz-news-date">{'Sunday, 1 Ordibehesht 1404'}</span>
                        <p>{'19th Term Board of Directors.'}</p>
                      </div>
                    </li>
                  </ul>
                  <a href="/news" className="mz-news-more">
                    {'View All ←'}
                  </a>
                </div>
                <div className="mz-portal-links">
                  <h2 className="mz-portal-title">{'Useful Links:'}</h2>
                  <p className="mz-portal-subtitle">
                    {"Browse the organization's useful links here."}
                  </p>
                  <div className="mz-links-grid">
                    <a className="mz-link-btn" href="/ideas">
                      {'Idea Submission Form'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'Waste Management Call'}
                    </a>
                    <a className="mz-link-btn" href="/tenders">
                      {'Government E-Procurement System'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'Call for Registration: Conscription Service Applicants'}
                    </a>
                    <a className="mz-link-btn" href="/faq">
                      {'Frequently Asked Questions'}
                    </a>
                    <a className="mz-link-btn" href="/polls">
                      {'Provincial Bodies Survey'}
                    </a>
                    <a className="mz-link-btn" href="/events">
                      {'Population Youth Award Event'}
                    </a>
                    <a className="mz-link-btn" href="/transparency">
                      {'Governorate Transparency System'}
                    </a>
                    <a className="mz-link-btn" href="/investments">
                      {'Investment Opportunities in Mazandaran Province'}
                    </a>
                    <a className="mz-link-btn" href="/events">
                      {'Weekly "Happy Coast" Programs of Mazandaran Province'}
                    </a>
                    <a className="mz-link-btn" href="/contracts">
                      {'National Contracts Information Base'}
                    </a>
                    <a className="mz-link-btn" href="/services">
                      {'Electronic Service Desk'}
                    </a>
                    <a className="mz-link-btn" href="/links">
                      {'Mazandaran Prayer Headquarters'}
                    </a>
                    <a className="mz-link-btn" href="/calls">
                      {'12th Comprehensive Joint Exam of Executive Bodies'}
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
                    <span>{'Headquarters Managers'}</span>
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
                    <span>{'Governors'}</span>
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
                    <span>{'County Governors'}</span>
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
                    <span>{'District Heads'}</span>
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
                    <span>{'Village Heads'}</span>
                  </button>
                </div>
                <div className="tab-content active" id="tab1">
                  <div className="manager-grid">
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Director General of Security Affairs, Mazandaran Governorate'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Deputy Governor'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Deputy for Management & Resource Development'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Director General of Social & Cultural Affairs'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{"Director General of the Governor's Office"}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Director General of Urban Affairs & Councils'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Director General of IT, Governorate'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="card1">
                      <div className="card1-bala">
                        <div className="cart1-img">
                          <img
                            src="https://ostan-mz.ir/OstanFiles/MunicipalityMember/MunicipalityMember65511049IMG_3561.JPG"
                            alt="Meysam Younesi"
                          />
                        </div>
                        <div className="cart1-onvan">
                          <h3>{'Meysam Younesi'}</h3>
                          <div className="badge">{'Director General'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>
                          {'Director General of Inspection, Performance Management & Legal Affairs'}
                        </p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'View More'}</h3>
                        <p>{'Full List of Headquarters Managers'}</p>
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
                          <h3>{'Seyed Mohammad Al-Hashem'}</h3>
                          <div className="badge">{'Governor'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Governor of Mazandaran'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'View More'}</h3>
                        <p>{'Full List of Governors'}</p>
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
                          <h3>{'County Governor of Sari'}</h3>
                          <div className="badge">{'County Governor'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Sari County Governorate'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
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
                          <h3>{'County Governor of Babol'}</h3>
                          <div className="badge">{'County Governor'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Babol County Governorate'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'View More'}</h3>
                        <p>{'Full List of County Governors'}</p>
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
                          <h3>{'Central District Head'}</h3>
                          <div className="badge">{'District Head'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Central District Office of the County'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'View More'}</h3>
                        <p>{'Full List of District Heads'}</p>
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
                          <h3>{'Model Village Head'}</h3>
                          <div className="badge">{'Village Head'}</div>
                        </div>
                      </div>
                      <div className="cart1-p-class">
                        <p>{'Model Village Council'}</p>
                      </div>
                      <div className="buttons">
                        <button className="btn-outline">{'Profile'}</button>
                        <button className="btn-solid">{'Contact'}</button>
                      </div>
                    </div>
                    <div className="more-card">
                      <div className="more-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>{'View More'}</h3>
                        <p>{'Full List of Village Heads'}</p>
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
                  <span>{'Governorate Public Relations'}</span>
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
                        <rect width="467" height="309" fill="url(#s85f25f-15-pattern0_19_3)"></rect>
                        <defs>
                          <pattern
                            id="s85f25f-15-pattern0_19_3"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000938086 0 0 0.00141776 0 -0.067102)"
                              xlinkHref="#s85f25f-15-image0_19_3"
                            ></use>
                          </pattern>
                          <image
                            id="s85f25f-15-image0_19_3"
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
                        {' Governor of Mazandaran Visits Golvard Dam Underpass Bridge '}
                      </li>
                      <li className="stdprx-item">
                        {
                          ' Dr. Younesi, Governor of Mazandaran, Visits Unfinished Projects in Nur & Mahmudabad '
                        }
                      </li>
                      <li className="stdprx-item">
                        {
                          ' Governor of Mazandaran Meets Party Representatives, Organizations and Politically Active Youth & Women '
                        }
                      </li>
                      <li className="stdprx-item">
                        {
                          ' Introduction Ceremony of the Governor of Mazandaran, with the Interior Minister and the Representative of the Supreme Leader '
                        }
                      </li>
                      <li className="stdprx-item">
                        {
                          ' Governor & Officials of Mazandaran Welcome ECO Secretary-General and Ambassadors at the Airport Dasht-e Naz '
                        }
                      </li>
                      <li className="stdprx-item">
                        {' Opening Ceremony: "Sari 2023, Tourism Capital of ECO Member States" '}
                      </li>
                    </ul>
                    <div className="stdprx-actions">
                      <button className="stdprx-btn live">{'Live'}</button>
                      <button className="stdprx-btn archive">{'Archive'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container-galery">
              <section className="gallery-section">
                <h2 className="gallery-title">{'Photo Gallery'}</h2>
                <div className="gallery-wrapper">
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'Executive Projects'}</span>
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
                          fill="url(#s85f25f-16-pattern0_213_175)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s85f25f-16-paint0_linear_213_175)"
                          fillOpacity="0.5"
                        ></rect>
                        <defs>
                          <pattern
                            id="s85f25f-16-pattern0_213_175"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000808913 0 0 0.00106838 -0.0177045 0)"
                              xlinkHref="#s85f25f-16-image0_213_175"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s85f25f-16-paint0_linear_213_175"
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
                            id="s85f25f-16-image0_213_175"
                            width="1280"
                            height="936"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/4ec4d1148623880686cb.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">{' Governor Visits Airport Renovation Operations '}</p>
                    </div>
                  </div>
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'Executive Projects'}</span>
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
                          fill="url(#s85f25f-17-pattern0_213_161)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s85f25f-17-paint0_linear_213_161)"
                          fillOpacity="0.2"
                        ></rect>
                        <defs>
                          <pattern
                            id="s85f25f-17-pattern0_213_161"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000823877 0 0 0.00108814 -0.0272812 0)"
                              xlinkHref="#s85f25f-17-image0_213_161"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s85f25f-17-paint0_linear_213_161"
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
                            id="s85f25f-17-image0_213_161"
                            width="1280"
                            height="919"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/cc9e5a22e70a607c7570.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">{' Governor Visits New Bridge Under Construction '}</p>
                    </div>
                  </div>
                  <div className="gallery-card1">
                    <div className="card1-header">
                      <span className="card1-title">{'Executive Projects'}</span>
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
                          fill="url(#s85f25f-18-pattern0_167_68)"
                        ></rect>
                        <rect
                          width="350"
                          height="265"
                          rx="8"
                          fill="url(#s85f25f-18-paint0_linear_167_68)"
                          fillOpacity="0.5"
                        ></rect>
                        <defs>
                          <pattern
                            id="s85f25f-18-pattern0_167_68"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              transform="matrix(0.000808913 0 0 0.00106838 -0.0177045 0)"
                              xlinkHref="#s85f25f-18-image0_167_68"
                            ></use>
                          </pattern>
                          <linearGradient
                            id="s85f25f-18-paint0_linear_167_68"
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
                            id="s85f25f-18-image0_167_68"
                            width="1280"
                            height="936"
                            preserveAspectRatio="none"
                            xlinkHref="/design/shared/29086cb1e1d6be9abdec.jpg"
                          ></image>
                        </defs>
                      </svg>
                      <p className="caption">
                        {' Inauguration of Development Project with Officials in Attendance '}
                      </p>
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
                    <g filter="url(#s85f25f-19-filter0_d_1_209)">
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
                        fill="url(#s85f25f-19-pattern0_1_209)"
                      ></rect>
                    </g>
                    <defs>
                      <filter
                        id="s85f25f-19-filter0_d_1_209"
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
                        id="s85f25f-19-pattern0_1_209"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          transform="scale(0.00195312)"
                          xlinkHref="#s85f25f-19-image0_1_209"
                        ></use>
                      </pattern>
                      <image
                        id="s85f25f-19-image0_1_209"
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
                      <h4 className="icx-footer-title">{'Site'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/links">
                            {'Our Clients'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/services">
                            {'Services'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/about">
                            {'About Us'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col">
                      <h4 className="icx-footer-title">{'Pages'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/services">
                            {'Services'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/links">
                            {'Our Clients'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/help">
                            {'Features'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col">
                      <h4 className="icx-footer-title">{'Services'}</h4>
                      <ul className="icx-footer-list">
                        <li>
                          <a className="icx-footer-link" href="/help">
                            {'Education'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/news">
                            {'Daily'}
                          </a>
                        </li>
                        <li>
                          <a className="icx-footer-link" href="/news">
                            {'Featured'}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="icx-footer-col icx-footer-contact">
                      <h4 className="icx-footer-title">{'Contact Information'}</h4>
                      <p className="icx-footer-text">
                        <i className="fa-solid fa-location-dot icx-footer-icon"></i>
                        {
                          ' Mazandaran - Sari - Sheikh Tabarsi St., opposite Mellat St., Tabarestan Building '
                        }
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
                <div className="d-812ca5ad2a1e69">{' Sadra Rayaneh Novin Tabarestan '}</div>
                {' Design & developed by '}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
