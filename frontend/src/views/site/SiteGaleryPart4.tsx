export default function SiteGaleryPart4() {
  return (
    <>
      <div className="lightbox-overlay" id="lightboxOverlay">
        <div className="lightbox-box">
          <div className="lightbox-close" id="lightboxClose">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="lightbox-nav lightbox-prev" id="lightboxPrev">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="lightbox-nav lightbox-next" id="lightboxNext">
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="lightbox-media" id="lightboxMedia">
            <svg
              width="350"
              height="265"
              viewBox="0 0 350 265"
              fill="none"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="350" height="265" rx="8" fill="url(#sfd453f-0-pattern0_167_68)"></rect>
              <rect
                width="350"
                height="265"
                rx="8"
                fill="url(#sfd453f-0-paint0_linear_167_68)"
                fillOpacity="0.5"
              ></rect>
              <defs>
                <pattern
                  id="sfd453f-0-pattern0_167_68"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    transform="matrix(0.000808913 0 0 0.00106838 -0.0177045 0)"
                    xlinkHref="#sfd453f-0-image0_167_68"
                  ></use>
                </pattern>
                <linearGradient
                  id="sfd453f-0-paint0_linear_167_68"
                  x1="175"
                  y1="0"
                  x2="175"
                  y2="265"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.8" stopOpacity="0.1"></stop>
                  <stop offset="0.9"></stop>
                </linearGradient>
                <image
                  id="sfd453f-0-image0_167_68"
                  width="1280"
                  height="936"
                  preserveAspectRatio="none"
                  xlinkHref="/design/shared/29086cb1e1d6be9abdec.jpg"
                ></image>
              </defs>
            </svg>
          </div>
          <div className="lightbox-info">
            <div>
              <span className="lightbox-tag" id="lightboxTag"></span>
              <p id="lightboxCaption"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
