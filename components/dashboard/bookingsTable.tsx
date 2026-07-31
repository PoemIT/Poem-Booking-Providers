import {
  RotateCcw,
  Filter,
  ArrowUpDown,
  Download,
  Eye,
  SquarePen,
  BedDouble,
  Bus,
  DoorOpen,
  Plane,
  Users,
  Car,
  Smartphone,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { formatDate, getAvatarColor, getInitials } from "@/lib/format";
import type { Booking } from "@/lib/types";
import { Card } from "../providerui/card";
import { StatusBadge, StatusBadgeButton } from "../providerui/statusBadge";

const serviceIcons: Record<string, LucideIcon> = {
  "Hotel Room": BedDouble,
  "Suite Deluxe": DoorOpen,
  "Shuttle Bus": Bus,
  "Airport Transfer": Plane,
  "Conference Room": Users,
  "Private Car": Car,
};

// Which icon to show per payment method.
const paymentIcons: Record<string, LucideIcon> = {
  "Mobile Money": Smartphone,
  "Orange Money": User,
  "MTN MoMo": Smartphone,
  "POEM Pay": Wallet,
};

type BookingsTableProps = {
  bookings: Booking[];
  totalCount: number;
};

export function BookingsTable({ bookings, totalCount }: BookingsTableProps) {
  return (
    <Card className="p-0">
      {/* Header row: title + count badge, then Filter/Sort/Export buttons */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-orange-500" />
          <h2 className="text-base font-semibold text-slate-900">
            Recent Bookings
          </h2>
          <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600">
            {totalCount} bookings
          </span>
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Booking Ref</th>
              <th className="px-5 py-3 font-medium">Customer Name</th>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Amount (XAF)</th>
              <th className="px-5 py-3 font-medium">Payment Method</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => {
              const ServiceIcon = serviceIcons[booking.service] ?? BedDouble;
              const PaymentIcon = paymentIcons[booking.paymentMethod] ?? Wallet;

              return (
                <tr
                  key={booking.id}
                  className={i % 2 === 1 ? "bg-slate-50/60" : ""}
                >
                  <td className="px-5 py-3  text-black/80 font-bold">
                    {booking.bookingRef}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(
                          booking.customerName,
                        )}`}
                      >
                        {getInitials(booking.customerName)}
                      </span>
                      <span className="font-medium text-slate-900">
                        {booking.customerName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <ServiceIcon
                        size={28}
                        className="text-orange-400 bg-orange-100 p-1.5 rounded-md"
                      />
                      {booking.service}
                    </div>
                  </td>

                  <td className="px-5 py-3 text-slate-500">
                    {formatDate(booking.date)}
                  </td>

                  <td className="px-5 py-3 flex items-center justify-center">
                    <StatusBadgeButton status={booking.status} />
                  </td>

                  <td className="px-5 py-3 font-medium text-slate-900 ">
                    {booking.amount.toLocaleString("en-US")}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center  gap-1.5 text-slate-500 p-2 bg-gray-50 rounded-md">
                      <PaymentIcon size={14} />
                      {booking.paymentMethod}
                    </div>
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
    </Card>
  );
}
