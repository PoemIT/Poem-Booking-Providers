"use client";

import { useState, useMemo } from "react";
import {
  Star,
  Eye,
  Flag,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { reviewsWithRelations, mockTotalReviewCount } from "@/lib/mock-data";
import { ReviewStatus, ServiceType, ReviewWithRelations } from "@/lib/types";

const statusConfig: Record<ReviewStatus, { label: string; className: string }> =
  {
    pending: { label: "Pending", className: "bg-orange-50 text-orange-700" },
    rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
    active: { label: "Active", className: "bg-green-50 text-green-700" },
    suspended: { label: "Suspended", className: "bg-slate-100 text-slate-600" },
  };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ===== Report modal =====

function ReportReviewModal({
  review,
  onClose,
  onConfirm,
}: {
  review: ReviewWithRelations;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Flag size={16} />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Report Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          {/* Warning banner */}
          <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
            <LogOut size={14} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              Are you sure you want to report this review? This will flag it for
              moderation and notify the trust &amp; safety team.
            </p>
          </div>

          {/* Reason field */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Report Reason
              </label>
              <span className="text-xs italic text-red-500">required</span>
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Provide a detailed reason for the report (e.g., inappropriate content, spam, or false information)..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Original review preview */}
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Original Review
              </span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </span>
            </div>
            <p className="text-sm italic text-slate-600">"{review.comment}"</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim()}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Report
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Table =====

export function ReviewsTable() {
  const [customerQuery, setCustomerQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [reportTarget, setReportTarget] = useState<ReviewWithRelations | null>(
    null,
  );

  const filteredReviews = useMemo(() => {
    return reviewsWithRelations.filter((review) => {
      const customerName = `${review.customer.first_name} ${review.customer.last_name}`;
      const matchesCustomer =
        customerQuery.trim() === "" ||
        customerName.toLowerCase().includes(customerQuery.toLowerCase()) ||
        review.customer.id.toLowerCase().includes(customerQuery.toLowerCase());

      const matchesService =
        serviceFilter === "all" || review.service_type === serviceFilter;

      const matchesStatus =
        statusFilter === "all" || review.review_status === statusFilter;

      return matchesCustomer && matchesService && matchesStatus;
    });
  }, [customerQuery, serviceFilter, statusFilter]);

  function handleConfirmReport(reason: string) {
    if (!reportTarget) return;
    // TODO: replace with a real API call once the backend exists
    console.log("reported review:", reportTarget.id, "reason:", reason);
    setReportTarget(null);
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-4">
        <input
          type="text"
          value={customerQuery}
          onChange={(e) => setCustomerQuery(e.target.value)}
          placeholder="Name or ID"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as ReviewStatus | "all")
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
        >
          <option value="all">All Reviews</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Provider / Service</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Review Content</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Response</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  No reviews match your filters.
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => {
                const status = statusConfig[review.review_status];
                const customerName = `${review.customer.first_name} ${review.customer.last_name}`;

                return (
                  <tr
                    key={review.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500">
                          {customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {customerName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {review.customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">
                        {review.provider.business_name}
                      </p>
                      <span className="text-xs text-blue-600 capitalize">
                        {review.service_type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 font-medium text-slate-900">
                        <Star
                          size={12}
                          className="fill-orange-400 text-orange-400"
                        />
                        {review.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="max-w-[220px] px-5 py-4 text-slate-500">
                      {review.comment}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`flex items-center gap-1.5 text-xs ${
                          review.response ? "text-green-600" : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            review.response ? "bg-green-500" : "bg-slate-300"
                          }`}
                        />
                        {review.response ? "Responded" : "No Response"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <button className="hover:text-slate-700">
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setReportTarget(review)}
                          className="hover:text-red-500"
                        >
                          <Flag size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <p className="text-xs text-slate-500">
            Showing 1 to {filteredReviews.length} of{" "}
            {mockTotalReviewCount.toLocaleString("en-US")} reviews
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={14} />
            </button>
            <button className="h-8 w-8 rounded-lg bg-slate-900 text-xs font-medium text-white">
              1
            </button>
            <button className="h-8 w-8 rounded-lg text-xs text-slate-500 hover:bg-slate-50">
              2
            </button>
            <button className="h-8 w-8 rounded-lg text-xs text-slate-500 hover:bg-slate-50">
              3
            </button>
            <span className="px-1 text-xs text-slate-400">...</span>
            <button className="h-8 w-8 rounded-lg text-xs text-slate-500 hover:bg-slate-50">
              249
            </button>
            <button className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {reportTarget && (
        <ReportReviewModal
          review={reportTarget}
          onClose={() => setReportTarget(null)}
          onConfirm={handleConfirmReport}
        />
      )}
    </div>
  );
}
