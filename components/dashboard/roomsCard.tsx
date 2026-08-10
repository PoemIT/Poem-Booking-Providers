// components/roomsCard.tsx
//
// Room Management page: 4 simple stat boxes, then the rooms table.
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
  EyeIcon,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import { mockRoomStats, mockRooms } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import type { RoomStatus } from "@/lib/types";
import { Card } from "../providerui/card";
import Link from "next/link";

const statusStyles: Record<RoomStatus, string> = {
  active: "bg-green-50 text-green-700",
  maintenance: "bg-amber-50 text-amber-700",
  inactive: "bg-red-50 text-red-700",
};

const statusLabels: Record<RoomStatus, string> = {
  active: "Active",
  maintenance: "Maintenance",
  inactive: "Inactive",
};

function RoomStatusBadge({ status }: { status: RoomStatus }) {
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
        No rooms yet
      </h3>
      <p className="mb-5 text-sm text-slate-500">
        Start by adding your first room to begin accepting bookings.
      </p>
      <Link href="/hotel/rooms/new">
        <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
          <Plus size={16} />
          Add Room
        </button>
      </Link>
    </div>
  );
}

function RoomsCard() {
  const stats = mockRoomStats;
  const rooms = mockRooms;

  return (
    <div>
      {/* Header — stays the same whether rooms exist or not */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Room Management</h1>
          <p className="text-sm text-slate-500">
            Manage all rooms across your property.
          </p>
        </div>
        <Link href="/hotel/rooms/new">
          <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
            <Plus size={16} />
            Add Room
          </button>
        </Link>
      </div>

      {/* EMPTY STATE — replaces everything below the header when there are no rooms */}
      {rooms.length === 0 ? (
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

          {/* All Rooms table */}
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  All Rooms
                </h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  {rooms.length} rooms
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
                  <th className="px-5 py-3 font-medium">Room</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Price / Night</th>
                  <th className="px-5 py-3 font-medium">Availability</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-x border-b border-slate-200 last:border-0 rounded-md"
                  >
                    <td className="px-5 py-4 font-bold text-slate-900 ">
                      {room.name}
                    </td>
                    <td className="px-5 py-4 text-slate-500">{room.type}</td>
                    <td className="px-5 py-4 font-bold text-slate-900 ">
                      {formatCurrency(room.pricePerNight)}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {room.occupied}/{room.totalUnits}
                    </td>
                    <td className="px-5 py-4">
                      <RoomStatusBadge status={room.status} />
                    </td>
                    <td className="px-5 py-4 text-right text-slate-400 flex gap-2  ">
                      <EyeIcon size={18} />
                      <Edit2Icon size={18} />
                      <Trash2Icon size={18} />
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
