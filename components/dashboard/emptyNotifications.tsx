import { Bell } from "lucide-react";

export default function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24">
      <Bell className="mb-4 h-16 w-16 text-muted-foreground" />

      <h3 className="text-lg font-semibold">You're all caught up!</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        You don't have any notifications yet.
      </p>
    </div>
  );
}
