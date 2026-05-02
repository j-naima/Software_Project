import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { authUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <nav className="bg-[#0a0f0d] border-b border-[rgba(0,229,96,0.15)] fixed w-full top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-[#5a8a72] hover:bg-[rgba(0,229,96,0.08)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,96,0.5)]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Logo and title */}
            <div className="flex items-center ml-4">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-[#00e560] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#0a0f0d]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="ml-3 hidden sm:block">
                  <h1 className="text-lg font-semibold text-[#c8f5e0]">
                    AcadTrack - Project Management System
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[rgba(0,229,96,0.08)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,96,0.5)]"
              >
                <div className="w-8 h-8 bg-[#00e560] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-[#0a0f0d]">
                    {getInitials(authUser?.name)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[#c8f5e0]">
                    {authUser?.name}
                  </p>
                  <p className="text-xs text-[#5a8a72] capitalize">
                    {authUser?.role}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#5a8a72]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile dropdown menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111a15] rounded-lg shadow-lg border border-[rgba(0,229,96,0.25)] z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-[rgba(0,229,96,0.15)]">
                      <p className="text-sm font-medium text-[#c8f5e0]">
                        {authUser?.name}
                      </p>
                      <p className="text-xs text-[#5a8a72]">
                        {authUser?.email}
                      </p>
                      <p className="text-xs text-[#00e560] capitalize font-medium mt-1">
                        {authUser?.role}
                      </p>
                    </div>
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-[#f47373] hover:bg-[rgba(244,115,115,0.1)] rounded-md mt-2"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(profileDropdownOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setProfileDropdownOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
