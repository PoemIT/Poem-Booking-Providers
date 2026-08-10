import type {
  Booking,
  DashboardStats,
  DayAvailability,
  MonthAvailabilitySummary,
  Notification,
  Room,
  RoomStats,
  VerificationDocument,
} from "./types";

export const mockDashboardStats: DashboardStats = {
  todaysBookings: 18,
  todaysBookingsChangePercent: 12,
  availableInventory: 42,
  availableInventoryChangePercent: 5,
  monthlyRevenue: 4500000,
  monthlyRevenueChangePercent: 8,
  pendingRefunds: 2,
  pendingRefundsChangePercent: -1,
};

export const mockRoomStats: RoomStats = {
  totalRooms: 24,
  occupiedToday: 18,
  availableNow: 6,
  revenueThisMonth: 810000,
};

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Suite 204",
    type: "Deluxe",
    pricePerNight: 45000,
    occupied: 12,
    totalUnits: 15,
    status: "active",
  },
  {
    id: "2",
    name: "Standard Room 110",
    type: "Standard",
    pricePerNight: 25000,
    occupied: 3,
    totalUnits: 10,
    status: "active",
  },
  {
    id: "3",
    name: "Executive Suite 301",
    type: "Executive",
    pricePerNight: 65000,
    occupied: 0,
    totalUnits: 2,
    status: "maintenance",
  },
  {
    id: "4",
    name: "Family Room 105",
    type: "Family",
    pricePerNight: 38000,
    occupied: 0,
    totalUnits: 5,
    status: "inactive",
  },
  {
    id: "5",
    name: "Ocean View 402",
    type: "Deluxe",
    pricePerNight: 58000,
    occupied: 4,
    totalUnits: 6,
    status: "active",
  },
  {
    id: "6",
    name: "Single Room 112",
    type: "Standard",
    pricePerNight: 20000,
    occupied: 1,
    totalUnits: 8,
    status: "active",
  },
];

// Simple wavy numbers just to draw a sparkline — not real historical data.
export const mockSparklines = {
  todaysBookings: [4, 7, 5, 9, 6, 10, 8, 12, 9, 14, 18],
  availableInventory: [30, 35, 33, 38, 34, 40, 37, 42, 39, 44, 42],
  monthlyRevenue: [3.2, 3.5, 3.3, 3.8, 3.6, 4.0, 3.9, 4.2, 4.1, 4.4, 4.5],
  pendingRefunds: [5, 4, 6, 3, 5, 2, 4, 3, 1, 2, 2],
};

export const mockTotalBookingsCount = 24;

