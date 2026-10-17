export default function SiteNewsDetailsPart1() {
  return (
    <>
      <div id="myOverlay" className="srchoverlay">
        <span
          className="closebtn"
          title="Close Overlay"
          data-command="closeSearch"
          data-command-args=""
          data-command-event="click"
          role="button"
          tabIndex={0}
          aria-label="باز کردن بخش"
        >
          {'×'}
        </span>
        <div className="overlay-content">
          <form action="#" data-form="true">
            <input type="text" placeholder="متن جستجو را وارد کنید .." name="search" />
            <button type="submit">
              <i className="fal fa-search fa-2x"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
