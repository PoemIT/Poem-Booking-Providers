"use client";

import { StatusBadge } from "@/components/providerui/statusBadge";
import {
  Printer,
  RotateCcw,
  ChevronRight,
  Smartphone,
  User as UserIcon,
  Wallet,
} from "lucide-react";
import Link from "next/link";

type PaymentStatus =
  | "initiated"
  | "pending"
  | "successful"
  | "failed"
  | "reversed";
type PaymentMethod = "momo" | "orange_money" | "poem_pay" | "visa";
type ItemType = "hotel_room" | "apartment" | "bus_ticket";

type PaymentDetail = {
  id: string;
  paymentRef: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  method: PaymentMethod;
  paidAt: string;
  transactionId: string;

  itemType: ItemType;
  itemLabel: string; // e.g. "Room 104 Suite"
  locationLabel: string; // e.g. "Kribi Shorefront"
  checkInDate: string;
  checkOutDate: string;
  nights: number;

  bookingReference: string;
  bookingStatus: string;

  guestName: string;
  guestPhone: string;
  guestEmail: string | null;
};

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  successful: { label: "SUCCESSFUL", className: "bg-green-50 text-green-700" },
  pending: { label: "PENDING", className: "bg-amber-50 text-amber-700" },
  failed: { label: "FAILED", className: "bg-red-50 text-red-700" },
  reversed: { label: "REVERSED", className: "bg-violet-50 text-violet-700" },
  initiated: { label: "INITIATED", className: "bg-slate-100 text-slate-500" },
};

const methodConfig: Record<
  PaymentMethod,
  { label: string; icon: typeof Smartphone }
> = {
  momo: { label: "MTN MoMo", icon: Smartphone },
  orange_money: { label: "Orange Money", icon: UserIcon },
  poem_pay: { label: "PoemPay", icon: Wallet },
  visa: { label: "Visa", icon: Wallet },
};

const mockPaymentDetail: PaymentDetail = {
  id: "1",
  paymentRef: "PAY-237-9842",
  status: "successful",
  amount: 350000,
  currency: "XAF",
  method: "momo",
  paidAt: "2024-11-24T08:32:00Z",
  transactionId: "TXN-88213749201",

  itemType: "hotel_room",
  itemLabel: "Room 104 Suite",
  locationLabel: "Kribi Shorefront",
  checkInDate: "2024-11-24",
  checkOutDate: "2024-11-27",
  nights: 3,

  bookingReference: "PB-2024-0842",
  bookingStatus: "confirmed",

  guestName: "Jean-Pierre Nguene",
  guestPhone: "+237672435726",
  guestEmail: "jp.nguene@gmail.com",
};

function formatCurrency(amount: number, currency: string) {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}

function ViewPaymentPage() {
  const payment = mockPaymentDetail;
  const status = statusConfig[payment.status];
  const method = methodConfig[payment.method];
  const MethodIcon = method.icon;

  function handlePrintReceipt() {
    // TODO: wire up real receipt printing/PDF generation
    console.log("printing receipt for", payment.paymentRef);
  }

  function handleRequestRefund() {
    // TODO: wire up real refund request flow
    console.log("requesting refund for", payment.paymentRef);
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-sm">
        <Link
          href="/revenue"
          className="font-medium text-orange-500 hover:underline"
        >
          Payments
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-500">Transaction Details</span>
      </div>

      {/* Header card */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900">
                {payment.paymentRef}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Logged to Hotel Room: {payment.itemLabel} ({payment.locationLabel}
              )
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintReceipt}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Printer size={14} />
              Print Receipt
            </button>
            {/*  <button
              onClick={handleRequestRefund}
              className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              <RotateCcw size={14} />
              Request Refund
            </button> */}
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payment details */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            Payment Details
          </h2>
          <DetailRow
            label="Amount"
            value={formatCurrency(payment.amount, payment.currency)}
          />
          <DetailRow
            label="Payment Method"
            value={
              <span className="flex items-center gap-1.5">
                <MethodIcon size={14} className="text-slate-500" />
                {method.label}
              </span>
            }
          />
          <DetailRow label="Transaction ID" value={payment.transactionId} />
          <DetailRow label="Paid At" value={formatDateTime(payment.paidAt)} />
          <DetailRow
            label="Booking Reference"
            value={
              <span className="font-semibold text-orange-600">
                {payment.bookingReference}
              </span>
            }
          />
          <DetailRow
            label="Booking Status"
            value={
              <span className="capitalize">
                {/* 
                <StatusBadge status={payment.bookingStatus} /> */}
                {payment.bookingStatus}
              </span>
            }
          />

          <h2 className="mb-2 mt-6 text-sm font-semibold text-slate-900">
            Stay Details
          </h2>
          <DetailRow label="Room" value={payment.itemLabel} />
          <DetailRow label="Location" value={payment.locationLabel} />
          <DetailRow label="Check-in" value={formatDate(payment.checkInDate)} />
          <DetailRow
            label="Check-out"
            value={formatDate(payment.checkOutDate)}
          />
          <DetailRow label="Nights" value={payment.nights} />
        </div>

        {/* Guest info */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            Guest / User
          </h2>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
              {payment.guestName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {payment.guestName}
              </p>
              <p className="text-xs text-slate-500">{payment.guestPhone}</p>
            </div>
          </div>
          {payment.guestEmail && (
            <DetailRow label="Email" value={payment.guestEmail} />
          )}
          <DetailRow label="Phone" value={payment.guestPhone} />
        </div>
      </div>
    </div>
  );
}

export default ViewPaymentPage;
