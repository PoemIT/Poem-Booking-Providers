"use client";

import { useEffect, useState } from "react";
import { reviewsWithRelations } from "@/lib/mock-data";
import {
  ArrowLeft,
  Star,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  BadgeCheck,
  Send,
  Trash2,
} from "lucide-react";
import type { ReviewStatus } from "@/lib/types";

const statusConfig: Record<ReviewStatus, { label: string; className: string }> =
  {
    pending: { label: "Pending", className: "bg-orange-50 text-orange-700" },
    rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
    active: { label: "Active", className: "bg-green-50 text-green-700" },
    suspended: { label: "Suspended", className: "bg-slate-100 text-slate-600" },
  };

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ViewReviewsPage() {
  const review = reviewsWithRelations[2];
  const status = statusConfig[review.review_status];

  const [responseText, setResponseText] = useState(
    review.response?.response_text ?? "",
  );
  const [postedAt, setPostedAt] = useState<string | null>(
    review.response?.created_at ?? null,
  );
  const [hasResponse, setHasResponse] = useState(!!review.response);

  // Resync whenever the underlying review changes
  useEffect(() => {
    setResponseText(review.response?.response_text ?? "");
    setPostedAt(review.response?.created_at ?? null);
    setHasResponse(!!review.response);
  }, [review.id, review.response]);

  function handleSubmitResponse() {
    if (!responseText.trim()) return;
    // TODO: replace with a real API call once the backend exists
    console.log("submitting response for review", review.id, responseText);
    setPostedAt(new Date().toISOString());
    setHasResponse(true);
  }

  function handleDeleteResponse() {
    // TODO: replace with a real API call once the backend exists
    console.log("deleting response for review", review.id);
    setResponseText("");
    setPostedAt(null);
    setHasResponse(false);
  }

  const customerName = `${review.customer.first_name} ${review.customer.last_name}`;

  return (
    <div>
      <button className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700">
        <ArrowLeft size={13} />
        Back to Reviews
      </button>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(review.rating)
                      ? "fill-orange-400 text-orange-400"
                      : "fill-slate-200 text-slate-200"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-bold text-slate-900">
              {review.rating.toFixed(1)}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {capitalize(review.service_type)} review · Posted{" "}
            {formatDateTime(review.created_at)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Review content */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Review
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {review.comment}
            </p>
          </div>

          {/* Response section */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              {hasResponse ? "Your response" : "Respond to this review"}
            </h2>

            {hasResponse ? (
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-700">{responseText}</p>
                {postedAt && (
                  <p className="mt-2 text-xs text-slate-400">
                    Posted {formatDateTime(postedAt)}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4">
                  <button
                    onClick={() => setHasResponse(false)}
                    className="text-xs font-medium text-orange-600 hover:underline"
                  >
                    Edit response
                  </button>
                  <button
                    onClick={handleDeleteResponse}
                    className="flex items-center gap-1 text-xs font-medium text-red-500 hover:underline"
                  >
                    <Trash2 size={12} />
                    Delete response
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  placeholder="Write a public response to this customer's review..."
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!responseText.trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={13} />
                    Submit response
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Customer
            </h2>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                {customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {customerName}
                </p>
                <p className="text-xs text-slate-400">{review.customer.id}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Row
                icon={Mail}
                label="Email"
                value={review.customer.email ?? "—"}
              />
              <Row
                icon={Phone}
                label="Phone"
                value={review.customer.phone_number}
              />
              <Row
                icon={User}
                label="Account"
                value={capitalize(review.customer.user_type)}
              />
            </div>
          </div>

          {/* Hotel / provider info */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Hotel</h2>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                <Building2 size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {review.provider.business_name}
                </p>
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  {review.provider.verification_status === "verified" && (
                    <BadgeCheck size={12} className="text-green-500" />
                  )}
                  {capitalize(review.provider.verification_status)}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Row
                icon={MapPin}
                label="Address"
                value={review.provider.address}
              />
              <Row icon={Mail} label="Email" value={review.provider.email} />
              <Row
                icon={Phone}
                label="Phone"
                value={review.provider.phone_number}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={13} className="mt-0.5 shrink-0 text-slate-400" />
      <div>
        <p className="text-[10px] uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default ViewReviewsPage;
