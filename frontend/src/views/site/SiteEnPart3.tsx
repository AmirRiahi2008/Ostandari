export default function SiteEnPart3() {
  return (
    <>
      <div className="container">
        <div className="chat-box" id="modalContent">
          <div className="chat-header">
            <div className="header-img makecenter">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                ></path>
              </svg>
            </div>
            <div className="onvan-header">
              <div className="title-name">{'Karimi'}</div>
              <div className="title-text">{"We're here to answer your questions..."}</div>
            </div>
            <div
              className="header-close"
              data-command="closeModal"
              data-command-args=""
              data-command-event="click"
              role="button"
              tabIndex={0}
              aria-label="باز کردن بخش"
            >
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
          <div className="chat-body">
            <div className="send-container">
              <div className="send-box">
                <p>
                  {
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed reprehenderit voluptatibus ut, qui animi excepturi praesentium natus distinctio totam consequuntur obcaecati iusto rerum, aliquam illum numquam. Ut in saepe ea doloremque maxime ratione magnam eveniet!'
                  }
                </p>
                <div className="send-mosalas"></div>
              </div>
            </div>
            <div className="recive-container">
              <div className="recive-box">
                <p>{"Hi, today is Sunday and the internet still isn't connected"}</p>
                <div className="recive-mosalas"></div>
              </div>
            </div>
            <div className="sadra">
              <p>{'Design & Development by Sadra Rayaneh Novin Tabarestan Engineering'}</p>
            </div>
          </div>
          <div className="chat-footer">
            <form action="#" data-form="true">
              <div className="chat-footer-right">
                <div className="mice">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-mic"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"></path>
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"></path>
                  </svg>
                </div>
                <div className="payam-footer">
                  <input type="text" placeholder="Type your message..." />
                </div>
              </div>
              <div className="chat-footer-left">
                <div className="emoji">
                  <img alt="" />
                </div>
                <div className="sanjagh">
                  <label htmlFor="payam">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-paperclip"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"></path>
                    </svg>
                  </label>
                  <input type="file" id="payam" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
