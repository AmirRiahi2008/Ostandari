export default function SiteSharhvazayefPart3() {
  return (
    <>
      <div className="container mt-4">
        <div className="accordion" id="statuteAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                {' شرح وظایف و ماموریتهای اساسی استانداری ها: '}
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#statuteAccordion"
            >
              <div className="accordion-body">
                <p className="clause">
                  {' ماده 5 – اهداف : هدفهاي اساسي كانون عبارت است از : '}
                  <br />
                </p>
                <div className="note">
                  <strong>{'الف:'}</strong>
                  {' بالا بردن كيفيت پروژهاي ساختماني شهرستان بابل بر اساس موازين علمي و فني. '}
                </div>
                <div className="note">
                  <strong>{'ب:'}</strong>
                  {
                    'حفظ حقوق قانوني مهندسين ساختمان و معماري شهرستان بابل و استيفاي حقوق حقّه آنان . '
                  }
                </div>
                <div className="note">
                  <strong>{'ج:'}</strong>
                  {
                    'مساعدت و همكاريهاي لازم‌در زمينه خدمات فنّي براي مؤسسات خيريه و شخصيت‌هاي حقيقي و حقوقي بر اساس تشخيص كانون . '
                  }
                </div>
                <div className="note">
                  <strong>{'د:'}</strong>
                  {'تشكيل مؤسسات فني و مالي وابسته به كانون عنداللزوم . '}
                </div>
                <p></p>
                <p className="clause">
                  {' ماده 6 – وظايف : اهم وظايف كانون براي نيل به اهداف ياده شده بشرح زير است : '}
                  <br />
                </p>
                <div className="note">
                  <strong>{'الف:'}</strong>
                  {'سعي در شناساندن كانون بعنوان يك مرجع صلاحيتدار رسمي در شهرستان بابل . '}
                </div>
                <div className="note">
                  <strong>{'ب:'}</strong>
                  {'تلاش و پيگيري در امر اجراء صحيح و كامل قوانين نظام معماري و ساختماني . '}
                </div>
                <div className="note">
                  <strong>{'ج:'}</strong>
                  {'همكاري با ساير كانون مهندسين و مؤسسات علمي و فنّي در جهت پيشبرد اهداف كانون . '}
                </div>
                <div className="note">
                  <strong>{'ه:'}</strong>
                  {
                    'تهيه و تدوين طرحها و آئين‌نامه‌ها و مشخصات فني و سعي در به مرحله اجراء درآوردن آنها از طرف مراجع صلاحيتدار . '
                  }
                </div>
                <div className="note">
                  <strong>{'و:'}</strong>
                  {
                    'انتشار رسالات ، گردآوري آمار ، اطلاعات و تأسيس كتابخانه در زمينه هاي علمي و فني . '
                  }
                </div>
                <div className="note">
                  <strong>{'ز:'}</strong>
                  {
                    'ايجاد ارتباط با ديگر مراكز علمي و فني و تشكيل و شركت در مجالس سخنراني يا كميسيونها و سمينارهاي مطالعاتي و تحقيقاتي داخلي و خارجي . '
                  }
                </div>
                <div className="note">
                  <strong>{'ح:'}</strong>
                  {
                    'تهيه و تنظيم آئين نامه‌هاي داخلي كه براي نيل به اهداف كانون ضرورت داشته باشد . '
                  }
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
