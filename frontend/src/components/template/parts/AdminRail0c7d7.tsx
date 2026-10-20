import { AdminModuleMenu } from '@/components/admin/module-menu';
export default function AdminRail0c7d7() {
  return (
    <>
      <div className="sidebar shrink">
        <div className="sidebar-contents">
          <div className="sidebar-profile">
            <div className="sidebar-profile-top">
              <div className="sidebar-profile-top-right makecenter">
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
                <div className="sidebar-profile-top-right-role">{'مدیر'}</div>
              </div>
              <div className="sidebar-profile-top-left">
                <div className="sidebar-profile-top-left-item">{'مدیر سامانه '}</div>
                <div className="sidebar-profile-top-left-item">
                  <div className="sidebar-profile-top-left-item-number">
                    <span> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar-profile-bottom"></div>
          </div>
          <AdminModuleMenu />
        </div>
      </div>
    </>
  );
}
