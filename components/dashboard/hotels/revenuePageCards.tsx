"use client";

import {
  RotateCw,
  Download,
  Search,
  Calendar,
  Smartphone,
  Wallet,
  User,
  TrendingUp,
  TrendingDown,
  EyeIcon,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";

type PaymentMethod = "momo" | "orange_money" | "poem_pay" | "visa";
type PaymentStatus =
  | "initiated"
  | "pending"
  | "successful"
  | "failed"
  | "reversed";

type PaymentRecord = {
  id: string;
  paymentRef: string;
  guestName: string;
  roomBooking: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
};

const paymentsData: PaymentRecord[] = [
  {
    id: "1",
    paymentRef: "PAY-237-9842",
    guestName: "Jean-Pierre Nguene",
    roomBooking: "Junior Suite",
    amount: 350000,
    currency: "XAF",
    method: "momo",
    status: "successful",
    date: "2024-10-24T08:32:00Z",
  },
  {
    id: "2",
    paymentRef: "PAY-237-9841",
    guestName: "Marie-Claire Atangana",
    roomBooking: "Ocean View",
    amount: 520000,
    currency: "XAF",
    method: "poem_pay",
    status: "successful",
    date: "2024-11-23T14:15:00Z",
  },
  {
    id: "3",
    paymentRef: "PAY-237-9840",
    guestName: "Marc Belinga",
    roomBooking: "Standard",
    amount: 180000,
    currency: "XAF",
    method: "orange_money",
    status: "pending",
    date: "2024-12-23T11:02:00Z",
  },
  {
    id: "4",
    paymentRef: "PAY-237-9839",
    guestName: "Fidelis Fotso",
    roomBooking: "Presidential",
    amount: 1200000,
    currency: "XAF",
    method: "poem_pay",
    status: "successful",
    date: "2024-01-22T19:44:00Z",
  },
  {
    id: "5",
    paymentRef: "PAY-237-9838",
    guestName: "Alain Ebogo",
    roomBooking: "Deluxe Single",
    amount: 95000,
    currency: "XAF",
    method: "momo",
    status: "failed",
    date: "2024-11-22T09:12:00Z",
  },
  {
    id: "6",
    paymentRef: "PAY-237-9837",
    guestName: "Christelle Bella",
    roomBooking: "Standard Twin",
    amount: 120000,
    currency: "XAF",
    method: "orange_money",
    status: "reversed",
    date: "2024-11-21T16:30:00Z",
  },
  {
    id: "7",
    paymentRef: "PAY-237-9836",
    guestName: "Amadou Toumani",
    roomBooking: "Suite Deluxe",
    amount: 410000,
    currency: "XAF",
    method: "poem_pay",
    status: "initiated",
    date: "2024-11-21T11:15:00Z",
  },
];

const summaryStats = {
  totalRevenueChange: 12.4,
  reconciliationRate: 98,
  successfulChange: 8.1,
  pendingChange: -2.5,
  failedChange: -1.2,
};

const methodConfig: Record<
  PaymentMethod,
  { label: string; icon: typeof Smartphone; className: string }
> = {
  momo: {
    label: "MTN MoMo",
    icon: Smartphone,
    className: "bg-amber-50 text-amber-700",
  },
  orange_money: {
    label: "Orange Money",
    icon: User,
    className: "bg-orange-50 text-orange-700",
  },
  poem_pay: {
    label: "PoemPay",
    icon: Wallet,
    className: "bg-indigo-50 text-indigo-700",
  },
  visa: { label: "Visa", icon: Wallet, className: "bg-blue-50 text-blue-700" },
};

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  successful: { label: "Successful", className: "bg-green-50 text-green-700" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  failed: { label: "Failed", className: "bg-red-50 text-red-700" },
  reversed: { label: "Reversed", className: "bg-violet-50 text-violet-700" },
  initiated: { label: "Initiated", className: "bg-slate-100 text-slate-500" },
};

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TrendLabel({ change }: { change: number }) {
  const isPositive = change >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}
    >
      <Icon size={12} />
      {isPositive ? "+" : ""}
      {change}% vs last month
    </span>
  );
}

