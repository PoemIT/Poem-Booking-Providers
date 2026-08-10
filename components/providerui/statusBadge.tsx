import type { BookingStatus, RoomStatus } from "@/lib/types";

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-50 text-green-700",
  pending: "bg-orange-50 text-orange-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};
const roomStatusStyles: Record<RoomStatus, string> = {
  active: "bg-green-50 text-green-700",
  maintenance: "bg-orange-50 text-orange-700",
  inactive: "bg-red-50 text-red-700",
};

const statusDotStyle: Record<BookingStatus, string> = {
  confirmed: "bg-green-500",
  pending: "bg-orange-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
};

const statusLabels: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
};
const roomStatusLabels: Record<RoomStatus, string> = {
  active: "Active",
  maintenance: " Maintenance",
  inactive: "inactive",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export function StatusBadgeButton({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <div
        className={`h-1.5 w-1.5 rounded-full ${statusDotStyle[status]}`}
      ></div>
      {statusLabels[status]}
    </span>
  );
}

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roomStatusStyles[status]}`}
    >
      {roomStatusLabels[status]}
    </span>
  );
}
