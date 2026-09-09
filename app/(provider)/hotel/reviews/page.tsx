"use client";
import { ReviewsTable } from "@/components/dashboard/hotels/reviews/reviewsTable";
import ReviewsTop from "@/components/dashboard/hotels/reviews/reviewsTop";
import React from "react";

function ReviewsPage() {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <ReviewsTop />
        <ReviewsTable />
      </div>
    </div>
  );
}

export default ReviewsPage;
