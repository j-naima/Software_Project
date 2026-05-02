import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ open, setOpen, userRole }) => {
  const location = useLocation();

  const getNavigationItems = () => {
    switch (userRole) {
      case "Student":
        return [
          { name: "Home", path: "/student", icon: "home" },
          {
            name: "Submit Proposal",
            path: "/student/submit-proposal",
            icon: "document",
          },
          {
            name: "Upload Files",
            path: "/student/upload-files",
            icon: "upload",
          },
          { name: "Supervisor", path: "/student/supervisor", icon: "user" },
          { name: "Feedback", path: "/student/feedback", icon: "chat" },
          {
            name: "Notifications",
            path: "/student/notifications",
            icon: "bell",
          },
          {
            name: "Research Assistant",
            path: "/student/research",
            icon: "sparkles",
          },
        ];
      case "Teacher":
        return [
          { name: "Home", path: "/teacher", icon: "home" },
          {
            name: "Pending Requests",
            path: "/teacher/pending-requests",
            icon: "clock",
          },
          {
            name: "Assigned Students",
            path: "/teacher/assigned-students",
            icon: "users",
          },
          { name: "Files", path: "/teacher/files", icon: "folder" },
        ];
      case "Admin":
        return [
          { name: "Home", path: "/admin", icon: "home" },
          { name: "Manage Students", path: "/admin/students", icon: "users" },
          {
            name: "Manage Teachers",
            path: "/admin/teachers",
            icon: "academic",
          },
          {
            name: "Assign Supervisor",
            path: "/admin/assign-supervisor",
            icon: "link",
          },
          { name: "Deadlines", path: "/admin/deadlines", icon: "calendar" },
          { name: "Projects", path: "/admin/projects", icon: "folder" },
        ];
      default:
        return [];
    }
  };

  const getIcon = (iconName, isActive = false) => {
    const className = `w-5 h-5 ${isActive ? "text-[#00e560]" : "text-[#5a8a72]"}`;

    const icons = {
      home: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      document: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      upload: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
      user: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      chat: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      bell: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      clock: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      users: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      folder: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      check: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      academic: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      link: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      calendar: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      sparkles: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    };

    return (
      icons[iconName] || (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7h16z"
          />
        </svg>
      )
    );
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      <div
        className={`fixed -left-full lg:left-0 top-16 h-[calc(100vh-4rem)] bg-[#0a0f0d] border-r border-[rgba(0,229,96,0.15)] transition-all duration-300 z-30 ${open ? "w-64" : "w-20"}`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.name === "Home"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(0,229,96,0.12)] text-[#00e560] border-r-4 border-[#00e560]"
                      : "text-[#5a8a72] hover:bg-[rgba(0,229,96,0.08)] hover:text-[#00e560]"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) setOpen(false);
                }}
              >
                <div className="flex-shrink-0">
                  {getIcon(item.icon, location.pathname === item.path)}
                </div>
                <span
                  className={`ml-3 font-medium text-sm transition-opacity duration-300 ${
                    open ? "opacity-100 block" : "opacity-0 hidden lg:hidden"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[rgba(0,229,96,0.15)]">
            <div
              className={`transition-opacity duration-300 ${open ? "opacity-100 block" : "opacity-0 hidden lg:hidden"}`}
            >
              <p className="text-xs text-[#5a8a72] text-center">
                AcadTrack - Project Management v1.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0a0f0d] z-50 lg:hidden transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.name === "Home"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(0,229,96,0.12)] text-[#00e560]"
                      : "text-[#5a8a72] hover:bg-[rgba(0,229,96,0.08)] hover:text-[#00e560]"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <div className="flex-shrink-0">
                  {getIcon(item.icon, location.pathname === item.path)}
                </div>
                <span className="ml-3 font-medium text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[rgba(0,229,96,0.15)]">
            <p className="text-xs text-[#5a8a72] text-center">
              AcadTrack - Project Management v1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
