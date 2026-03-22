import { useNotificationStore } from "../../store/notification.store";


export default function NotificationDropdown() {
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);

  if (!notifications.length) {
    return (
      <div className="p-3 text-sm">
        No notifications
      </div>
    );
  }

  return (
    <div className="w-72 max-h-80 overflow-auto">
      {notifications.map((n) => (
        <div
          key={n.id}
          onClick={() => markRead(n.id)}
          className={`p-2 border-b cursor-pointer ${n.read ? "opacity-60" : ""
            }`}
        >
          {n.title}
        </div>
      ))}
    </div>
  );
}
