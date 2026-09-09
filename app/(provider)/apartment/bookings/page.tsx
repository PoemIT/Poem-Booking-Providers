import { ApartmentBookingsTable } from "@/components/apartment/booking/apartmentBookingCards";
import { mockApartmentBookings, mockApartmentItem } from "@/lib/mock-data";
import React from "react";

function Booking() {
  return (
    <div>
      <ApartmentBookingsTable bookings={mockApartmentBookings} />
    </div>
  );
}

export default Booking;
