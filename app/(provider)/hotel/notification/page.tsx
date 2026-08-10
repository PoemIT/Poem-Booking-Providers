import EmptyNotifications from "@/components/dashboard/emptyNotifications";
import NotificationsCard from "@/components/dashboard/notifications";
import { mockNotifications } from "@/lib/mock-data";
import React from "react";

function NotificationsPage() {
  return (
    <>
      {mockNotifications.length > 0 ? (
        <NotificationsCard />
      ) : (
        <EmptyNotifications />
      )}
    </>
  );
}

export default NotificationsPage;
