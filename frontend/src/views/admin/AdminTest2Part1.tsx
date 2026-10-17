export default function AdminTest2Part1() {
  return (
    <>
      <div className="job-modal-overlay">
        <div className="job-modal">
          <div className="job-modal-header">
            <h3>{'سمت‌های شغلی'}</h3>
            <span className="job-modal-close-icon">{'✕'}</span>
          </div>
          <div className="job-modal-body">
            <div className="job-modal-item">
              <div className="job-modal-title">
                <span className="d-f523e14dcd0eda">{'سمت شغلی:'}</span>
                {' مدیر ارشد محصول'}
              </div>
              <div className="job-modal-company">{'نام سازمان / شرکت: دیجی کالا'}</div>
              <div className="job-modal-date">{'۱۴۰۲ - اکنون'}</div>
            </div>
            <div className="job-modal-item">
              <div className="job-modal-title">{'مدیر محصول'}</div>
              <div className="job-modal-company">{'اسنپ'}</div>
              <div className="job-modal-date">{'۱۴۰۰ - ۱۴۰۲'}</div>
            </div>
            <div className="job-modal-item">
              <div className="job-modal-title">{'تحلیلگر کسب‌وکار'}</div>
              <div className="job-modal-company">{'همراه اول'}</div>
              <div className="job-modal-date">{'۱۳۹۸ - ۱۴۰۰'}</div>
            </div>
            <div className="job-modal-item">
              <div className="job-modal-title">{'توسعه‌دهنده فرانت‌اند'}</div>
              <div className="job-modal-company">{'ذوب آهن'}</div>
              <div className="job-modal-date">{'۱۳۹۷ - ۱۳۹۸'}</div>
            </div>
          </div>
          <div className="job-modal-footer">
            <button className="job-modal-close-btn">{'بستن'}</button>
          </div>
        </div>
      </div>
    </>
  );
}
