// components/singleAvailability.tsx
//
// One room's monthly availability calendar + a sidebar form to update
// a specific date range's status/price. The form here uses plain
// useState instead of react-hook-form + zod — this is a simpler,
// single-purpose utility form (not a multi-field validated form like
// Create Room), so the lighter approach is enough.

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { generateCalendarGrid, monthNames } from "@/lib/calendar";
import {
  mockAvailabilityByDay,
  mockAvailabilitySummary,
  mockRoomDetail,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import type { DayAvailability, DayAvailabilityStatus } from "@/lib/types";
import { RoomStatusBadge } from "../providerui/statusBadge";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const legendItems: {
  status: DayAvailabilityStatus;
  label: string;
  dotClass: string;
}[] = [
  { status: "available", label: "Available", dotClass: "bg-green-200" },
  { status: "booked", label: "Booked", dotClass: "bg-red-200" },
  { status: "unavailable", label: "Unavailable", dotClass: "bg-orange-100" },
  { status: "other", label: "Past / Other", dotClass: "bg-slate-100" },
];

const dayCellStyles: Record<DayAvailabilityStatus, string> = {
  available: "border-green-200 bg-green-50",
  booked: "border-red-200 bg-red-50",
  unavailable: "border-orange-100 bg-orange-50/60",
  other: "border-slate-100 bg-white",
};

function SingleAvailability() {
  const room = mockRoomDetail;
  const summary = mockAvailabilitySummary;

  // 2026, month index 7 = August. In a real app this would come from
  // the URL or be driven by the < > buttons — kept fixed here since
  // there's no routing/state wired to it yet.
  const [year] = useState(2026);
  const [monthIndex] = useState(7);

  const grid = generateCalendarGrid(year, monthIndex);

  // Sidebar form state — plain useState, not react-hook-form, since
  // this is a single simple action, not a big validated form.
  const [checkInDate, setCheckInDate] = useState("2026-08-12");
  const [checkOutDate, setCheckOutDate] = useState("2026-08-14");
  const [status, setStatus] = useState("blocked-maintenance");
  const [priceOverride, setPriceOverride] = useState(String(room.weekendPrice));

  function handleUpdateAvailability() {
    // TODO: replace with a real API call once the backend exists
    console.log("update availability:", {
      checkInDate,
      checkOutDate,
      status,
      priceOverride,
    });
  }

  function getDayInfo(day: number, isCurrentMonth: boolean): DayAvailability {
    if (!isCurrentMonth) return { status: "other" };
    return (
      mockAvailabilityByDay[day] ?? {
        status: "available",
        availableCount: 12,
        totalCount: 15,
      }
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{room.name}</h1>
            <RoomStatusBadge status={room.status} />
          </div>
          <p className="text-sm text-slate-500">
            {room.type} · {formatCurrency(room.weekendPrice)} / night
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <ArrowLeft size={14} />
          Back to Rooms
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Calendar */}
        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              {monthNames[monthIndex]} {year}
            </h2>
            <div className="flex gap-1">
              <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                <ChevronLeft size={16} />
              </button>
              <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            {legendItems.map((item) => (
              <span
                key={item.status}
                className="flex items-center gap-1.5 text-xs text-slate-500"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
                {item.label}
              </span>
            ))}
          </div>

          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 gap-2">
            {weekdayLabels.map((label) => (
              <div
                key={label}
                className="text-center text-xs font-medium text-slate-400"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-2">
            {grid.map((cell, index) => {
              const info = getDayInfo(cell.date, cell.isCurrentMonth);

              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={index}
                    className="h-20 rounded-lg border border-slate-100 p-2 text-xs text-slate-300"
                  >
                    {cell.date}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`h-20 rounded-lg border p-2 text-xs ${dayCellStyles[info.status]}`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-slate-700">
                      {cell.date}
                    </span>
                    {info.status === "available" && (
                      <span className="rounded bg-green-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                        OPEN
                      </span>
                    )}
                    {info.status === "booked" && (
                      <span className="rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                        BOOKED
                      </span>
                    )}
                  </div>

                  {info.status === "available" && (
                    <div className="text-green-700">
                      <p className="font-medium">Available</p>
                      <p className="text-[10px] text-green-600">
                        {info.availableCount}/{info.totalCount} open
                      </p>
                    </div>
                  )}
                  {info.status === "booked" && (
                    <div className="text-red-700">
                      <p className="font-medium">{info.bookedBy}</p>
                      <p className="text-[10px] text-red-500">
                        {formatCurrency(info.amount ?? 0)}
                      </p>
                    </div>
                  )}
                  {info.status === "unavailable" && (
                    <p className="font-medium text-orange-600">Unavailable</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Set Availability
            </h3>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                >
                  <option value="open">Open</option>
                  <option value="blocked-maintenance">
                    Blocked (Maintenance)
                  </option>
                  <option value="blocked-other">Blocked (Other)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Price Override (XAF/night)
                </label>
                <input
                  type="text"
                  value={priceOverride}
                  onChange={(e) => setPriceOverride(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <button
                onClick={handleUpdateAvailability}
                className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
              >
                Update Availability
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              {monthNames[monthIndex]} Summary
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Available rooms</span>
                <span className="text-sm font-semibold text-green-600">
                  {summary.availableRooms}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Booked nights</span>
                <span className="text-sm font-semibold text-red-500">
                  {summary.bookedNightsLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Blocked nights</span>
                <span className="text-sm font-semibold text-slate-700">
                  {summary.blockedNightsLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Occupancy Rate</span>
                <span className="text-sm font-semibold text-orange-600">
                  {summary.occupancyRatePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAvailability;
