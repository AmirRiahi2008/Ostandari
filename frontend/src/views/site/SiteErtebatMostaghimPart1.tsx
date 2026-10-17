import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
export default function SiteErtebatMostaghimPart1() {
  return (
    <>
      <div className="container-asli">
        <SiteHeader />
        <div className="fb-wrap">
          <div className="fb-card">
            <div className="fb-form-col">
              <div className="fb-head">
                <span className="fb-eyebrow">{'ارتباط مستقیم با استاندار'}</span>
                <h1>{'پیشنهادها و انتقادهای خود را با استاندار مازندران در میان بگذارید'}</h1>
                <p>{'نظرات شما مستقیماً بررسی می‌شود و به بهبود خدمات استانداری کمک می‌کند'}</p>
              </div>
              <form className="fb-form" id="fbForm" action="#" data-form="true">
                <div className="fb-row">
                  <div className="fb-field">
                    <label htmlFor="fbName">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      {' نام و نام خانوادگی '}
                    </label>
                    <input type="text" id="fbName" placeholder="مثلاً: علی محمدی" />
                  </div>
                  <div className="fb-field">
                    <label htmlFor="fbPhone">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {' شماره تلفن '}
                    </label>
                    <input type="tel" id="fbPhone" placeholder="09xxxxxxxxx" />
                  </div>
                </div>
                <div className="fb-field">
                  <label htmlFor="fbEmail">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                      <path d="m22 6-10 7L2 6"></path>
                    </svg>
                    {' ایمیل '}
                  </label>
                  <input type="email" id="fbEmail" placeholder="example@email.com" />
                </div>
                <div className="fb-field">
                  <label htmlFor="fbMsg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {' دیدگاه شما '}
                  </label>
                  <textarea
                    id="fbMsg"
                    rows={6}
                    placeholder="پیشنهاد یا انتقاد خود را به‌طور کامل شرح دهید..."
                  ></textarea>
                  <span className="fb-counter">
                    <span id="fbCount">{'0'}</span>
                    {' / 600'}
                  </span>
                </div>
                <div className="fb-captcha">
                  <div className="fb-captcha-top">
                    <div className="fb-captcha-img">
                      <svg viewBox="0 0 160 56">
                        <rect width="160" height="56" rx="10" fill="#eef2f6"></rect>
                        <text
                          x="50%"
                          y="58%"
                          textAnchor="middle"
                          fontFamily="Georgia, serif"
                          fontSize="26"
                          fontStyle="italic"
                          fontWeight="700"
                          fill="#00477A"
                          letterSpacing="6"
                          transform="rotate(-3 80 28)"
                        >
                          {'7K3F'}
                        </text>
                      </svg>
                    </div>
                    <button type="button" className="fb-captcha-refresh" title="تغییر کد">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 4v6h-6"></path>
                        <path d="M1 20v-6h6"></path>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="fb-captcha-input"
                    placeholder="متن بالا را وارد کنید"
                  />
                </div>
                <button type="submit" className="fb-submit">
                  <span>{'ارسال دیدگاه'}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="d-87dec954737471"
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                </button>
              </form>
            </div>
            <aside className="fb-profile-col">
              <div className="fb-profile-card">
                <div className="fb-profile-photo">
                  <img
                    src="/design/site/assets/image/ProfImage80906772photo15252682277.jpg"
                    alt="مهدی یونسی رستمی"
                    data-hide-on-error="true"
                  />
                </div>
                <h3>{'مهدی یونسی رستمی'}</h3>
                <span className="fb-profile-role">{'استاندار مازندران'}</span>
                <div className="fb-profile-divider"></div>
                <div className="fb-profile-contacts">
                  <a
                    href="/contact"
                    className="fb-contact-btn"
                    data-tip="آدرس"
                    aria-label="مشاهده صفحه"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </a>
                  <a
                    href="/contact"
                    className="fb-contact-btn"
                    data-tip="تماس"
                    aria-label="مشاهده صفحه"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </a>
                  <a
                    href="/contact"
                    className="fb-contact-btn"
                    data-tip="ایمیل"
                    aria-label="مشاهده صفحه"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                      <path d="m22 6-10 7L2 6"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="fb-note">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <p>{'پاسخ به دیدگاه شما پس از بررسی، از طریق ایمیل یا پیامک اعلام می‌شود.'}</p>
              </div>
            </aside>
          </div>
        </div>
        <section>
          <SiteFooter />
        </section>
      </div>
    </>
  );
}
