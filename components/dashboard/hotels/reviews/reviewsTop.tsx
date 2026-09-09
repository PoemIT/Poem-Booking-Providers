import {
  mockCriticalReviews,
  mockRatingDistribution,
  mockReviewStats,
} from "@/lib/mock-data";
import { Flag, Star, TrendingUp } from "lucide-react";
import React from "react";

function ReviewsTop() {
  const stats = mockReviewStats;
  const distribution = mockRatingDistribution;
  const maxCount = Math.max(...distribution.map((row) => row.count));
  const reviews = mockCriticalReviews;

  function handleReport(id: string) {
    // TODO: replace with a real API call once the backend exists —
    // reporting escalates the review to admin for review/removal,
    // it doesn't directly approve/reject anything here.
    console.log("reported review:", id);
  }
  return (
    <div>
      <section>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Total Reviews
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.totalReviews.toLocaleString("en-US")}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp size={12} />
              {stats.totalReviewsChange}% vs last month
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Pending Reviews
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.pendingReviews}
            </p>
            <p className="text-xs text-amber-600">Action required</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Active
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.approvedReviews.toLocaleString("en-US")}
            </p>
            <p className="text-xs text-green-600">
              {stats.approvedPercent}% of total
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Rejected
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.rejectedReviews}
            </p>
            <p className="text-xs text-red-500">Quality control</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Avg. Rating
            </p>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-bold text-slate-900">
                {stats.avgRating}
              </p>
              <div className="flex text-orange-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={
                      i < Math.round(stats.avgRating) ? "currentColor" : "none"
                    }
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400">Global Satisfaction</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 ">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            Rating Distribution
          </h2>
          <div className="space-y-2.5">
            {distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="flex w-10 shrink-0 items-center gap-1 text-xs font-medium text-slate-600">
                  {row.stars}
                  <Star size={11} className="fill-orange-400 text-orange-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${(row.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-xs text-slate-500">
                  {row.count.toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Critical Moderation Queue
            </h2>
            {reviews.length > 0 && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                {reviews.length} High Priority
              </span>
            )}
          </div>

          {reviews.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No critical reviews right now.
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-red-100 bg-red-50/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-slate-900">
                          {review.customerName}
                        </p>
                        <span className="flex items-center gap-0.5 text-xs font-medium text-orange-500">
                          {review.rating.toFixed(1)}
                          <Star size={11} fill="currentColor" strokeWidth={0} />
                        </span>
                      </div>
                      <p className="text-xs italic text-slate-600">
                        &quot;{review.content}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => handleReport(review.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <Flag size={12} />
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReviewsTop;
