export default function SiteNazarPart3() {
  return (
    <>
      <div className="mzsvx-card">
        <div className="mzsvx-title">
          {' کاربر گرامی، به میز خدمت استانداری مازندران خوش آمدید: '}
        </div>
        <div className="mzsvx-subtitle">
          {' می‌توانید از طریق گزینه‌های زیر درخواست خود را ثبت و پیگیری نمایید '}
        </div>
        <div className="mzsvx-actions">
          <a href="/login" className="mzsvx-btn mzsvx-btn-primary">
            {' ورود به میز خدمت الکترونیک '}
          </a>
          <a href="/track" className="mzsvx-btn mzsvx-btn-outline">
            {' پیگیری با کد رهگیری '}
          </a>
          <a href="/services" className="mzsvx-btn mzsvx-btn-outline">
            {' فرم‌های درخواست خدمت '}
          </a>
        </div>
      </div>
    </>
  );
}
