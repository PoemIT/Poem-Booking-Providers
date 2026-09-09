import { mockHotelBookings, mockTotalBookingsCount } from "@/lib/mock-data";
import { BookingsTable } from "./bookingsTable";

export function RecentBookingsSection() {
  return (
    <BookingsTable
      bookings={mockHotelBookings}
      totalCount={mockTotalBookingsCount}
    />
  );
}
