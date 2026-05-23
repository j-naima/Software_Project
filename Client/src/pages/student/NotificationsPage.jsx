import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "../../store/slices/notificationSlice";
import {
  BadgeCheck,
  Calendar,
  ChevronDown,
  Clock5,
  MessageCircle,
  Settings,
  User,
  AlertCircle,
  Clock,
  CheckCircle2,
  BellOff,
} from "lucide-react";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.list);
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const markAsReadHandler = (id) => dispatch(markAsRead(id));
  const markAllAsReadHandler = () => dispatch(markAllAsRead());
  const deleteNotificationHandler = (id) => dispatch(deleteNotification(id));

  const getNotificationIcon = (type) => {
    switch (type) {
      case "feedback":
        return <MessageCircle className="w-6 h-6 text-[#00e560]" />;
      case "deadline":
        return <Clock5 className="w-6 h-6 text-[#f47373]" />;
      case "approval":
        return <BadgeCheck className="w-6 h-6 text-[#00e560]" />;
      case "meeting":
        return <Calendar className="w-6 h-6 text-yellow-400" />;
      case "system":
        return <Settings className="w-6 h-6 text-[#7ab898]" />;
      default:
        return (
          <div className="relative w-6 h-6 text-[#5a8a72] flex items-center justify-center">
            <User className="w-5 h-5 absolute" />
            <ChevronDown className="w-4 h-4 absolute top-4" />
          </div>
        );
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const stats = [
    {
      title: "Total",
      value: notifications.length,
      iconBg: "bg-[rgba(0,229,96,0.12)]",
      textColor: "text-[#00e560]",
      border: "border-[rgba(0,229,96,0.25)]",
      Icon: User,
    },
    {
      title: "Unread",
      value: unreadCount,
      iconBg: "bg-[rgba(244,115,115,0.12)]",
      textColor: "text-[#f47373]",
      border: "border-[rgba(244,115,115,0.2)]",
      Icon: AlertCircle,
    },
    {
      title: "High Priority",
      value: notifications.filter((n) => n.priority === "high").length,
      iconBg: "bg-[rgba(234,179,8,0.12)]",
      textColor: "text-yellow-400",
      border: "border-[rgba(234,179,8,0.25)]",
      Icon: Clock,
    },
    {
      title: "This Week",
      value: notifications.filter((n) => {
        const notifDate = new Date(n.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return notifDate >= weekAgo;
      }).length,
      iconBg: "bg-[rgba(0,229,96,0.12)]",
      textColor: "text-[#00e560]",
      border: "border-[rgba(0,229,96,0.25)]",
      Icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="card-title">Notifications</h1>
              <p className="card-subtitle">
                Stay updated with your project progress and deadlines
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                className="btn-outline btn-small"
                onClick={markAllAsReadHandler}
              >
                Mark all as read ({unreadCount})
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((item, i) => (
            <div key={i} className={`card ${item.border}`}>
              <div className="flex items-center">
                <div className={`p-2 ${item.iconBg} rounded-lg`}>
                  <item.Icon className={`w-5 h-5 ${item.textColor}`} />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-[#5a8a72]">
                    {item.title}
                  </p>
                  <p className="text-xl font-bold text-[#c8f5e0] mt-0.5">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-xl border p-4 ${
                !notification.isRead
                  ? "bg-[rgba(0,229,96,0.05)] border-[rgba(0,229,96,0.25)]"
                  : "bg-[#111a15] border-[rgba(0,229,96,0.15)]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-semibold ${notification.isRead ? "text-[#7ab898]" : "text-[#c8f5e0]"}`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#00e560]" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5a8a72]">
                        {formatDate(notification.createdAt)}
                      </span>
                      <span
                        className={`badge capitalize ${
                          notification.priority === "high"
                            ? "badge-rejected"
                            : notification.priority === "medium"
                              ? "badge-pending"
                              : "badge-approved"
                        }`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#7ab898] leading-relaxed">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`badge capitalize ${
                        notification.type === "feedback"
                          ? "badge-approved"
                          : notification.type === "deadline"
                            ? "badge-rejected"
                            : notification.type === "approval"
                              ? "badge-approved"
                              : notification.type === "meeting"
                                ? "badge-pending"
                                : "badge"
                      }`}
                    >
                      {notification.type}
                    </span>

                    <div className="flex items-center gap-3">
                      {!notification.isRead && (
                        <button
                          className="text-xs font-medium text-[#00e560] hover:text-[#00bb4d]"
                          onClick={() => markAsReadHandler(notification._id)}
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        className="text-xs font-medium text-[#f47373] hover:text-red-400"
                        onClick={() =>
                          deleteNotificationHandler(notification._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-3">
              <BellOff className="w-12 h-12 text-[#2a5a42]" />
            </div>
            <p className="text-[#5a8a72] text-sm">No Notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