function RevenuePageCards() {
  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">(
    "all",
  );
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">(
    "all",
  );

  const totalRevenue = paymentsData
    .filter((r) => r.status === "successful")
    .reduce((total, r) => total + r.amount, 0);
  const successfulCount = paymentsData.filter(
    (r) => r.status === "successful",
  ).length;
  const totalPendingLength = paymentsData.filter(
    (r) => r.status === "pending",
  ).length;
  const totalFailedLength = paymentsData.filter(
    (r) => r.status === "failed",
  ).length;
  const totalPendingAmount = paymentsData
    .filter((r) => r.status === "pending")
    .reduce((total, r) => total + r.amount, 0);
  const totalFailedAmount = paymentsData
    .filter((r) => r.status === "failed")
    .reduce((total, r) => total + r.amount, 0);

  const filteredData = useMemo(() => {
    return paymentsData.filter((payment) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        payment.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentRef.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      const matchesMethod =
        methodFilter === "all" || payment.method === methodFilter;

      const paymentDate = payment.date.slice(0, 10); // "YYYY-MM-DD" from the ISO string
      const matchesDate =
        (startDate === "" || paymentDate >= startDate) &&
        (endDate === "" || paymentDate <= endDate);

      return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    });
  }, [searchQuery, statusFilter, methodFilter, startDate, endDate]);

  // Pagination now works off the FILTERED list, not the raw one
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );
  const paginatedBooking = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // NEW — whenever any filter changes, jump back to page 1. Without
  // this, you could be sitting on page 3 when a filter reduces the
  // results to 1 page, and see a blank table.
  function updateSearch(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }
  function updateStatus(value: PaymentStatus | "all") {
    setStatusFilter(value);
    setCurrentPage(1);
  }
  function updateMethod(value: PaymentMethod | "all") {
    setMethodFilter(value);
    setCurrentPage(1);
  }
  function updateStartDate(value: string) {
    setStartDate(value);
    setCurrentPage(1);
  }
  function updateEndDate(value: string) {
    setEndDate(value);
    setCurrentPage(1);
  }

  const dateRangeLabel =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : startDate
        ? `From ${formatDate(startDate)}`
        : endDate
          ? `Until ${formatDate(endDate)}`
          : "All Dates";

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Payments Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Live look at reservations, cash collection &amp; local gateway
            health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <RotateCw size={14} />
            Refresh
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Total Revenue (XAF)
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalRevenue, "XAF")}
          </p>
          <p className="mb-2 text-xs text-slate-400">
            {successfulCount} completed payments
          </p>
          <TrendLabel change={summaryStats.totalRevenueChange} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Successful Payments
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {successfulCount} Successful
          </p>
          <p className="mb-2 text-xs text-slate-400">
            Reconciliation rate {summaryStats.reconciliationRate}%
          </p>
          <TrendLabel change={summaryStats.successfulChange} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Pending Transactions
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalPendingAmount, "XAF")}
          </p>
          <p className="mb-2 text-xs text-slate-400">
            {totalPendingLength} Pending
          </p>
          <TrendLabel change={summaryStats.pendingChange} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Failed Payments
          </p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalFailedAmount, "XAF")}
          </p>
          <p className="mb-2 text-xs text-slate-400">
            {totalFailedLength} Failed
          </p>
          <TrendLabel change={summaryStats.failedChange} />
        </div>
      </div>

      {/* Search + filters — all 3 now actually control the table */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search guest name or ref..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setDateMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              <Calendar size={13} />
              {dateRangeLabel}
            </button>

            {dateMenuOpen && (
              <div className="absolute right-0 z-10 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                <X
                  size={15}
                  onClick={() => setDateMenuOpen((open) => !open)}
                  className="text-black"
                />
                <label className="mb-1 block text-xs text-slate-500">
                  From
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => updateStartDate(e.target.value)}
                  className="mb-3 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
                />
                <label className="mb-1 block text-xs text-slate-500">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => updateEndDate(e.target.value)}
                  className="mb-3 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
                />
                <button
                  onClick={() => {
                    updateStartDate("");
                    updateEndDate("");
                  }}
                  className="text-xs text-orange-500 hover:underline"
                >
                  Clear dates
                </button>
              </div>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              updateStatus(e.target.value as PaymentStatus | "all")
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

          <select
            value={methodFilter}
            onChange={(e) =>
              updateMethod(e.target.value as PaymentMethod | "all")
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          >
            <option value="all">Method: All Payment Methods</option>
            {Object.entries(methodConfig).map(([value, config]) => (
              <option key={value} value={value}>
                Method: {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Payment Ref</th>
              <th className="px-5 py-3 font-medium">Guest Name</th>
              <th className="px-5 py-3 font-medium">Booking</th>
              <th className="px-5 py-3 font-medium">Amount (XAF)</th>
              <th className="px-5 py-3 font-medium">Method</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooking.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  No payments match your filters.
                </td>
              </tr>
            ) : (
              paginatedBooking.map((payment) => {
                const method = methodConfig[payment.method];
                const status = statusConfig[payment.status];
                const MethodIcon = method.icon;

                return (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-orange-600">
                        {payment.paymentRef}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {payment.guestName}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {payment.roomBooking}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${method.className}`}
                      >
                        <MethodIcon size={12} />
                        {method.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      <EyeIcon size={18} className="cursor-pointer" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination footer — now reflects filteredData.length, not the raw dataset */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
          <p className="text-sm text-slate-500">
            {filteredData.length === 0
              ? "No payment records"
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1} to ${Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of ${filteredData.length} payment records`}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-md text-sm ${
                    page === currentPage
                      ? "bg-orange-500 font-medium text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenuePageCards;
