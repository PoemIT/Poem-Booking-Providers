import { mockRoomPerformance } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { Card } from "../providerui/card";
import Link from "next/link";
import type { RoomTypeStatus } from "@/lib/mock-data";

const statusStyles: Record<RoomTypeStatus, string> = {
  active: "bg-green-50 text-green-700",
  inactive: "bg-slate-100 text-slate-500",
};

const statusLabels: Record<RoomTypeStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};

const singleRoomType = {
  id: "6f1c1a2e-9b3d-4e2a-8f61-1a2b3c4d5e01",
  hotel_id: "d3b2c1a0-4f5e-4a6b-9c7d-8e9f0a1b2c01",
  name: "Deluxe Suite",
  description: "Spacious suite with city view, king bed, and balcony.",
  max_adults: 2,
  max_children: 1,
  base_price: 45000,
  currency: "XAF",
  total_rooms: 15,
  status: "active" as const,

  amenities: ["Wi-Fi", "Air conditioning", "TV", "Mini bar", "Balcony"],

  // Matches the form's two separate upload fields: one main photo used
  // as the category's cover, plus additional gallery photos. Either can
  // be empty/null — a category might have a cover but no gallery yet,
  // or nothing uploaded at all.
  coverImage: "https://picsum.photos/seed/roomtype-1a/700/400" as string | null,
  gallery: [
    "https://picsum.photos/seed/roomtype-1b/500/350",
    "https://picsum.photos/seed/roomtype-1c/500/350",
    "https://picsum.photos/seed/roomtype-1d/500/350",
  ],

  created_at: "2026-01-12T09:30:00Z",
  updated_at: "2026-06-10T14:12:00Z",
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

function detailRows(roomType: typeof singleRoomType) {
  return [
    {
      label: "Max Adults",
      value: String(roomType.max_adults),
    },
    {
      label: "Max Children",
      value: String(roomType.max_children),
    },
    {
      label: "Base Price",
      value: `${formatCurrency(
        roomType.base_price,
        roomType.currency,
      )} / night`,
    },
    {
      label: "Total Rooms",
      value: String(roomType.total_rooms),
    },
    {
      label: "Amenities",
      value:
        roomType.amenities.length > 0
          ? roomType.amenities.join(", ")
          : "None listed",
    },
    {
      label: "Status",
      value: statusLabels[roomType.status],
    },
  ];
}

function ViewRoomType() {
  // Standing in for "the room type the user navigated to" until this
  // page is wired up to a real :id route param.
  const roomType = singleRoomType;
  const performance = mockRoomPerformance;
  const rows = detailRows(roomType);

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              {roomType.name}
            </h1>
            <RoomTypeStatusBadge status={roomType.status} />
          </div>
          <p className="text-sm text-slate-500">
            {roomType.description ?? "No description added yet."}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="flex-1">
          {/* Cover image — one large photo, separate from the gallery strip */}
          <div className=" grid grid-cols-2 gap-6">
            {roomType.coverImage ? (
              <div className="mb-3 h-48 overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={roomType.coverImage}
                  alt={`${roomType.name} cover`}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="mb-3 flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
                No cover photo uploaded yet
              </div>
            )}

            {/* Gallery — smaller thumbnails, separate from the cover photo */}
            {roomType.gallery.length > 0 ? (
              <div className="mb-6 grid grid-cols-3 gap-3">
                {roomType.gallery.map((src, index) => (
                  <div
                    key={index}
                    className="h-20 overflow-hidden rounded-lg border border-slate-200"
                  >
                    <img
                      src={src}
                      alt={`${roomType.name} gallery photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6 flex h-20 items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
                No gallery photos uploaded yet
              </div>
            )}
          </div>

          {/* Details card */}
          <Card className="p-0">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-4 ${
                  index !== rows.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="text-sm text-slate-500">{row.label}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {row.value}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* Right column */}
        <div className="w-full shrink-0 space-y-4 lg:w-72">
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              This Month
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Bookings</span>
                <span className="text-sm font-semibold text-slate-900">
                  {performance.bookingsThisMonth}
                </span>
              </div>
              {/*  <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Revenue</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatCurrency(performance.revenueThisMonth)}
                </span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Occupancy</span>
                <span className="text-sm font-semibold text-slate-900">
                  {performance.occupancyPercent}%
                </span>
              </div>
            </div>
          </Card>

          <Link href={`/hotel/room-types/${roomType.id}/edit`}>
            <button className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewRoomType;
