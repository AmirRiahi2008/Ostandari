import { Fragment } from 'react';
import { REGISTRATION_TERMS } from '@/lib/registration-terms';

function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}

const number = (value: number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

export function RegistrationTerms() {
  const document = REGISTRATION_TERMS;
  return (
    <section className="portal-registration-terms" aria-labelledby="registration-terms-title">
      <header className="portal-registration-terms-header">
        <span className="portal-auth-kicker">پیش از ثبت‌نام مطالعه کنید</span>
        <h2 id="registration-terms-title">قوانین و مقررات استفاده از پرتال</h2>
        <p>متن کامل آیین‌نامه · ۱۷ ماده · نسخهٔ {document.displayVersion}</p>
      </header>
      <details className="portal-registration-terms-index">
        <summary>فهرست مواد آیین‌نامه</summary>
        <nav aria-label="فهرست مواد آیین‌نامه">
          <a href="#registration-terms-introduction">مقدمه</a>
          {document.articles.map((article) => (
            <a key={article.number} href={'#registration-terms-article-' + article.number}>
              {number(article.number)}. {article.title}
            </a>
          ))}
          <a href="#registration-terms-notice">{document.notice.title}</a>
        </nav>
      </details>
      <div
        id="registration-terms-text"
        className="portal-registration-terms-text"
        role="region"
        aria-label="متن کامل آیین‌نامه؛ برای مطالعه به پایین پیمایش کنید"
        tabIndex={0}
        dir="rtl"
      >
        <h3>{document.title}</h3>
        <dl className="portal-registration-terms-meta">
          <div>
            <dt>دامنه اجرا</dt>
            <dd>{document.scope}</dd>
          </div>
          <div>
            <dt>نسخه</dt>
            <dd>{document.displayVersion}</dd>
          </div>
          <div>
            <dt>تاریخ اجرا</dt>
            <dd>{document.effectiveDate}</dd>
          </div>
        </dl>
        <section id="registration-terms-introduction">
          <h3>مقدمه</h3>
          {document.introduction.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </section>
        {document.articles.map((article) => (
          <section
            key={article.number}
            id={'registration-terms-article-' + article.number}
            data-terms-article={article.number}
          >
            <h3>
              ماده {number(article.number)} ـ {article.title}
            </h3>
            {'introduction' in article && article.introduction && <p>{article.introduction}</p>}
            {article.clauses.map((text, index) => (
              <p key={index} data-terms-clause>
                {inline(text)}
              </p>
            ))}
          </section>
        ))}
        <section id="registration-terms-notice" className="portal-registration-terms-notice">
          <h3>{document.notice.title}</h3>
          {document.notice.paragraphs.map((text, index) => (
            <p key={index}>{inline(text)}</p>
          ))}
        </section>
      </div>
      <p className="portal-registration-terms-hint" id="registration-terms-help">
        متن بالا قابل پیمایش است. پذیرش قوانین، شرط ادامهٔ ثبت‌نام شهروندی است.
      </p>
    </section>
  );
}
