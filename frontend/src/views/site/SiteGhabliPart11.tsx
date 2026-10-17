export default function SiteGhabliPart11() {
  return (
    <>
      <div id="installAppOverlay" className="install-app-overlay">
        <div
          className="install-app-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="installAppTitle"
        >
          <button
            type="button"
            className="install-app-close"
            id="installAppClose"
            aria-label="بستن"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          <h3 id="installAppTitle" className="install-app-title">
            {'نصب اپلیکیشن'}
          </h3>
          <div className="install-app-qr-box">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=https%3A%2F%2Fostan-mz.ir%2Fapp"
              alt="QR کد نصب اپلیکیشن"
              width="180"
              height="180"
            />
          </div>
          <p className="install-app-desc">
            {'با اسکن QR کد، اپلیکیشن پرتال استانداری مازندران را روی گوشی خود نصب کنید'}
          </p>
          <div className="install-app-divider">
            <span>{'یا'}</span>
          </div>
          <button
            type="button"
            className="install-app-copy-btn"
            id="installAppCopyBtn"
            data-link="https://ostan-mz.ir/app"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span id="installAppCopyText">{'کپی لینک نصب'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