export const mockRecentBookings: Booking[] = [
  {
    id: "1",
    bookingRef: "PB-2025-0124",
    customerName: "Marie Nguema",
    service: "Hotel Room",
    date: "2025-06-11",
    status: "confirmed",
    amount: 85000,
    paymentMethod: "Mobile Money",
  },
  {
    id: "2",
    bookingRef: "PB-2025-0123",
    customerName: "Jean Mbida",
    service: "Shuttle Bus",
    date: "2025-06-11",
    status: "pending",
    amount: 12500,
    paymentMethod: "Orange Money",
  },
  {
    id: "3",
    bookingRef: "PB-2025-0122",
    customerName: "Claire Ondo",
    service: "Suite Deluxe",
    date: "2025-06-10",
    status: "confirmed",
    amount: 120000,
    paymentMethod: "POEM Pay",
  },
  {
    id: "4",
    bookingRef: "PB-2025-0121",
    customerName: "Paul Biyong",
    service: "Airport Transfer",
    date: "2025-06-10",
    status: "completed",
    amount: 25000,
    paymentMethod: "MTN MoMo",
  },
  {
    id: "5",
    bookingRef: "PB-2025-0120",
    customerName: "Sophie Ateba",
    service: "Conference Room",
    date: "2025-06-09",
    status: "confirmed",
    amount: 60000,
    paymentMethod: "POEM Pay",
  },
  {
    id: "6",
    bookingRef: "PB-2025-0119",
    customerName: "Henri Etoundi",
    service: "Hotel Room",
    date: "2025-06-09",
    status: "cancelled",
    amount: 75000,
    paymentMethod: "POEM Pay",
  },
  {
    id: "7",
    bookingRef: "PB-2025-0118",
    customerName: "Nadia Fouda",
    service: "Private Car",
    date: "2025-06-08",
    status: "completed",
    amount: 18000,
    paymentMethod: "Mobile Money",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New booking received",
    description: "Deluxe Suite 204 booked by Aïcha Njoya",
    time: "2m",
    icon: "CalendarDays",
    color: "text-blue-600 bg-blue-100",
    unread: true,
  },
  {
    id: 2,
    title: "Refund request submitted",
    description: "Booking #BK-10236 requested a refund.",
    time: "1h",
    icon: "Wallet",
    color: "text-orange-600 bg-orange-100",
    unread: true,
  },
  {
    id: 3,
    title: "New review posted",
    description: "5 stars received for Bastos Apartment.",
    time: "3h",
    icon: "Star",
    color: "text-yellow-600 bg-yellow-100",
    unread: false,
  },
  {
    id: 4,
    title: "Verification approved",
    description: "Your business license has been approved.",
    time: "1d",
    icon: "BadgeCheck",
    color: "text-green-600 bg-green-100",
    unread: false,
  },
];

export const mockProfileDetails = [
  { label: "Business Name", value: "Hotel Continental" },
  { label: "Type", value: "Hotel" },
  { label: "Registration No.", value: "RC/DLA/2019/B/1245" },
  { label: "Tax Number", value: "M071912345678X" },
  { label: "Phone", value: "+237 677 12 34 56" },
  { label: "Email", value: "contact@hotelcontinental.cm" },
  { label: "Address", value: "Rue de la Joie, Bonanjo, Douala" },
];

export const mockVerificationDocuments: VerificationDocument[] = [
  {
    id: "1",
    name: "Business Registration",
    type: "PDF",
    uploadedDate: "2026-06-12",
    status: "verified",
  },
  {
    id: "2",
    name: "Tax Certificate",
    type: "PDF",
    uploadedDate: "2026-06-12",
    status: "verified",
  },
  {
    id: "3",
    name: "Owner ID",
    type: "Image",
    uploadedDate: "2026-06-10",
    status: "pending",
  },
  {
    id: "4",
    name: "Business License",
    type: "PDF",
    uploadedDate: null,
    status: "missing",
  },
];

export const mockRoomDetail = {
  name: "Luxury Apartment",
  description: "Room details & performance",
  type: "Apartment",
  maxOccupancy: "2 Adults",
  bedType: "King",
  location: "Bastos, Yaoundé",
  weekendPrice: 52000,
  amenities: "WiFi, AC, TV, Minibar",
  status: "active" as const,
  photos: ["./next.svg", "./hotel2.jfif", "./hotel1.jfif", ""],
};
export const mockRoomPerformance = {
  bookingsThisMonth: 18,
  revenueThisMonth: 810000,
  occupancyPercent: 80,
};

export const mockAvailabilityByDay: Record<number, DayAvailability> = {
  3: { status: "booked", bookedBy: "Jean-Pierre M.", amount: 45000 },
  4: { status: "booked", bookedBy: "Jean-Pierre M.", amount: 45000 },
  12: { status: "unavailable" },
  13: { status: "other" },
  15: { status: "booked", bookedBy: "Amadou S.", amount: 45000 },
  16: { status: "booked", bookedBy: "Amadou S.", amount: 45000 },
};

export const mockAvailabilitySummary: MonthAvailabilitySummary = {
  availableRooms: "12/15",
  bookedNightsLabel: "4 nights (2 bookings)",
  blockedNightsLabel: "2 nights",
  occupancyRatePercent: 13.3,
};
