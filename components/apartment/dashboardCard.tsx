"use client";

import { useState } from "react";
import {
  Calendar,
  BedDouble,
  Wallet,
  Undo2,
  Plus,
  RefreshCw,
  ClipboardList,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

// ----------------------------- Types -----------------------------

type UnitAvailability = {
  available: number;
  total: number;
  isMostlyOccupied: boolean;
};

type ApartmentUnit = {
  id: string;
  name: string;
  availability: UnitAvailability;
  tags: string[];
  fromPricePerNight: number;
};

type RevenueDay = {
  label: string;
  value: number;
};

type ActivityItem = {
  id: string;
  message: string;
  guestName: string;
  timeAgo: string;
};

// ----------------------------- Mock data -----------------------------

const units: ApartmentUnit[] = [
  {
    id: "studio-suite",
    name: "Studio Suite",

    availability: { available: 3, total: 4, isMostlyOccupied: false },
    tags: ["Studio · 1 Bath", "Furnished", "AC"],
    fromPricePerNight: 45000,
  },
  {
    id: "executive-1br",
    name: "Executive 1BR",
    availability: { available: 7, total: 10, isMostlyOccupied: false },
    tags: ["1 Bed · 1 Bath", "Furnished", "Balcony"],
    fromPricePerNight: 65000,
  },
  {
    id: "luxury-2br",
    name: "Luxury 2BR",
    availability: { available: 6, total: 8, isMostlyOccupied: true },
    tags: ["2 Bed · 2 Bath", "Full Kitchen", "Balcony"],
    fromPricePerNight: 110000,
  },
  {
    id: "penthouse-suite",
    name: "Penthouse Suite",
    availability: { available: 1, total: 2, isMostlyOccupied: false },
    tags: ["3 Bed · 3 Bath", "Sea View", "Private Lift"],
    fromPricePerNight: 185000,
  },
];

const revenueTrend: RevenueDay[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 55 },
  { label: "Wed", value: 95 },
  { label: "Thu", value: 40 },
  { label: "Fri", value: 60 },
  { label: "Sat", value: 70 },
  { label: "Sun", value: 50 },
];

const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    message: "Booking confirmed for Room 204",
    guestName: "John Doe",
    timeAgo: "10 mins ago",
  },
  {
    id: "a2",
    message: "Refund processed for Booking #BK-9921",
    guestName: "Aicha Njoya",
    timeAgo: "42 mins ago",
  },
  {
    id: "a3",
    message: "New review posted for Luxury 2BR",
    guestName: "Marcus Rivera",
    timeAgo: "1 hour ago",
  },
];

// ----------------------------- Main component -----------------------------

export default function ApartmentDashboard() {
  const [selectedDay, setSelectedDay] = useState("Wed");

  const totalUnits = units.reduce((sum, u) => sum + u.availability.total, 0);
  const maxRevenue = Math.max(...revenueTrend.map((d) => d.value));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back. Here is today's operational summary.
          </p>
        </div>
        <span className="text-sm font-medium text-orange-600">
          Date: Oct 24, 2023
        </span>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's Bookings"
          value="42"
          trend={{ text: "↑12% vs yesterday", positive: true }}
          icon={Calendar}
          iconBg="bg-orange-50 text-orange-500"
        />
        <StatCard
          label="Available Inventory"
          value="18"
          valueSuffix="/120"
          trend={{ text: "85% Occupancy Rate", positive: null }}
          icon={BedDouble}
          iconBg="bg-blue-50 text-blue-500"
        />
        <StatCard
          label="Monthly Revenue"
          value="14.2M"
          valueSuffix=" XAF"
          trend={{ text: "↑8% MoM", positive: true }}
          icon={Wallet}
          iconBg="bg-green-50 text-green-500"
        />
        <StatCard
          label="Pending Refunds"
          value="3"
          trend={{ text: "Action required", positive: false }}
          icon={Undo2}
          iconBg="bg-red-50 text-red-500"
        />
      </div>

      {/* Apartments & Inventory Overview */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Apartments &amp; Inventory Overview
            </h2>
            <p className="text-sm text-gray-500">
              Live occupancy, unit specs, and nightly starting rates
            </p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            Total: {totalUnits} Units
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>

      {/* Revenue trends + Quick actions/Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Revenue trends */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Revenue Trends (7 Days)
            </h2>
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              This Week
            </button>
          </div>

          <div className="flex h-40 items-end gap-3">
            {revenueTrend.map((day) => (
              <button
                key={day.label}
                type="button"
                onClick={() => setSelectedDay(day.label)}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-32 w-full items-end">
                  <div
                    className={`w-full rounded-md transition-colors ${
                      day.label === selectedDay
                        ? "bg-orange-500"
                        : "bg-gray-100"
                    }`}
                    style={{ height: `${(day.value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span
                  className={`text-xs ${
                    day.label === selectedDay
                      ? "font-semibold text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {day.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions + Recent activity */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton icon={Plus} label="Add Room" />
              <QuickActionButton icon={RefreshCw} label="Update Availability" />
              <QuickActionButton icon={ClipboardList} label="View Bookings" />
              <QuickActionButton icon={RotateCcw} label="View Refunds" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------- Subcomponents -----------------------------

function StatCard({
  label,
  value,
  valueSuffix,
  trend,
  icon: Icon,
  iconBg,
}: {
  label: string;
  value: string;
  valueSuffix?: string;
  trend: { text: string; positive: boolean | null };
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon size={16} />
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {value}
        {valueSuffix && (
          <span className="text-base font-medium text-gray-400">
            {valueSuffix}
          </span>
        )}
      </p>
      <p
        className={`mt-1 text-xs font-medium ${
          trend.positive === true
            ? "text-green-600"
            : trend.positive === false
              ? "text-red-500"
              : "text-gray-400"
        }`}
      >
        {trend.text}
      </p>
    </div>
  );
}

function UnitCard({ unit }: { unit: ApartmentUnit }) {
  const { available, total, isMostlyOccupied } = unit.availability;
  const isLow = available <= 1;

  const badgeStyles = isLow
    ? "bg-red-50 text-red-600"
    : isMostlyOccupied
      ? "bg-orange-50 text-orange-600"
      : "bg-green-50 text-green-600";

  const badgeLabel = isMostlyOccupied ? "Occupied" : "Available";

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="mb-2 flex items-start justify-between">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeStyles}`}
        >
          {available}/{total} {badgeLabel}
        </span>
      </div>

      <p className="mb-2 text-sm font-semibold text-gray-900">{unit.name}</p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {unit.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 px-2 py-1 text-[11px] text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        From{" "}
        <span className="font-semibold text-gray-900">
          {unit.fromPricePerNight.toLocaleString("en-US")} XAF
        </span>
        /night
      </p>
    </div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 py-4 text-center hover:bg-gray-100"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
        <Icon size={15} />
      </span>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
  );
}
