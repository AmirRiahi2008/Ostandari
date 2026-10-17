import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
export default function SiteNewsDetailsPart3() {
  return (
    <>
      <div className="main_wrap">
        <SiteHeader />
        <section className="containerrr socialhead py-lg-1 py-2">
          <div className="row mt-3 mb-4">
            <div className="col-lg-12 bg-light2 path radius15">
              <ul>
                <li>
                  <a href="/">{'صفحه اصلی'}</a>
                  <i className="fal fa-angle-left mr-3"></i>
                </li>
                <li>
                  <a href="/news">{'اخبار'}</a>
                  <i className="fal fa-angle-left mr-3"></i>
                </li>
                <li>
                  <a href="/news/design-1" className="active">
                    {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="container-fluid">
          <div className="containerrr">
            <div className="row">
              <div className="col-lg-8 text-justify mb-3">
                <div className="card p-4">
                  <div className="d-flex flex-lg-row flex-column justify-content-between mb-3">
                    <div className="d-flex flex-row mb-1">
                      <div className="Dottedstocol ml-3"></div>
                      <div className="singletitle">
                        <span>{'اخبار فرهنگی هنری'}</span>
                        <h1 className="text-right">
                          {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                        </h1>
                      </div>
                    </div>
                    <div className="textcontrols float-right text-right align-self-lg-center">
                      <span className="ml-2">{'سایز متن'}</span>
                      <i
                        className="fal fa-minus p-2 text-danger rounded bg-light"
                        id="decreasetext"
                      ></i>
                      <i
                        className="fal fa-plus p-2 text-success rounded bg-light"
                        id="increasetext"
                      ></i>
                    </div>
                  </div>
                  <div id="content">
                    <p>
                      {
                        ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد'
                      }
                    </p>
                    <p className="p-4 mr-lg-5 my-lg-5 my-3 bg-light p_relative radius20">
                      {
                        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی'
                      }
                      <i className="fa fa-quote-right"></i>
                    </p>
                    <p>
                      {
                        ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. '
                      }
                    </p>
                    <p>
                      {
                        ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. '
                      }
                    </p>
                  </div>
                  <div className="MAtag d-flex flex-row align-items-center py-3 brtop mt-4">
                    <span className="w-70">{'برچسب ها :'}</span>
                    <ul>
                      <li>
                        <a href="/help">{'طراحی حرفه ای'}</a>
                      </li>
                      <li>
                        <a href="/help">{'کاملا واکنش گرا'}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3 singlleftcol">
                <div className="card p-3">
                  <img
                    src="/design/site/assets/Img/N3.jpg"
                    className="img-fluid radius10 inews"
                    alt=""
                  />
                  <div className="p_relative">
                    <div className="postvoted text-center">
                      <span className="bg-light votedv mt-3 py-1 px-3 radius25">
                        <i className="fa fa-star text-warning"></i>
                        <span className="vote px-1">{'2.5'}</span>
                        <span className="pl-1">{'از'}</span>
                        <span className="vote">{'4.5'}</span>
                        <span className="pr-1">{'امتیاز'}</span>
                      </span>
                    </div>
                    <ul>
                      <li>
                        <button type="button" data-command="sharePage">
                          <i className="fal fa-share-alt fa-2x ml-2"></i>
                          {'اشتراک با دیگران'}
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex flex-column newsinfo px-2 mb-3">
                    <div className="d-flex flex-row">
                      <span>{'کد خبر :'}</span>
                      <hr className="v-divider" />
                      <span>{'2654'}</span>
                    </div>
                    <div className="d-flex flex-row">
                      <span>{'تاریخ انتشار :'}</span>
                      <hr className="v-divider" />
                      <span>{' شهریور 1401 - 11:00'}</span>
                    </div>
                    <div className="d-flex flex-row">
                      <span>{'تعداد دیدگاه :'}</span>
                      <hr className="v-divider" />
                      <span>{'26'}</span>
                    </div>
                    <div className="d-flex flex-row">
                      <span>{'زمان تقریبی مطالعه :'}</span>
                      <hr className="v-divider" />
                      <span>{'36 ثانیه'}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column catinews px-2 my-3">
                    <div className="d-flex flex-row">
                      <span>{'دسته اخبار :'}</span>
                      <a
                        href="/news?category=%D9%81%D8%B1%D9%87%D9%86%DA%AF%DB%8C"
                        className="btn btn-outline-dark mx-2 radius15"
                      >
                        {'فرهنگی'}
                      </a>
                      <a
                        href="/news?category=%D9%87%D9%86%D8%B1%DB%8C"
                        className="btn btn-outline-dark radius15"
                      >
                        {'هنری'}
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-column my-4 links">
                    <div className="d-flex flex-row">
                      <button
                        type="button"
                        data-command="copyLink"
                        className="btn btn-info ml-2 radius10 py-2 flex-fill"
                      >
                        <i className="fal fa-copy ml-2"></i>
                        {'کپی لینک کوتاه'}
                      </button>
                      <button
                        type="button"
                        data-command="printSection"
                        className="btn btn-info py-2 radius10 flex-fill"
                      >
                        <i className="fal fa-print ml-2"></i>
                        {'پرینت خبر'}
                      </button>
                    </div>
                  </div>
                  <div className="report">
                    <div className="d-flex flex-row mb-3">
                      <h2 className="byadtitle m-2">{'سایر مطالب'}</h2>
                      <hr className="linetitle" />
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-md-6 mb-3">
                        <a href="/news/design-1" className="row">
                          <div className="col-5 p-0">
                            <img
                              src="/design/site/assets/Img/N1.jpeg"
                              className="img-fluid radius10"
                              alt=""
                            />
                          </div>
                          <div className="col-7">
                            <h2>
                              {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                            </h2>
                          </div>
                        </a>
                      </div>
                      <div className="col-xl-12 col-md-6 mb-3">
                        <a href="/news/design-1" className="row">
                          <div className="col-5 p-0">
                            <img
                              src="/design/site/assets/Img/N2.jpg"
                              className="img-fluid radius10"
                              alt=""
                            />
                          </div>
                          <div className="col-7">
                            <h2>
                              {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                            </h2>
                          </div>
                        </a>
                      </div>
                      <div className="col-xl-12 col-md-6 mb-3">
                        <a href="/news/design-1" className="row">
                          <div className="col-5 p-0">
                            <img
                              src="/design/site/assets/Img/N3.jpg"
                              className="img-fluid radius10"
                              alt=""
                            />
                          </div>
                          <div className="col-7">
                            <h2>
                              {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                            </h2>
                          </div>
                        </a>
                      </div>
                      <div className="col-xl-12 col-md-6 mb-3">
                        <a href="/news/design-1" className="row">
                          <div className="col-5 p-0">
                            <img
                              src="/design/site/assets/Img/N4.jpg"
                              className="img-fluid radius10"
                              alt=""
                            />
                          </div>
                          <div className="col-7">
                            <h2>
                              {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                            </h2>
                          </div>
                        </a>
                      </div>
                      <div className="col-xl-12 col-md-6 mb-3">
                        <a href="/news/design-1" className="row">
                          <div className="col-5 p-0">
                            <img
                              src="/design/site/assets/Img/N2.jpg"
                              className="img-fluid radius10"
                              alt=""
                            />
                          </div>
                          <div className="col-7">
                            <h2>
                              {'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}
                            </h2>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="containerrr radius20 bk-event py-4 mt-4">
          <div className="containerrr p_relative eventdv">
            <div className="Dottedsquare"></div>
            <div className="d-flex flex-row justify-content-between boxhead">
              <div className="boxtitle align-self-center">
                <h1 className="IRANSans_Bold text-white">{'رویدادها'}</h1>
                <p>{'جدیدترین اخبار و رویدادهای دنیای اقتصاد'}</p>
              </div>
              <div className="align-self-center">
                <a href="/news" className="btn-more btn bg-white py-2 px-sm-4 radius25">
                  {'مشاهده همه'}
                </a>
              </div>
            </div>
            <div className="owl-carousel text-center owl-event1 mt-2">
              <a href="/news" className="item card">
                <div className="thumbnail">
                  <img
                    src="/design/site/assets/Img/N1.jpeg"
                    alt="PORTFOLIO NAME"
                    className="img-fluid"
                  />
                  <span className="tag">{'ویدئو'}</span>
                  <div className="overlay">
                    <div className="text">
                      <i className="fal fa-eye bg-dark p-3"></i>
                    </div>
                  </div>
                </div>
                <div className="e1-details">
                  <h1>{'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}</h1>
                  <p>
                    {
                      ' به گزارش روابط عمومی پژوهشگاه ارتباطات و فناوری اطلاعات؛ دومین جلسه شورای هماهنگی روابط عمومی‌های سازمان‌ها و شرکت‌های تابعه وزارت ارتباطات ..'
                    }
                  </p>
                  <span className="dott"></span>
                  <div className="d-flex flex-row justify-content-between px-3">
                    <span className="date">{'1400/11/04'}</span>
                    <div className="morelnk">
                      <span>
                        {'مشاهده'}
                        <i className="fal fa-long-arrow-left mr-2"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/news" className="item card">
                <div className="thumbnail">
                  <img
                    src="/design/site/assets/Img/N2.jpg"
                    alt="PORTFOLIO NAME"
                    className="img-fluid"
                  />
                  <div className="overlay">
                    <div className="text">
                      <i className="fal fa-eye bg-dark p-3"></i>
                    </div>
                  </div>
                </div>
                <div className="e1-details">
                  <h1>{'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}</h1>
                  <p>
                    {
                      ' به گزارش روابط عمومی پژوهشگاه ارتباطات و فناوری اطلاعات؛ دومین جلسه شورای هماهنگی روابط عمومی‌های سازمان‌ها و شرکت‌های تابعه وزارت ارتباطات ..'
                    }
                  </p>
                  <span className="dott"></span>
                  <div className="d-flex flex-row justify-content-between px-3">
                    <span className="date">{'1400/11/04'}</span>
                    <div className="morelnk">
                      <span>
                        {'مشاهده'}
                        <i className="fal fa-long-arrow-left mr-2"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/news" className="item card">
                <div className="thumbnail">
                  <img
                    src="/design/site/assets/Img/N3.jpg"
                    alt="PORTFOLIO NAME"
                    className="img-fluid"
                  />
                  <span className="tag">{'ویدئو'}</span>
                  <div className="overlay">
                    <div className="text">
                      <i className="fal fa-eye bg-dark p-3"></i>
                    </div>
                  </div>
                </div>
                <div className="e1-details">
                  <h1>{'دومین جلسه هم‌افزایی شورای هماهنگی روابط عمومی‌های وزارت ارتباطات'}</h1>
                  <p>
                    {
                      ' به گزارش روابط عمومی پژوهشگاه ارتباطات و فناوری اطلاعات؛ دومین جلسه شورای هماهنگی روابط عمومی‌های سازمان‌ها و شرکت‌های تابعه وزارت ارتباطات ..'
                    }
                  </p>
                  <span className="dott"></span>
                  <div className="d-flex flex-row justify-content-between px-3">
                    <span className="date">{'1400/11/04'}</span>
                    <div className="morelnk">
                      <span>
                        {'مشاهده'}
                        <i className="fal fa-long-arrow-left mr-2"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
