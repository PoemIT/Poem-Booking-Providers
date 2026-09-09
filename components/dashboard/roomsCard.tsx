// components/roomsCard.tsx
//
// Room Management page: 4 simple stat boxes, then the room types table.
// Filter/Export/pagination buttons are visual only for now — no real
// filtering or page-switching logic yet, since there's no backend.

"use client";

import {
  BedDouble,
  Users,
  CircleCheck,
  Wallet,
  Plus,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  DoorOpen,
} from "lucide-react";
import { mockRoomStats, mockRoomTypes } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import type { RoomTypeStatus } from "@/lib/mock-data";
import { Card } from "../providerui/card";
import Link from "next/link";

// Room TYPE statuses are only "active" | "inactive" — a different, smaller
// set than the general RoomStatus enum ("maintenance" doesn't apply to a
// category, only to a physical room), so this gets its own small badge
// instead of reusing that one.
const statusStyles: Record<RoomTypeStatus, string> = {
  active: "bg-green-50 text-green-700",
  inactive: "bg-slate-100 text-slate-500",
};

const statusLabels: Record<RoomTypeStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};

function RoomTypeStatusBadge({ status }: { status: RoomTypeStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function RoomsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-20 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-300">
        <BedDouble size={22} />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        No room types yet
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Start by adding your first room type to begin accepting bookings.
      </p>
      <Link href="/hotel/rooms/new">
        <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
          <Plus size={16} />
          Add Room Type
        </button>
      </Link>
    </div>
  );
}

function RoomsCard() {
  const stats = mockRoomStats;
  const roomTypes = mockRoomTypes;

  return (
    <div>
      {/* Header — stays the same whether room types exist or not */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Room Management</h1>
          <p className="text-sm text-slate-500">
            Manage all room types across your property.
          </p>
        </div>
        <Link href="/hotel/rooms/new">
          <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
            <Plus size={16} />
            Add Room Type
          </button>
        </Link>
      </div>

      {/* EMPTY STATE — replaces everything below the header when there are no room types */}
      {roomTypes.length === 0 ? (
        <RoomsEmptyState />
      ) : (
        <>
          {/* Stat boxes */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <BedDouble size={18} />
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {stats.totalRooms}
              </p>
              <p className="text-xs text-slate-500">Total Rooms</p>
            </Card>
            <Card>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <Users size={18} />
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {stats.occupiedToday}
              </p>
              <p className="text-xs text-slate-500">Occupied Today</p>
            </Card>
            <Card>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <CircleCheck size={18} />
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {stats.availableNow}
              </p>
              <p className="text-xs text-slate-500">Available Now</p>
            </Card>
            <Card>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <Wallet size={18} />
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {formatCurrency(stats.revenueThisMonth)}
              </p>
              <p className="text-xs text-slate-500">Revenue This Month (XAF)</p>
            </Card>
          </div>

          {/* All Room Types table */}
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  All Room Types
                </h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  {roomTypes.length} room types
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  <Filter size={14} />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <Download size={14} />
                  Export CSV
                </button>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400 bg-slate-100 rounded-md">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Date Created</th>
                  <th className="px-5 py-3 font-medium">Price / Night</th>
                  <th className="px-5 py-3 font-medium">Rooms</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomTypes.map((roomType) => (
                  <tr
                    key={roomType.id}
                    className="border-x border-b border-slate-200 last:border-0 rounded-md"
                  >
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {roomType.name}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(roomType.created_at)}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {formatCurrency(roomType.base_price, roomType.currency)}
                    </td>

                    {/* This is the new part — instead of just showing the
                        count, it's a link into the individual physical
                        rooms that belong to this room type. */}
                    <td className="px-5 py-4">
                      <Link
                        href={`/hotel/room-types/${roomType.id}/rooms`}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-orange-600"
                      >
                        <DoorOpen size={14} className="text-slate-400" />
                        {roomType.total_rooms} rooms
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <RoomTypeStatusBadge status={roomType.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Link
                          href={`/hotel/room-types/${roomType.id}`}
                          className="hover:text-slate-700"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/hotel/room-types/${roomType.id}/edit`}
                          className="hover:text-slate-700"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button className="hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
}

export default RoomsCard;
