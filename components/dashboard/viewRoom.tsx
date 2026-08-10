import { mockRoomDetail, mockRoomPerformance } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { Card } from "../providerui/card";
import Link from "next/link";

const detailRows = (room: typeof mockRoomDetail) => [
  { label: "Type", value: room.type },
  { label: "Max Occupancy", value: room.maxOccupancy },
  { label: "Bed Type", value: room.bedType },
  { label: "Location", value: room.location },
  { label: "Weekend Price", value: `${formatCurrency(room.weekendPrice)}` },
  { label: "Amenities", value: room.amenities },
  {
    label: "Status",
    value: room.status.charAt(0).toUpperCase() + room.status.slice(1),
  },
];

const photos = ["./hotel1.jfif", "./hotel2.jfif", "./hotel2.jfif"];

function ViewRoom() {
  const room = mockRoomDetail;
  const performance = mockRoomPerformance;
  const rows = detailRows(room);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">{room.name}</h1>
        <p className="text-sm text-slate-500">{room.description}</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="flex-1">
          {/* Photo strip — placeholders until real image upload exists */}
          <div className="mb-6 grid grid-cols-5 gap-3">
            {photos.map((i) => (
              <div
                key={i}
                className="h-24 w-36 shrink-0 overflow-hidden rounded-lg border-2 border-amber-500 "
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img src={i} alt="profile" className="h-full w-full" />
                </div>
              </div>
            ))}
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Revenue</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatCurrency(performance.revenueThisMonth)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Occupancy</span>
                <span className="text-sm font-semibold text-slate-900">
                  {performance.occupancyPercent}%
                </span>
              </div>
            </div>
          </Card>

          <Link href="/hotel/rooms/edit">
            <button className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewRoom;
