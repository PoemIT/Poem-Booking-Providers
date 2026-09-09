import { BookingsPageTable } from "@/components/dashboard/hotels/bookingPageCard";
import { mockHotelBookings } from "@/lib/mock-data";

function BookingPage() {
  return (
    <div>
      <BookingsPageTable bookings={mockHotelBookings} />
    </div>
  );
}

export default BookingPage;
