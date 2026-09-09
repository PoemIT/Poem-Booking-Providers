"use client";

import {
  RotateCcw,
  Filter,
  ArrowUpDown,
  Download,
  Eye,
  SquarePen,
  Building2,
  Users,
  Smartphone,
  User as UserIcon,
  Wallet,
  LucideIcon,
  UserRound,
} from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getAvatarColor,
  getInitials,
} from "@/lib/format";
import { StatusBadgeButton } from "@/components/providerui/statusBadge";
import { Card } from "@/components/providerui/card";
import { useState } from "react";
import { ApartmentBookingItemWithRelations } from "@/lib/types";

const paymentIcons: Record<string, LucideIcon> = {
  momo: Smartphone,
  orange_money: UserIcon,
  poem_pay: Wallet,
  visa: Wallet,
};

type ApartmentBookingsTableProps = {
  bookings: ApartmentBookingItemWithRelations[];
};

function getCustomerDisplayName(booking: ApartmentBookingItemWithRelations) {
  if (booking.customer) {
    return `${booking.customer.first_name} ${booking.customer.last_name}`;
  }
  if (booking.guestCustomer) {
    return booking.guestCustomer.full_name;
  }
  return "Guest";
}

export function ApartmentBookingsTable({
  bookings,
}: ApartmentBookingsTableProps) {
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const occupiedToday = bookings.filter((b) => b.status === "confirmed").length;
  const refundedCancelled = bookings.filter((b) =>
    ["cancelled", "refunded", "failed"].includes(b.booking_status),
  ).length;
  const revenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((total, b) => total + b.total_price, 0);

  const totalPages = Math.max(1, Math.ceil(bookings.length / ITEMS_PER_PAGE));
  const paginatedBooking = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <Building2 size={18} />
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {bookings.length}
          </p>
          <p className="text-xs text-slate-500">Total Bookings</p>
        </Card>

        <Card>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <Users size={18} />
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {occupiedToday}
          </p>
          <p className="text-xs text-slate-500">Confirmed Stays</p>
        </Card>

        <Card>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <RotateCcw size={18} />
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {refundedCancelled}
          </p>
          <p className="text-xs text-slate-500">Refunded / Cancelled</p>
        </Card>

        <Card>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <Wallet size={18} />
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            {formatCurrency(revenue, "XAF")}
          </p>
          <p className="text-xs text-slate-500">Revenue</p>
        </Card>
      </div>

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <RotateCcw size={16} className="text-orange-500" />
            <h2 className="text-base font-semibold text-slate-900">
              All Bookings
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              <ArrowUpDown size={14} /> Sort
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Booking Ref</th>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Apartment</th>
                <th className="px-5 py-3 font-medium">Dates</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Amount (XAF)</th>
                <th className="px-5 py-3 font-medium">Payment Method</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooking.map((booking, i) => {
                const PaymentIcon = booking.payment
                  ? (paymentIcons[booking.payment.payment_method] ?? Wallet)
                  : Wallet;
                const customerName = getCustomerDisplayName(booking);
                const isGuest = !booking.customer && !!booking.guestCustomer;

                return (
                  <tr
                    key={booking.id}
                    className={i % 2 === 1 ? "bg-slate-50/60" : ""}
                  >
                    <td className="px-5 py-3 text-black/80 font-bold">
                      {booking.booking_reference}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(
                            customerName,
                          )}`}
                        >
                          {isGuest ? (
                            <UserRound size={14} />
                          ) : (
                            getInitials(customerName)
                          )}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">
                            {customerName}
                          </span>
                          {isGuest && (
                            <span className="text-[11px] text-slate-400">
                              Guest booking
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2
                          size={28}
                          className="shrink-0 text-orange-400 bg-orange-100 p-1.5 rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">
                            {booking.apartment_name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {booking.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3 text-slate-500">
                      <div className="flex flex-col">
                        <span>{formatDate(booking.check_in_date)}</span>
                        <span className="text-xs text-slate-400">
                          {booking.nights} night
                          {booking.nights === 1 ? "" : "s"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3 flex items-center justify-center">
                      <StatusBadgeButton status={booking.booking_status} />
                    </td>

                    <td className="px-5 py-3 font-medium text-slate-900">
                      {booking.total_price.toLocaleString("en-US")}
                      {booking.cancellation_fee != null && (
                        <p className="text-[11px] font-normal text-slate-400">
                          Fee:{" "}
                          {booking.cancellation_fee.toLocaleString("en-US")}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-3">
                      {booking.payment ? (
                        <div className="flex items-center gap-1.5 text-slate-500 p-2 bg-gray-50 rounded-md">
                          <PaymentIcon size={14} />
                          {booking.payment.payment_method}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No payment yet
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <Eye size={15} />
                        </button>
                        <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <SquarePen size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, bookings.length)} of{" "}
            {bookings.length} bookings
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-md text-sm ${
                    page === currentPage
                      ? "bg-orange-500 font-medium text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
