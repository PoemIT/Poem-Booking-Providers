"use client";

import { ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

const refundDetail = {
  refundRef: "REF-237-4102",
  guestName: "Cecile Mendomo",
  linkedPaymentRef: "PAY-237-9840",
  refundReason: "Double room booked accidentally for family weekend.",
  requestedDate: "2024-11-23",
  originalAmount: 180000,
  cancellationFeePercent: 10,
  cancellationFeeAmount: 18000,
  finalRefundAmount: 162000,
  currency: "XAF",
  ruleName: "48-72 hours cancellation rule",
  impliedFeeLabel: "Implied 10% fee",

  // What was actually cancelled — the booking this refund is tied to
  cancelledBooking: {
    bookingRef: "PB-2025-0142",
    hotelName: "Ocean View Hotel",
    roomType: "Standard Double Room",
    location: "Bonanjo, Douala",
    checkIn: "2024-11-28",
    checkOut: "2024-11-30",
    nights: 2,
    quantity: 1,
    pricePerNight: 90000,
  },
};

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ViewRefundPage() {
  const refund = refundDetail;

  function handleApprove() {
    // TODO: replace with a real API call once the backend exists
    console.log("refund approved:", refund.refundRef);
  }

  function handleReject() {
    // TODO: replace with a real API call once the backend exists
    console.log("refund rejected:", refund.refundRef);
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-1.5 text-sm">
        <Link
          href="/hotel/refunds"
          className="font-medium text-blue-600 underline hover:text-blue-700"
        >
          Refunds
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-500">{refund.refundRef}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Refund Metadata & Links */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-base font-bold text-slate-900">
              Refund Metadata &amp; Links
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Guest Name</span>
                <span className="font-semibold text-slate-900">
                  {refund.guestName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Linked Payment Ref</span>
                <Link
                  href={`/hotel/payments/${refund.linkedPaymentRef}`}
                  className="font-medium text-blue-600 underline hover:text-blue-700"
                >
                  {refund.linkedPaymentRef}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Refund Reason</span>
                <span className="max-w-[60%] text-right text-slate-700">
                  {refund.refundReason}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Requested Date</span>
                <span className="text-slate-700">
                  {formatDate(refund.requestedDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Cancelled Booking Details — what was actually cancelled */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-base font-bold text-slate-900">
              Cancelled Booking Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Booking Ref</span>
                <Link
                  href={`/hotel/bookings/${refund.cancelledBooking.bookingRef}`}
                  className="font-medium text-blue-600 underline hover:text-blue-700"
                >
                  {refund.cancelledBooking.bookingRef}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Hotel</span>
                <span className="text-right font-semibold text-slate-900">
                  {refund.cancelledBooking.hotelName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Room Type</span>
                <span className="text-slate-700">
                  {refund.cancelledBooking.roomType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-700">
                  {refund.cancelledBooking.location}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Check-in / Check-out</span>
                <span className="text-slate-700">
                  {formatDate(refund.cancelledBooking.checkIn)} →{" "}
                  {formatDate(refund.cancelledBooking.checkOut)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Nights / Rooms</span>
                <span className="text-slate-700">
                  {refund.cancelledBooking.nights} night
                  {refund.cancelledBooking.nights > 1 ? "s" : ""} ·{" "}
                  {refund.cancelledBooking.quantity} room
                  {refund.cancelledBooking.quantity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-slate-500">Price per Night</span>
                <span className="font-medium text-slate-900">
                  {formatCurrency(
                    refund.cancelledBooking.pricePerNight,
                    refund.currency,
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Calculated Payout Breakdown */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-base font-bold text-slate-900">
              Calculated Payout Breakdown
            </h2>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Original Amount Collected
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(refund.originalAmount, refund.currency)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-red-500">
                  Cancellation Fee Applied ({refund.cancellationFeePercent}%)
                </span>
                <span className="font-medium text-red-500">
                  -{" "}
                  {formatCurrency(
                    refund.cancellationFeeAmount,
                    refund.currency,
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-semibold text-slate-900">
                  Final Guest Refund Amount
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(refund.finalRefundAmount, refund.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-3 text-base font-bold text-slate-900">
            Hotel Manager Authorization
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            This request was automatically computed based on the{" "}
            <span className="font-semibold text-slate-700">
              &quot;{refund.ruleName}&quot;
            </span>{" "}
            ({refund.impliedFeeLabel}).
          </p>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <button
              onClick={handleApprove}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              <CheckCircle2 size={16} />
              Approve Payout
            </button>
            <button
              onClick={handleReject}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-white py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <XCircle size={16} />
              Reject Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRefundPage;
