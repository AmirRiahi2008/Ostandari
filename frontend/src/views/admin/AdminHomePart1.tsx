import { AdminDashboard } from '@/components/admin/dashboard';
import { templatePreview } from '@/lib/config';
import AdminHeader9ef4c from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail3e246 from '@/components/template/parts/AdminRail3e246';
export default function AdminHomePart1() {
  return (
    <>
      <div className="all-website">
        <AdminHeader9ef4c />
        <div className="sadyar-content">
          <AdminRail3e246 />
          <div className="main-content">
            <div className="main-content-header">
              <div className="main-content-header-inside">
                <h2>{'داشبورد'}</h2>
              </div>
            </div>
            <div className="main-content-content">
              <div className="main-page-items-parent">
                <AdminDashboard preview={templatePreview()} />
              </div>
              <div className="main-page-items-parent"></div>
            </div>
          </div>
          <div className="search-dark-overlay" id="sharedOverlay">
            <div className="popup-content-wrapper" id="popupBody"></div>
          </div>
          <div className="popup-1-content d-6e22c58a7a6a60" id="popup1Content">
            <div className="search-middle">
              <div className="search-middle-top">
                <input type="text" placeholder="جستجو . . ." />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11.558"
                    cy="11.0585"
                    r="7.06194"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></circle>
                  <path
                    d="M20.5024 20.0034L16.5508 16.0518"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="search-middle-bottom">
                <div className="search-middle-bottom-child">
                  <div className="bigitem-menu-bottom-item-notif">
                    <img alt="" />
                  </div>
                  <div className="makecenter notif-bottom-text">
                    {'نام منبع مورد نظر را وارد کنید'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
