import { mockNotifications } from "@/lib/mock-data";
import {
  CalendarDays,
  Wallet,
  Star,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

export default function NotificationsCard() {
  const notifications = mockNotifications;

  const notificationIcons: Record<string, LucideIcon> = {
    Booking: CalendarDays,
    REfund: Wallet,
    Review: BadgeCheck,
    Verification: BadgeCheck,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" ml-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Dashboard/Notification</p>
            <h1 className="text-2xl font-bold text-gray-900">
              Notifications Center
            </h1>
            <p className="text-gray-500">Unread & Read Alerts</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {notifications.map((item, index) => {
            const notificationIcons = item.icon;

            return (
              <div
                key={item.id}
                className={`group flex items-start justify-between p-3 transition hover:bg-gray-50 ${
                  index !== notifications.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full `}
                  >
                    {/*   <Icon size={20} /> */}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="whitespace-nowrap text-sm text-gray-400">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
