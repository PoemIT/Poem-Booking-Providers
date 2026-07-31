import type { Booking, DashboardStats, Notification } from "./types";

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
