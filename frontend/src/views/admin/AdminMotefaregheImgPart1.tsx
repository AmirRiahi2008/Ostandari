import AdminHeadera6040 from '@/components/template/parts/AdminHeadera6040';
import AdminRail23aa7 from '@/components/template/parts/AdminRail23aa7';
import AdminNavigation2d320 from '@/components/template/parts/AdminNavigation2d320';
export default function AdminMotefaregheImgPart1() {
  return (
    <>
      <div className="all-website">
        <AdminHeadera6040 />
        <div className="sadyar-content">
          <AdminRail23aa7 />
          <AdminNavigation2d320 />
          <div className="main-content">
            <div className="main-content-header">
              <div className="main-content-header-inside">
                <h2>{'عکس های متفرقه'}</h2>
              </div>
            </div>
            <div className="main-content-content">
              <section>
                <header className="cbn-header-flex">
                  <h6>{'ایجاد عکس متفرقه جدید '}</h6>
                  <button
                    type="button"
                    className="cbn-plus-btn"
                    id="cbnOpenCreateMenuModalBtn"
                    title="ایجاد منو جدید"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      ></path>
                    </svg>
                  </button>
                </header>
                <div className="main-content-section-bottom">
                  <div className="education-table-wrapper">
                    <table className="education-table" id="educationTable">
                      <thead>
                        <tr>
                          <th>{'ردیف'}</th>
                          <th>{'عکس'}</th>
                          <th>{'آدرس اینترنتی'}</th>
                          <th>{'عملیات'}</th>
                        </tr>
                      </thead>
                      <tbody id="educationTableBody">
                        <tr>
                          <td>{'1'}</td>
                          <td className="td-img d-7fade915eee9b2">
                            <img
                              src="/design/admin/assets/image/LinkImage76311287sd.jpg"
                              alt=""
                              className="d-a08a6dd5211785"
                            />
                          </td>
                          <td>{'https://ostan-mz.ir/Home/ShowImage/2134'}</td>
                          <td>
                            <div className="cbn-actions-wrapper">
                              <button
                                type="button"
                                className="cbn-actions-trigger"
                                aria-label="عملیات"
                                data-command="cbnToggleActionsMenu"
                                data-command-args="this"
                                data-command-event="click"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  fill="currentColor"
                                  className="bi bi-three-dots"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"></path>
                                </svg>
                              </button>
                              <div className="cbn-actions-menu">
                                <div
                                  className="cbn-actions-item"
                                  data-command="editRecord"
                                  data-command-args=""
                                  data-command-event="click"
                                  role="button"
                                  tabIndex={0}
                                  aria-label="باز کردن بخش"
                                >
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M17 3l4 4L7 21H3v-4L17 3z"></path>
                                    <path d="M15 5l4 4"></path>
                                  </svg>
                                  {' ویرایش '}
                                </div>
                                <div
                                  className="cbn-actions-item cbn-actions-item-danger"
                                  data-command="deleteRecord"
                                  role="button"
                                  tabIndex={0}
                                  aria-label="باز کردن بخش"
                                >
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                  </svg>
                                  {' حذف '}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="cbn-modal-overlay" id="cbnCreateMenuModalOverlay">
                  <div className="cbn-modal d-f57ee60688d305">
                    <div className="cbn-modal-header">
                      <h3>{'ایجاد عکس متفرقه جدید'}</h3>
                      <div className="cbn-modal-close" id="cbnCloseCreateMenuModalBtn">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                    <div className="cbn-modal-body">
                      <form
                        className="cbn-flex-form"
                        id="cbnSlideShowForm"
                        action="#"
                        data-form="true"
                      >
                        <div className="cbn-flex-field">
                          <label>{'آدرس اینترنتی:'}</label>
                          <input
                            type="text"
                            id="cbnSlidePriority"
                            data-field="address"
                            name="address"
                          />
                        </div>
                        <div className="cbn-flex-field">
                          <label>{'آپلود تصویر:'}</label>
                          <label className="cbn-upload-box" htmlFor="cbnSlideMainImage">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M.002 3a2 2 0 0 1 2-2h11.996a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2.002a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h11.996a1 1 0 0 0 1-1v-2.5l-3.777-3.777a.5.5 0 0 0-.68-.032L8.5 10.5l-2.746-2.746a.5.5 0 0 0-.708 0L1.002 11.708V12z"></path>
                            </svg>
                            {' انتخاب تصویر '}
                          </label>
                          <input
                            type="file"
                            id="cbnSlideMainImage"
                            accept="image/*"
                            className="d-d0466aa33fa806"
                            data-field="file"
                            name="file"
                          />
                          <div className="cbn-upload-hint">{'سایز پیشنهادی: 400*982'}</div>
                          <img
                            className="cbn-upload-preview"
                            id="cbnSlideMainImagePreview"
                            alt="پیش‌نمایش تصویر"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="cbn-modal-footer">
                      <button
                        type="button"
                        className="button-designv2"
                        id="cbnCancelCreateMenuBtn"
                        data-command="closeModal"
                      >
                        {'انصراف'}
                      </button>
                      <button
                        className="button-designv1"
                        id="cbnSubmitCreateMenuBtn"
                        data-command="saveRecord"
                      >
                        {'ایجاد'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="top-modal-overlay" id="editCommitmentModal">
                  <div className="top-modal-container">
                    <div className="top-modal-header">
                      <h3>{'ویرایش استان ها '}</h3>
                      <div
                        className="top-modal-close"
                        data-command="closeEditCommitmentModal"
                        data-command-args=""
                        data-command-event="click"
                        role="button"
                        tabIndex={0}
                        aria-label="باز کردن بخش"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                    <div className="top-modal-body">
                      <form action="#" data-form="true">
                        <div className="upload-item">
                          <label>{'کد استان:'}</label>
                          <input
                            type="text"
                            id="commitmentTitle"
                            placeholder="عنوان را تایپ کنید"
                          />
                        </div>
                        <div className="upload-item">
                          <label>{'نام استان:'}</label>
                          <input
                            type="text"
                            id="commitmentTitle"
                            placeholder="عنوان را تایپ کنید"
                          />
                        </div>
                        <div className="upload-item">
                          <div className="engineer-input-field d-48ab9a3869e4b3">
                            <label>{'نام کشور:'}</label>
                            <select
                              className="search-field-select-country select2-hidden-accessible"
                              data-select2-id="1"
                              tabIndex={-1}
                              aria-hidden="true"
                            >
                              <option value="2" data-select2-id="3">
                                {'ایران'}
                              </option>
                              <option value="3">{'افغانستان'}</option>
                              <option value="4">{'ترکیه'}</option>
                              <option value="5">{'امارات'}</option>
                            </select>
                            <span
                              className="select2 select2-container select2-container--default d-2240af66b3dc9a"
                              dir="ltr"
                              data-select2-id="2"
                            >
                              <span className="selection">
                                <span
                                  className="select2-selection select2-selection--single"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabIndex={0}
                                  aria-disabled="false"
                                  aria-labelledby="select2-q4ra-container"
                                >
                                  <span
                                    className="select2-selection__rendered"
                                    id="select2-q4ra-container"
                                    role="textbox"
                                    aria-readonly="true"
                                    title="ایران"
                                  >
                                    {'ایران'}
                                  </span>
                                  <span className="select2-selection__arrow" role="presentation">
                                    <b role="presentation"></b>
                                  </span>
                                </span>
                              </span>
                              <span className="dropdown-wrapper" aria-hidden="true"></span>
                            </span>
                          </div>
                        </div>
                        <div className="upload-item">
                          <label>{'کد استان در نظام مهندسی:'}</label>
                          <input
                            type="text"
                            id="commitmentTitle"
                            placeholder="عنوان را تایپ کنید"
                          />
                        </div>
                        <div className="upload-item">
                          <label>{'ترتیب نمایش:'}</label>
                          <input
                            type="text"
                            id="commitmentTitle"
                            placeholder="عنوان را تایپ کنید"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="top-modal-footer">
                      <button
                        className="button-designv2"
                        data-command="closeEditCommitmentModal"
                        data-command-args=""
                        data-command-event="click"
                      >
                        {'برگشت'}
                      </button>
                      <button className="button-designv1">{'ذخیره'}</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="search-dark-overlay" id="sharedOverlay">
              <div className="popup-content-wrapper" id="popupBody"></div>
            </div>
            <div className="popup-1-content d-6e22c58a7a6a60" id="popup1Content">
              <div className="search-middle">
                <div className="search-middle-top">
                  <input type="text" placeholder="جستجو . . ." />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="11.558"
                      cy="11.0585"
                      r="7.06194"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>
                    <path
                      d="M20.5024 20.0034L16.5508 16.0518"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="search-middle-bottom">
                  <div className="search-middle-bottom-child">
                    <div className="bigitem-menu-bottom-item-notif">
                      <img alt="" />
                    </div>
                    <div className="makecenter notif-bottom-text">
                      {'نام منبع مورد نظر را وارد کنید'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-dark-overlay" id="sharedOverlay">
            <div className="popup-content-wrapper" id="popupBody"></div>
          </div>
          <div className="popup-1-content d-6e22c58a7a6a60" id="popup1Content">
            <div className="search-middle">
              <div className="search-middle-top">
                <input type="text" placeholder="جستجو . . ." />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11.558"
                    cy="11.0585"
                    r="7.06194"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></circle>
                  <path
                    d="M20.5024 20.0034L16.5508 16.0518"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="search-middle-bottom">
                <div className="search-middle-bottom-child">
                  <div className="bigitem-menu-bottom-item-notif">
                    <img alt="" />
                  </div>
                  <div className="makecenter notif-bottom-text">
                    {'نام منبع مورد نظر را وارد کنید'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="popup-2-content d-6e22c58a7a6a60" id="popup2Content">
            <div className="second-popup mail-new-width">
              <div className="second-popup-1">
                <button className="close-popup-btn">{'✕'}</button>
                <span className="makecenter">{' ایجاد مخاطب'}</span>
                <div className="d-d8c94c16288bd4"></div>
              </div>
              <form action="#" data-form="true">
                <div className="second-popup-2">
                  <div className="main-middle-extra no-margin-top">
                    <div className="main-middle-extra-file">
                      <div className="main-kartabl-top-row-row">
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' نام'}</div>
                          </div>
                        </div>
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' First Name'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="main-kartabl-top-row-row">
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{'نام خانوادگی '}</div>
                          </div>
                        </div>
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' last name'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="main-kartabl-top-row-row">
                        <div className="main-kartabl-top-item item-with-description-under">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' سمت/عنوان شغلی'}</div>
                          </div>
                        </div>
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' Job Title'}</div>
                          </div>
                        </div>
                      </div>
                      <span className="item-with-description-under-text">
                        <svg
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="bi bi-exclamation-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                        </svg>
                        {' عنوان شغلی مخاطب شما. مانند: مدیر آموزش '}
                      </span>
                      <div className="main-kartabl-top-row-row">
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{' نام سازمان/نام تجاری'}</div>
                          </div>
                        </div>
                        <div className="main-kartabl-top-item">
                          <div className="new-middle-item">
                            <input type="text" required={true} />
                            <div className="input-label-text">{'Company Name'}</div>
                          </div>
                        </div>
                      </div>
                      <span className="item-with-description-under-text">
                        <svg
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="bi bi-exclamation-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                        </svg>
                        {' نام سازمان مخاطب شما. مانند: موسسه آموزشی مسیر ایده‌آل '}
                      </span>
                    </div>
                    <div className="main-middle-extra-toptext">
                      <div>{' اطلاعات اصلی '}</div>
                      <span>
                        <svg
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="bi bi-exclamation-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"></path>
                        </svg>
                        {' برای ثبت مخاطب حداقل یکی از فیلدهای این بخش را وارد کنید. '}
                      </span>
                    </div>
                  </div>
                  <div className="main-middle-extra no-margin-top">
                    <div className="main-middle-extra-file">
                      <div className="new-middle-item">
                        <div className="new-middle-item top-text-select left-padding-input select-chev">
                          <select>
                            <option>{'آقای'}</option>
                            <option>{'خانم'}</option>
                            <option>{'جناب آقای'}</option>
                            <option>{'سرکار خانم'}</option>
                            <option>{'دکتر'}</option>
                            <option>{'مهندس'}</option>
                            <option>{'آقای دکتر'}</option>
                            <option>{'جناب آقای دکتر'}</option>
                            <option>{'خانم دکتر'}</option>
                            <option>{'سرکار خانم دکتر'}</option>
                            <option>{'آقای مهندس'}</option>
                            <option>{'جناب آقای مهندس'}</option>
                            <option>{'خانم مهندس'}</option>
                            <option>{'سرکار خانم مهندس'}</option>
                          </select>
                          <div className="input-label-text">{'لقب'}</div>
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="new-middle-item">
                        <div className="new-middle-item top-text-select left-padding-input select-chev">
                          <select>
                            <option>{'گروه پیش فرض'}</option>
                          </select>
                          <div className="input-label-text">{' گروه مخاطب'}</div>
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="main-middle-extra-toptext">
                      <div>{' اطلاعات تکمیلی '}</div>
                    </div>
                  </div>
                </div>
                <div className="second-popup-3">
                  <button className="create-new-project-button" type="submit">
                    <span>{'ایجاد پروژه'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
