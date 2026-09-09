// components/hotelsPage.tsx
//
// Multi-property list — for a provider managing several hotels.
// Search, filters, and pagination are visual only for now (no real
// filtering/page-switching logic), since there's no backend yet.

"use client";

import {
  Star,
  Eye,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
} from "lucide-react";
import { mockHotels } from "@/lib/mock-data";
import type { HotelStatus } from "@/lib/types";
import { Card } from "@/components/providerui/card";
import Link from "next/link";

const statusStyles: Record<HotelStatus, string> = {
  active: "bg-green-50 text-green-700",
  pending: "bg-orange-50 text-orange-700",
};

const statusLabels: Record<HotelStatus, string> = {
  active: "Active",
  pending: "Pending",
};

function HotelStatusBadge({ status }: { status: HotelStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 text-orange-400">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function HotelsPage() {
  const hotels = mockHotels;
  const totalRooms = hotels.reduce((sum, hotel) => sum + hotel.roomsCount, 0);
  const pendingCount = hotels.filter(
    (hotel) => hotel.status === "pending",
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Hotels</h1>
          <p className="text-sm text-slate-500">
            {hotels.length} hotels · {totalRooms} room types · {pendingCount}{" "}
            pending approval
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <Upload size={14} />
            Import from CSV
          </button>
          <Link href="/hotel/hotels/new">
            <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              <Plus size={16} />
              Create hotel
            </button>
          </Link>
        </div>
      </div>

      <Card className="p-0">
        {/* Search + filters */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
          <div className="flex flex-1 items-center gap-3">
            <input
              type="text"
              placeholder="Search hotel name..."
              className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Status: Active
              <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
              City: Douala
              <ChevronDown size={13} />
            </button>
          </div>
          <span className="shrink-0 text-xs text-slate-400">
            {hotels.length} of {hotels.length} shown
          </span>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Hotel</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Stars</th>
              <th className="px-5 py-3 font-medium">Rooms</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Bookings</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr
                key={hotel.id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{hotel.name}</p>
                  <p className="text-xs text-slate-400">{hotel.subtitle}</p>
                </td>
                <td className="px-5 py-4 text-slate-500">{hotel.city}</td>
                <td className="px-5 py-4">
                  <StarRating count={hotel.stars} />
                </td>
                <td className="px-5 py-4 text-slate-500">{hotel.roomsCount}</td>
                <td className="px-5 py-4">
                  <HotelStatusBadge status={hotel.status} />
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {hotel.bookingsCount}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {hotel.createdDate}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3 text-slate-400">
                    <button className="hover:text-slate-700">
                      <Eye size={15} />
                    </button>
                    <button className="hover:text-red-500">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination — visual only, no real page-switching logic yet */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <p className="text-xs text-slate-500">
            Showing 1–{hotels.length} of {hotels.length}
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={14} />
            </button>
            <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HotelsPage;
