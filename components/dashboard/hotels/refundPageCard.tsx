"use client";

import {
  RotateCw,
  ShieldAlert,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  EyeIcon,
} from "lucide-react";
import { useState, useMemo } from "react";

// Matches the refunds table's refund_status enum exactly.
type RefundStatus =
  | "requested"
  | "approved"
  | "processing"
  | "completed"
  | "rejected";

type RefundRecord = {
  id: string;
  refundRef: string;
  guestName: string;
  originalAmount: number;
  cancellationFee: number;
  cancellationFeePercent: number;
  refundAmount: number;
  currency: string;
  status: RefundStatus;
  reason: string;
};

const refundsData: RefundRecord[] = [
  {
    id: "1",
    refundRef: "REF-237-4101",
    guestName: "Paul Mebenga",
    originalAmount: 300000,
    cancellationFee: 15000,
    cancellationFeePercent: 5,
    refundAmount: 285000,
    currency: "XAF",
    status: "completed",
    reason: "Medical emergency flight delay",
  },
  {
    id: "2",
    refundRef: "REF-237-4102",
    guestName: "Cecile Mendomo",
    originalAmount: 180000,
    cancellationFee: 18000,
    cancellationFeePercent: 10,
    refundAmount: 162000,
    currency: "XAF",
    status: "requested",
    reason: "Double room booked accidentally",
  },
  {
    id: "3",
    refundRef: "REF-237-4103",
    guestName: "Alphonse Tchakounté",
    originalAmount: 450000,
    cancellationFee: 45000,
    cancellationFeePercent: 10,
    refundAmount: 405000,
    currency: "XAF",
    status: "approved",
    reason: "Work trip cancelled",
  },
  {
    id: "4",
    refundRef: "REF-237-4104",
    guestName: "Dorothée Wanko",
    originalAmount: 120000,
    cancellationFee: 0,
    cancellationFeePercent: 0,
    refundAmount: 120000,
    currency: "XAF",
    status: "processing",
    reason: "Full refund due to plumbing issue in the room",
  },
  {
    id: "5",
    refundRef: "REF-237-4105",
    guestName: "Jean-Rene Ebanda",
    originalAmount: 600000,
    cancellationFee: 120000,
    cancellationFeePercent: 20,
    refundAmount: 480000,
    currency: "XAF",
    status: "rejected",
    reason: "Cancelled past 24-hr check-in window",
  },
];

const summaryStats = {
  totalRefundsChange: 18.2,
  completedPayoutsCount: 12,
  pendingRequestedCount: 3,
  approvedQueuedCount: 1,
  approvedChange: 10.0,
  rejectedChange: 1.1,
};

const statusConfig: Record<RefundStatus, { label: string; className: string }> =
  {
    completed: { label: "Completed", className: "bg-green-50 text-green-700" },
    requested: { label: "Requested", className: "bg-amber-50 text-amber-700" },
    approved: { label: "Approved", className: "bg-green-50 text-green-700" },
    processing: {
      label: "Processing",
      className: "bg-amber-50 text-amber-700",
    },
    rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
  };

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

// `invertColor` handles cases like Rejected Claims, where a rising
// number is actually bad news, not good news — the arrow direction and
// color need to flip even though the underlying number is positive.
function TrendLabel({
  change,
  invertColor = false,
}: {
  change: number;
  invertColor?: boolean;
}) {
  const isPositive = change >= 0;
  const isGood = invertColor ? !isPositive : isPositive;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium ${isGood ? "text-green-600" : "text-red-500"}`}
    >
      <Icon size={12} />
      {isPositive ? "+" : ""}
      {change}% vs last month
    </span>
  );
}

function RefundPageCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RefundStatus | "all">("all");

  const totalRefundsIssued = refundsData
    .filter((r) => r.status === "completed")
    .reduce((total, r) => total + r.refundAmount, 0);

  const pendingCount = refundsData.filter(
    (r) => r.status === "requested",
  ).length;

  const approvedAmount = refundsData
    .filter((r) => r.status === "approved")
    .reduce((total, r) => total + r.refundAmount, 0);

  const rejectedCount = refundsData.filter(
    (r) => r.status === "rejected",
  ).length;

  const filteredData = useMemo(() => {
    return refundsData.filter((refund) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        refund.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.refundRef.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || refund.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Refund Requests</h1>
          <p className="text-sm text-slate-500">
            Review guest cancellations, approve exceptions and manage platform
            payouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <RotateCw size={14} />
            Refresh
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
            <ShieldAlert size={14} />
            Refund Rules
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Total Refunds Issued
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalRefundsIssued, "XAF")}
          </p>
          <p className="mb-2 text-xs text-slate-400">
            {summaryStats.completedPayoutsCount} completed payouts
          </p>
          <TrendLabel change={summaryStats.totalRefundsChange} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Pending Requests
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {pendingCount} Requested
          </p>
          <p className="mb-2 text-xs text-slate-400">Requires operator check</p>
          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
            <TrendingUp size={12} />
            No change vs last month
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Approved (Queued)
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(approvedAmount, "XAF")}
          </p>
          <p className="mb-2 text-xs text-slate-400">
            {summaryStats.approvedQueuedCount} transaction in queue
          </p>
          <TrendLabel change={summaryStats.approvedChange} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Rejected Claims
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {rejectedCount} Claims
          </p>
          <p className="mb-2 text-xs text-slate-400">
            Due to policy violations
          </p>
          <TrendLabel change={summaryStats.rejectedChange} invertColor />
        </div>
      </div>

      {/* Search + filters */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guest or refund ref..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as RefundStatus | "all")
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          >
            <option value="all">Status: All Statuses</option>
            {Object.entries(statusConfig).map(([value, config]) => (
              <option key={value} value={value}>
                Status: {config.label}
              </option>
            ))}
          </select>

          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <Calendar size={13} />
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Refund Ref</th>
              <th className="px-5 py-3 font-medium">Guest Name</th>
              <th className="px-5 py-3 font-medium">Original Amount</th>
              <th className="px-5 py-3 font-medium">Cancellation Fee</th>
              <th className="px-5 py-3 font-medium">Refund Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Reason (Truncated)</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  No refund requests match your filters.
                </td>
              </tr>
            ) : (
              filteredData.map((refund) => {
                const status = statusConfig[refund.status];
                return (
                  <tr
                    key={refund.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-orange-600">
                        {refund.refundRef}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {refund.guestName}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatCurrency(refund.originalAmount, refund.currency)}
                    </td>
                    <td className="px-5 py-4 text-red-500">
                      {refund.cancellationFee > 0
                        ? `${formatCurrency(refund.cancellationFee, refund.currency)} (${refund.cancellationFeePercent}%)`
                        : `0 ${refund.currency} (0%)`}
                    </td>
                    <td className="px-5 py-4 font-semibold text-green-600">
                      {formatCurrency(refund.refundAmount, refund.currency)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {truncate(refund.reason, 35)}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      <EyeIcon size={18} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RefundPageCard;
