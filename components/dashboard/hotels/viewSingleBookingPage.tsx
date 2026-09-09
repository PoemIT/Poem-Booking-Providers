"use client";

import { mockHotelBookings } from "@/lib/mock-data";
import { PaymentMethod, PaymentStatus } from "@/lib/types";
import { ArrowLeft, Phone, Mail, User } from "lucide-react";

const paymentMethodLabels: Record<PaymentMethod, string> = {
  momo: "MTN Mobile Money",
  orange_money: "Orange Money",
  poem_pay: "POEM Pay",
  visa: "Visa",
};
const paymentStatusLabels: Record<PaymentStatus, string> = {
  initiated: "Initiated",
  pending: "Pending",
  successful: "Paid",
  failed: "Failed",
  reversed: "Reversed",
};

const bookingStatusStyles: Record<string, string> = {
  confirmed: "bg-green-50 text-green-700",
  pending_payment: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700",
  completed: "bg-blue-50 text-blue-700",
  refunded: "bg-slate-100 text-slate-500",
  failed: "bg-red-50 text-red-700",
};

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString("en-US")} ${currency === "XAF" ? "FCFA" : currency}`;
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ViewSingleBookingPage() {
  // TODO: pick the right booking by id once this page has routing
  // (e.g. /bookings/[id]) instead of always showing the first one.
  const booking = mockHotelBookings[0];
  const { customer, payment } = booking;

  const timelineEvents = [
    { label: "Payment initiated", date: payment.created_at, done: true },
    {
      label: "Payment confirmed",
      date: payment.paid_at,
      done: !!payment.paid_at,
    },
    {
      label: "Check-in",
      date: booking.check_in_date,
      done: false,
    },
    {
      label: "Check-out",
      date: booking.check_out_date,
      done: false,
    },
  ];

  return (
    <div>
      <button className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700">
        <ArrowLeft size={13} />
        Back to Bookings
      </button>

      {/* Header card */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              {booking.booking_reference}
            </h1>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${bookingStatusStyles[booking.booking_status]}`}
            >
              {booking.booking_status.replace("_", " ")}
            </span>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              {paymentStatusLabels[payment.payment_status]}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {booking.hotel_name} · {booking.room_type}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
            Refund
          </button>
          <button className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            Cancel booking
          </button>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Confirm
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Information */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field
                label="Name"
                icon={User}
                value={`${customer.first_name} ${customer.last_name}`}
              />
              <Field label="Email" icon={Mail} value={customer.email ?? "—"} />
              <Field label="Phone" icon={Phone} value={customer.phone_number} />
              <Field label="Customer ID" value={customer.id} />
              <Field label="Account" value={capitalize(customer.user_type)} />
              <Field label="Status" value={capitalize(customer.status)} />
            </div>
          </div>

          {/* Booking Information */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Booking Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Reference" value={booking.booking_reference} />
              <Field
                label="Status"
                value={capitalize(booking.booking_status)}
              />
              <Field label="Item status" value={capitalize(booking.status)} />
              <Field
                label="Check-in"
                value={formatDate(booking.check_in_date)}
              />
              <Field
                label="Check-out"
                value={formatDate(booking.check_out_date)}
              />
              <Field label="Nights" value={String(booking.nights)} />
            </div>
          </div>

          {/* Booked room */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Booked Room
            </h2>
            <div className="flex gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">
                Hotel photo
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <span className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-900">
                        {booking.hotel_name} — {booking.room_type}
                      </p>
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                        Hotel
                      </span>
                    </span>
                    {booking.room_number && (
                      <p className="text-xs text-slate-500">
                        Room {booking.room_number}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(booking.total_price, payment.currency)}
                  </p>
                </div>

                <div className="mt-2 flex gap-6 text-xs text-slate-500">
                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Check-in
                    </p>
                    {formatDate(booking.check_in_date)}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Check-out
                    </p>
                    {formatDate(booking.check_out_date)}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Nights
                    </p>
                    {booking.nights}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Quantity
                    </p>
                    {booking.quantity} room{booking.quantity > 1 ? "s" : ""}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Guests
                    </p>
                    {booking.guest_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Payment summary */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Payment summary
            </h2>
            <div className="space-y-2 text-sm">
              <Row
                label="Unit price"
                value={formatCurrency(booking.unit_price, payment.currency)}
              />
              <Row
                label="Total price"
                value={formatCurrency(booking.total_price, payment.currency)}
              />
              <Row label="Currency" value={`${payment.currency} (FCFA)`} />
              <Row
                label="Payment method"
                value={paymentMethodLabels[payment.payment_method]}
              />
              <Row
                label="Payment status"
                value={paymentStatusLabels[payment.payment_status]}
              />
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
              <span className="text-sm text-slate-500">Amount paid</span>
              <span className="text-lg font-bold text-slate-900">
                {formatCurrency(payment.amount, payment.currency)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Transaction {payment.provider_transaction_id}
            </p>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              Booking timeline
            </h2>
            <div className="relative space-y-5 pl-5">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />
              {timelineEvents.map((event) => (
                <div key={event.label} className="relative">
                  <span
                    className={`absolute -left-5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                      event.done
                        ? "bg-orange-500"
                        : "border-2 border-slate-300 bg-white"
                    }`}
                  />
                  <p
                    className={`text-sm font-medium ${event.done ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {event.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {event.date
                      ? event.done
                        ? formatDateTime(event.date)
                        : `Expected ${formatDate(event.date)}`
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof User;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
        {Icon && <Icon size={12} className="text-slate-400" />}
        {value}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`font-medium text-slate-900 ${valueClass ?? ""}`}>
        {value}
      </span>
    </div>
  );
}

export default ViewSingleBookingPage;
