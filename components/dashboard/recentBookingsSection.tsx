import { mockRecentBookings, mockTotalBookingsCount } from "@/lib/mock-data";
import { BookingsTable } from "./bookingsTable";

export function RecentBookingsSection() {
  return (
    <BookingsTable
      bookings={mockRecentBookings}
      totalCount={mockTotalBookingsCount}
    />
  );
}
