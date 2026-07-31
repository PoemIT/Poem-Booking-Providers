export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type Booking = {
  id: string; // string of numbers
  bookingRef: string; // e.g. "PB-2025-0124"
  customerName: string;
  service: string; // e.g. "Hotel Room", "Shuttle Bus"
  date: string; // ISO date string, e.g. "2025-06-11"
  status: BookingStatus;
  amount: number; // in XAF, no formatting — formatting happens in the UI, not here
  paymentMethod: string; // e.g. "Mobile Money", "Orange Money", "POEM Pay"
};

export type DashboardStats = {
  todaysBookings: number;
  todaysBookingsChangePercent: number; // e.g. 12 means "+12%"
  availableInventory: number;
  availableInventoryChangePercent: number;
  monthlyRevenue: number;
  monthlyRevenueChangePercent: number;
  pendingRefunds: number;
  pendingRefundsChangePercent: number;
};

export type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  unread: boolean;
};
