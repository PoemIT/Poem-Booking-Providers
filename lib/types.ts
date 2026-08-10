export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type RoomStatus = "active" | "maintenance" | "inactive";

export type RoomStats = {
  totalRooms: number;
  occupiedToday: number;
  availableNow: number;
  revenueThisMonth: number;
};

export type Room = {
  id: string;
  name: string;
  type: string; // e.g. "Deluxe", "Standard", "Executive", "Family"
  pricePerNight: number;
  occupied: number;
  totalUnits: number;
  status: RoomStatus;
};

export type RoomDetail = {
  name: string;
  description: string;
  type: string;
  maxOccupancy: string; // e.g. "2 Adults"
  bedType: string;
  location: string;
  weekendPrice: number;
  amenities: string; // simple comma-separated text, matching the New Room form
  status: RoomStatus;
  photos: string[];
};

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

export type DocumentStatus = "verified" | "pending" | "missing";

export type VerificationDocument = {
  id: string;
  name: string;
  type: string; // e.g. "PDF", "Image"
  uploadedDate: string | null; // null when nothing has been uploaded yet
  status: DocumentStatus;
};

export type DayAvailabilityStatus =
  | "available"
  | "booked"
  | "unavailable"
  | "other";

export type DayAvailability = {
  status: DayAvailabilityStatus;
  availableCount?: number; // e.g. 12 (out of totalUnits)
  totalCount?: number;
  bookedBy?: string;
  amount?: number;
};

export type MonthAvailabilitySummary = {
  availableRooms: string; // e.g. "12/15"
  bookedNightsLabel: string; // e.g. "4 nights (2 bookings)"
  blockedNightsLabel: string; // e.g. "2 nights"
  occupancyRatePercent: number;
};
