"use client";

import Link from "next/link";
import { BedDouble, CalendarDays, ArrowRight } from "lucide-react";
import { mockRooms } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { Card } from "../providerui/card";
import { RoomStatusBadge } from "../providerui/statusBadge";

function AvailabilityGrid() {
  const rooms = mockRooms;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">
          Create / Update Availability
        </h1>
        <p className="text-sm text-slate-500">
          Select a room to manage its availability calendar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden p-0">
            {/* Photo placeholder — no real images yet */}
            <div className="relative h-32 bg-slate-200">
              <div className="absolute right-3 top-3">
                <RoomStatusBadge status={room.status} />
              </div>
              <div className="absolute -bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-500 shadow-sm">
                <BedDouble size={16} />
              </div>
            </div>

            <div className="p-4 pt-6">
              <h3 className="text-sm font-semibold text-slate-900">
                {room.name}
              </h3>
              <p className="mb-3 text-xs text-slate-500">
                {room.type} · {formatCurrency(room.pricePerNight)}
              </p>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={13} />
                  {room.occupied}/{room.totalUnits} available
                </span>
                <Link
                  href={`/hotel/availability/${room.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600"
                >
                  Manage
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AvailabilityGrid;
