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

export type HotelStatus = "active" | "pending";

export type Hotel = {
  id: string;
  name: string;
  subtitle: string; // e.g. "Bonapriso · 14:00 check-in"
  city: string;
  stars: number;
  roomsCount: number;
  status: HotelStatus;
  bookingsCount: number;
  createdDate: string;
};

// --- Shared booking enums ---

export type PassengerType = "adult" | "child";
export type BookingItemStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded"
  | "failed";
export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded"
  | "failed";
export type BookingType = "hotel" | "apartment" | "transport" | "mixed";
export type ItemType = "hotel_room" | "apartment" | "bus_ticket";
export type PaymentMethod = "momo" | "orange_money" | "poem_pay" | "visa";
export type PaymentStatus =
  | "initiated"
  | "pending"
  | "successful"
  | "failed"
  | "reversed";

export type ServiceType = "Hotel" | "Apartment" | "Transport";
export type ReviewStatus = "pending" | "active" | "suspended" | "rejected";

export type BookingGuest = {
  id: string;
  booking_item_id: string;
  full_name: string;
  phone_number: string;
  id_document_number: string;
  passenger_type: PassengerType;
  seat_number: string | null;
};

export type BookingItem = {
  id: string;
  booking_id: string;
  item_type: ItemType;
  item_id: string;
  provider_id: string;
  start_datetime: string;
  end_datetime: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: BookingItemStatus;
  guests: BookingGuest[];
};

export type Booking = {
  id: string;
  booking_reference: string;
  customer_id: string | null; // exactly one of customer_id / guest_customer_id is set, never both
  guest_customer_id: string | null;
  booking_type: BookingType;
  booking_status: BookingStatus;
  total_amount: number;
  discount_amount: number;
  cancellation_fee: number;
  final_amount: number;
  currency: string;
  created_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
  items: BookingItem[];
};

export type Payment = {
  id: string;
  booking_id: string;
  payment_reference: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  amount: number;
  currency: string;
  provider_transaction_id: string;
  paid_at: string | null;
  created_at: string;
};

// --- Users ---

export type UserType =
  | "guest"
  | "customer"
  | "provider"
  | "admin"
  | "super_admin";
export type UserStatus = "active" | "suspended" | "pending" | "deleted";

export type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string | null;
  password_hash: string | null; // null for guest users, who never authenticate
  user_type: UserType;
  status: UserStatus;
  preferred_language: string; // default 'fr'
  created_at: string;
  updated_at: string;
};

// ---provider ---

export type providerData = {
  business_name: string;
  registration_number: string;
  phone_number: string;
  email: string;
  city_id: string;
  address: string;
  verification_status: string;
  created_at: string;
};

type BookingItemBase = {
  id: string;
  booking_id: string;
  provider_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: BookingItemStatus;
  created_at: string;
};

export type HotelBookingItem = BookingItemBase & {
  item_type: "hotel_room";
  item_id: string;
  hotel_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  nights: number;
  room_number: string | null; // assigned at check-in, may be null before then
  guest_count: number; // how many people, distinct from `quantity` (rooms booked)
};

export type ApartmentBookingItem = BookingItemBase & {
  item_type: "apartment";
  item_id: string; // FK to the specific apartment
  apartment_name: string;
  location: string;
  check_in_date: string;
  check_out_date: string;
  nights: number;
};

export type BusBookingItem = BookingItemBase & {
  item_type: "bus_ticket";
  item_id: string; // FK to the specific trip
  route_from: string;
  route_to: string;
  departure_datetime: string;
  arrival_datetime: string;
  seat_number: string | null;
};

export type AnyBookingItem =
  | HotelBookingItem
  | ApartmentBookingItem
  | BusBookingItem;

export type HotelBookingItemWithRelations = HotelBookingItem & {
  booking_reference: string;
  booking_status: BookingStatus;
  customer: UserData;
  payment: Payment;
};

// --- reviews ---

export type Review = {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  service_type: ServiceType;
  rating: number;
  comment: string;
  review_status: ReviewStatus;
  created_at: string;
};

export type ReviewResponse = {
  id: string;
  review_id: string;
  provider_id: string;
  response_text: string;
  created_at: string;
};

export type ReviewWithRelations = Review & {
  customer: UserData;
  provider: providerData;
  response: ReviewResponse | null;
};

/* Settings page ------------------------------------------------------------------------------- */
export type SettingsTab =
  | "business-profile"
  | "security"
  | "notifications"
  | "payment-methods"
  | "audit-logs";

export type TwoFAMethod = "email" | "sms" | "whatsapp";
export type NotificationChannel = "email" | "sms" | "whatsapp";
export type SettlementMethod = "poem_pay" | "bank_transfer" | "mobile_money";

export type BusinessProfileForm = {
  legalName: string;
  registrationNumber: string;
  corporateAddress: string;
};

export type PasswordForm = {
  currentPassword: string;
  newPassword: string;
};

export type BankTransferForm = {
  bankName: string;
  accountNumber: string;
};

export type MobileMoneyForm = {
  provider: string;
  registeredNumber: string;
};

export type ActiveSession = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
};

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  action: string;
  entityAffected: string;
  userName: string;
  userAvatarUrl?: string;
};

/* Staffs Page ---------------------------------------------------- */

export type StaffRole =
  | "Owner"
  | "Manager"
  | "Accountant"
  | "Receptionist"
  | "Housekeeping";
export type StaffStatus = "Active" | "Inactive";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  department: string;
  status: "Active" | "Inactive";
  onDuty: boolean;
  avatarUrl?: string;
};

export type GuestCustomer = {
  id: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  id_document_type: string | null;
  id_document_number: string | null;
  created_at: string;
};

export type ApartmentPayment = {
  id: string;
  booking_id: string;
  payment_reference: string;
  payment_method: "momo" | "orange_money" | "poem_pay" | "visa";
  payment_status:
    | "initiated"
    | "pending"
    | "successful"
    | "failed"
    | "reversed";
  amount: number;
  currency: string;
  provider_transaction_id: string;
  paid_at: string | null;
  created_at: string;
};

export type ApartmentRefund = {
  id: string;
  booking_id: string;
  payment_id: string;
  refund_reference: string;
  refund_reason: string;
  original_amount: number;
  cancellation_fee: number;
  refund_amount: number;
  refund_status:
    | "requested"
    | "approved"
    | "processing"
    | "completed"
    | "rejected";
  processed_at: string | null;
};

export type ApartmentBookingItemWithRelations = {
  id: string;
  booking_id: string;
  provider_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  item_type: "apartment";
  item_id: string;

  apartment_name: string;
  apartment_type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;

  check_in_date: string;
  check_out_date: string;
  nights: number;
  guest_count: number;

  booking_reference: string;
  booking_status:
    | "pending_payment"
    | "confirmed"
    | "cancelled"
    | "completed"
    | "refunded"
    | "failed";
  cancellation_fee: number | null; // only set once a booking is cancelled
  created_at: string;

  // Exactly ONE of these two is ever non-null on a real record — both
  // are typed nullable here specifically so the mock data below can
  // demonstrate both cases side by side.
  customer: UserData | null;
  guestCustomer: GuestCustomer | null;

  payment: ApartmentPayment;
};
