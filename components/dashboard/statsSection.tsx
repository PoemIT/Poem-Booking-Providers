"use client";

import { ClipboardList, BedDouble, Wallet, Undo2 } from "lucide-react";
import { mockDashboardStats, mockSparklines } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { StatCard } from "./statCard";

export function StatsSection() {
  const stats = mockDashboardStats;
  const sparklines = mockSparklines;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={ClipboardList}
        iconColorClass="bg-orange-50 text-orange-500"
        value={stats.todaysBookings.toString()}
        label="Today's Bookings"
        changePercent={stats.todaysBookingsChangePercent}
        sparklineData={sparklines.todaysBookings}
        sparklineColor="#f97316"
      />
      <StatCard
        icon={BedDouble}
        iconColorClass="bg-green-50 text-green-500"
        value={stats.availableInventory.toString()}
        label="Available Inventory"
        changePercent={stats.availableInventoryChangePercent}
        sparklineData={sparklines.availableInventory}
        sparklineColor="#22c55e"
      />
      <StatCard
        icon={Wallet}
        iconColorClass="bg-blue-50 text-blue-500"
        value={formatCurrency(stats.monthlyRevenue)}
        label="Monthly Revenue"
        changePercent={stats.monthlyRevenueChangePercent}
        sparklineData={sparklines.monthlyRevenue}
        sparklineColor="#3b82f6"
      />
      <StatCard
        icon={Undo2}
        iconColorClass="bg-red-50 text-red-500"
        value={stats.pendingRefunds.toString()}
        label="Pending Refunds"
        changePercent={stats.pendingRefundsChangePercent}
        sparklineData={sparklines.pendingRefunds}
        sparklineColor="#ef4444"
      />
    </div>
  );
}
