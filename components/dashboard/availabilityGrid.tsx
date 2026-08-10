"use client";
import Link from "next/link";
import { BedDouble, CalendarDays, ArrowRight } from "lucide-react";
import { mockRooms } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { Card, CardBorder } from "../providerui/card";
import { RoomStatusBadge } from "../providerui/statusBadge";

const photos = [
  "/hotel1.jfif",
  "/hotel2.jfif",
  "/hotel3.jfif",
  "/hotel3.jfif",
  "/hotel3.jfif",
];

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
        {rooms.map((room, index) => {
          const photo = photos[index % photos.length];
          return (
            <CardBorder key={room.id} className="overflow-hidden p-0">
              {/* Photo only — no overlays on top of it */}
              <div className="h-32 w-full bg-slate-200">
                <img
                  src={photo}
                  alt={room.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Icon + status row, sits below the photo in normal flow */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                    <BedDouble size={18} />
                  </div>
                  <RoomStatusBadge status={room.status} />
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                  {room.name}
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  {room.type} · {formatCurrency(room.pricePerNight)}
                </p>

                {/* Divider between price and availability row */}
                <div className="mb-3 border-t border-slate-100" />

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
            </CardBorder>
          );
        })}
      </div>
    </div>
  );
}

export default AvailabilityGrid;
