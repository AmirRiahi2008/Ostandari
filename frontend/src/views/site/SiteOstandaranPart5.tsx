export default function SiteOstandaranPart5() {
  return (
    <>
      <div id="panel">
        <div id="handle"></div>
        <div id="panelClose" title="بستن">
          <svg width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
          </svg>
        </div>
        <div className="content">
          <div className="satna-chat">
            <div className="satna-chat-header">
              <div className="satna-avatar">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="8" width="16" height="12" rx="3"></rect>
                  <circle cx="9" cy="14" r="1.4" fill="currentColor" stroke="none"></circle>
                  <circle cx="15" cy="14" r="1.4" fill="currentColor" stroke="none"></circle>
                  <path d="M12 8V5"></path>
                  <circle cx="12" cy="3.5" r="1.3" fill="currentColor" stroke="none"></circle>
                  <path d="M2 13h2M20 13h2"></path>
                </svg>
              </div>
              <div className="satna-title-wrap">
                <div className="satna-name">
                  {'استانیار '}
                  <span className="satna-online"></span>
                </div>
                <div className="satna-status">{'دستیار هوش مصنوعی سازمانی'}</div>
              </div>
            </div>
            <div className="satna-chat-body">
              <div className="satna-msg bot">
                <div className="satna-msg-avatar">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="8" width="16" height="12" rx="3"></rect>
                    <circle cx="9" cy="14" r="1.4" fill="currentColor" stroke="none"></circle>
                    <circle cx="15" cy="14" r="1.4" fill="currentColor" stroke="none"></circle>
                    <path d="M12 8V5"></path>
                    <circle cx="12" cy="3.5" r="1.3" fill="currentColor" stroke="none"></circle>
                  </svg>
                </div>
                <div className="satna-bubble">
                  {' سلام! من '}
                  <b>{'استانیار'}</b>
                  {
                    ' هستم، اولین دستیار هوش مصنوعی سازمانی. شما می‌تونید هر سوالی که در سیستم اداری دارید از من بپرسید؛ من با استفاده از قوانین و مقررات شما رو راهنمایی خواهم کرد... '
                  }
                </div>
              </div>
            </div>
            <div className="satna-chat-input">
              <button type="button" className="satna-icon-btn" title="ضبط صدا">
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-mic"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"></path>
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"></path>
                </svg>
              </button>
              <button type="button" className="satna-icon-btn" title="پیوست فایل">
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-paperclip"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"></path>
                </svg>
              </button>
              <input type="text" placeholder="سوال خود را بنویسید..." />
              <button type="button" className="satna-send-btn" title="ارسال">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5"></path>
                  <path d="M6 11l6-6 6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
