export default function SiteArPart7() {
  return (
    <>
      <div id="panel">
        <div id="handle"></div>
        <div className="content">
          <aside id="sidebar" className="sidebar">
            <div className="sidebar-header">
              <button
                type="button"
                className="icon-btn"
                id="sidebar-close-btn"
                aria-label="Close sidebar"
              >
                <svg viewBox="0 0 24 24" className="icon">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <button type="button" className="new-chat-btn" id="sidebar-new-chat-btn">
              <svg viewBox="0 0 24 24" className="icon small">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="M15 5l4 4"></path>
              </svg>
              <span>{'New chat'}</span>
            </button>
            <div className="sidebar-section-title">{'Chats'}</div>
            <div id="history-list" className="history-list">
              <div className="history-empty" id="history-empty">
                {'No chat history yet'}
              </div>
            </div>
          </aside>
          <div id="sidebar-overlay" className="sidebar-overlay"></div>
          <div id="main-container" className="main-container">
            <header className="header">
              <div className="header-inner">
                <button type="button" className="icon-btn" id="menu-btn" aria-label="Menu">
                  <svg viewBox="0 0 24 24" className="icon">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                <h1 className="header-title">{'Hyrcan'}</h1>
                <div id="panelClose" title="إغلاق">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                  </svg>
                </div>
              </div>
            </header>
            <div id="chat-container" className="chat-container">
              <div id="welcome-screen" className="welcome-screen">
                <div className="jarvis">
                  <div className="blob"></div>
                </div>
                <h1>{'Hi, my name is hyrcan'}</h1>
                <p>
                  {
                    ' The first enterprise language model for the administrative system of the Islamic Republic of Iran.'
                  }
                </p>
              </div>
              <div id="chat-inner" className="chat-inner">
                <div id="messages-end"></div>
              </div>
            </div>
            <div className="input-area">
              <form id="chat-form" className="chat-form" action="#" data-form="true">
                <div id="input-container" className="input-container">
                  <div className="textarea-wrap">
                    <textarea
                      id="chat-textarea"
                      className="chat-textarea"
                      placeholder="Ask Anything"
                      rows={1}
                    ></textarea>
                  </div>
                  <div className="controls-row">
                    <div className="controls-left">
                      <button
                        type="button"
                        className="pill-btn icon-only"
                        id="btn-add"
                        aria-label="Add"
                      >
                        <svg viewBox="0 0 24 24" className="icon small">
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                      </button>
                      <button type="button" className="pill-btn" id="btn-deepsearch">
                        <svg viewBox="0 0 24 24" className="icon small">
                          <circle cx="11" cy="11" r="7"></circle>
                          <path d="M21 21l-4.3-4.3"></path>
                        </svg>
                        <span>{'DeepSearch'}</span>
                      </button>
                      <button type="button" className="pill-btn" id="btn-think">
                        <svg viewBox="0 0 24 24" className="icon small">
                          <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.3V16h6v-1.2c0-.9.4-1.7 1-2.3A6 6 0 0 0 12 2Z"></path>
                        </svg>
                        <span>{'Think'}</span>
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="submit-btn"
                      id="submit-btn"
                      disabled={true}
                      aria-label="Submit"
                    >
                      <svg viewBox="0 0 24 24" className="icon">
                        <path d="M12 19V5M5 12l7-7 7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
