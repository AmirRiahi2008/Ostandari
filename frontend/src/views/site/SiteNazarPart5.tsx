export default function SiteNazarPart5() {
  return (
    <>
      <div className="table-wrapper">
        <div className="table-title">{'لیست خدمات قابل ارائه'}</div>
        <table>
          <thead>
            <tr>
              <th>{'ردیف'}</th>
              <th>{'عنوان خدمت'}</th>
              <th>{'زیرخدمت'}</th>
              <th>{'نحوه ارائه'}</th>
              <th>{'اطلاعات تکمیلی'}</th>
              <th>{'SLA'}</th>
              <th>{'نظرسنجی'}</th>
              <th>{'تماس'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'۱'}</td>
              <td className="service-title">{'ارائه خدمات به اتباع و مهاجرین'}</td>
              <td>{'پذیرش، یکپارچه و اخراج اتباع خارجی غیرمجاز و متخلف'}</td>
              <td>
                <span className="badge">{'غیرحضوری'}</span>
              </td>
              <td className="muted">{'—'}</td>
              <td className="muted">{'—'}</td>
              <td>
                <a href="/login" className="survey-link">
                  {'ورود به نظرسنجی'}
                </a>
              </td>
              <td className="contact">
                {' دفتر برنامه‌ریزی'}
                <br />
                {' بودجه و تحول اداری'}
                <br />
                {' (۰۱۱-۳۳۴۴۵۰) '}
              </td>
            </tr>
            <tr>
              <td>{'۲'}</td>
              <td className="service-title">{'ارائه خدمات به اتباع و مهاجرین'}</td>
              <td>
                {'صدور پروانه و نظارت بر عملکرد تشکل‌های مشمول قانون فعالیت احزاب و انجمن‌ها'}
              </td>
              <td>
                <span className="badge">{'غیرحضوری'}</span>
              </td>
              <td className="muted">{'—'}</td>
              <td className="muted">{'—'}</td>
              <td>
                <a href="/login" className="survey-link">
                  {'ورود به نظرسنجی'}
                </a>
              </td>
              <td className="contact">
                {' دفتر برنامه‌ریزی'}
                <br />
                {' بودجه و تحول اداری'}
                <br />
                {' (۰۱۱-۳۳۴۴۵۰) '}
              </td>
            </tr>
            <tr>
              <td>{'۳'}</td>
              <td className="service-title">{'ارائه خدمات به اتباع و مهاجرین'}</td>
              <td>{'صدور و تجدید کارت شناسایی پناهندگان'}</td>
              <td>
                <span className="badge">{'غیرحضوری'}</span>
              </td>
              <td className="muted">{'—'}</td>
              <td className="muted">{'—'}</td>
              <td>
                <a href="/login" className="survey-link">
                  {'ورود به نظرسنجی'}
                </a>
              </td>
              <td className="contact">
                {' دفتر برنامه‌ریزی'}
                <br />
                {' بودجه و تحول اداری'}
                <br />
                {' (۰۱۱-۳۳۴۴۵۰) '}
              </td>
            </tr>
            <tr>
              <td>{'۴'}</td>
              <td className="service-title">{'ارائه خدمات به اتباع و مهاجرین'}</td>
              <td>
                {
                  'صدور پروانه تأسیس و فعالیت سازمان‌های مردم‌نهاد و نظارت بر عملکرد و مجامع عمومی آنها'
                }
              </td>
              <td>
                <span className="badge">{'غیرحضوری'}</span>
              </td>
              <td className="muted">{'—'}</td>
              <td className="muted">{'—'}</td>
              <td>
                <a href="/login" className="survey-link">
                  {'ورود به نظرسنجی'}
                </a>
              </td>
              <td className="contact">
                {' دفتر برنامه‌ریزی'}
                <br />
                {' بودجه و تحول اداری'}
                <br />
                {' (۰۱۱-۳۳۴۴۵۰) '}
              </td>
            </tr>
            <tr>
              <td>{'۵'}</td>
              <td className="service-title">{'ارائه خدمات پاسخگویی به شکایات'}</td>
              <td>{'رسیدگی به تخلفات اداری و شکایات مردمی'}</td>
              <td>
                <span className="badge">{'غیرحضوری'}</span>
              </td>
              <td className="muted">{'—'}</td>
              <td className="muted">{'—'}</td>
              <td>
                <a href="/login" className="survey-link">
                  {'ورود به نظرسنجی'}
                </a>
              </td>
              <td className="contact">
                {' دفتر برنامه‌ریزی'}
                <br />
                {' بودجه و تحول اداری'}
                <br />
                {' (۰۱۱-۳۳۴۴۵۰) '}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
