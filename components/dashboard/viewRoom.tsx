// components/roomTypeRooms.tsx
//
// The individual physical rooms belonging to one room type (e.g. every
// actual "Room 201, 202, 203..." under "Deluxe Suite"). Room number and
// floor are set once and edited rarely — status is the field that
// changes constantly (housekeeping/maintenance), so it gets a quick
// inline dropdown right in the table instead of needing a separate edit
// screen just to flip a room to "maintenance" and back.

"use client";

import { useState } from "react";
import { ArrowLeft, Plus, DoorOpen } from "lucide-react";
import Link from "next/link";
import { mockHotelRooms, mockRoomTypes } from "@/lib/mock-data";
import type { HotelRoomStatus, HotelRoom } from "@/lib/mock-data";
import { Card } from "../providerui/card";
import type { NewHotelRoomOutput } from "@/lib/schemas/newHotelRoom";
import { AddRoomModal } from "./hotels/addRoomModal";

const statusStyles: Record<HotelRoomStatus, string> = {
  operational: "bg-green-50 text-green-700",
  maintenance: "bg-amber-50 text-amber-700",
  out_of_service: "bg-red-50 text-red-700",
};

const statusLabels: Record<HotelRoomStatus, string> = {
  operational: "Operational",
  maintenance: "Maintenance",
  out_of_service: "Out of Service",
};

function RoomTypeRooms() {
  // Standing in for a real :roomTypeId route param until this page is
  // wired up to routing.
  const roomType = mockRoomTypes[0]; // "Deluxe Suite"

  // Local list state so a newly-added room actually shows up in the
  // table right away — this only affects what's shown on screen, it
  // doesn't persist anywhere until a real API call replaces this.
  const [rooms, setRooms] = useState<HotelRoom[]>(
    mockHotelRooms.filter((room) => room.room_type_id === roomType.id),
  );

  const [modalOpen, setModalOpen] = useState(false);

  function handleAddRoom(values: NewHotelRoomOutput) {
    const newRoom: HotelRoom = {
      id: crypto.randomUUID(),
      hotel_id: roomType.hotel_id,
      room_type_id: roomType.id,
      room_number: values.room_number,
      floor: values.floor ?? null,
      status: values.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setRooms((prev) => [...prev, newRoom]);
  }

  // Updates a single room's status directly inside the rooms array —
  // this only updates what's shown on screen, it doesn't persist
  // anywhere until a real API call replaces this.
  function handleStatusChange(roomId: string, newStatus: HotelRoomStatus) {
    // TODO: replace with a real API call once the backend exists
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room,
      ),
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link
            href={`/hotel/room-types/${roomType.id}`}
            className="mb-2 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft size={13} />
            Back to {roomType.name}
          </Link>
          <h1 className="text-xl font-bold text-slate-900">
            Rooms — {roomType.name}
          </h1>
          <p className="text-sm text-slate-500">
            {rooms.length} physical rooms under this category.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} />
          Add Room
        </button>
      </div>

      <Card className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Room Number</th>
              <th className="px-5 py-3 font-medium">Floor</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2 font-medium text-slate-900">
                    <DoorOpen size={14} className="text-slate-400" />
                    {room.room_number}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {room.floor !== null ? `Floor ${room.floor}` : "—"}
                </td>
                <td className="px-5 py-4">
                  {/* Quick inline status change — this is the field that
                      actually changes often, unlike room type or room number */}
                  <select
                    value={room.status}
                    onChange={(e) =>
                      handleStatusChange(
                        room.id,
                        e.target.value as HotelRoomStatus,
                      )
                    }
                    className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-200 ${
                      statusStyles[room.status]
                    }`}
                  >
                    <option value="operational">Operational</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="out_of_service">Out of Service</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-slate-400">
                  <button className="hover:text-red-500">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddRoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddRoom}
      />
    </div>
  );
}

export default RoomTypeRooms;
