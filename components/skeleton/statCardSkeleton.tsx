// components/skeleton/statCardSkeleton.tsx
//
// Matches the real "stat card" shape (icon, big number, small label,
// little trend line) so there's no layout jump when real data arrives.

import { Card } from "../providerui/card";
import { SkeletonBlock } from "./skeletonBlock";

export function StatCardSkeleton() {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
        <SkeletonBlock className="h-4 w-10" />
      </div>
      <SkeletonBlock className="mb-2 h-7 w-16" />
      <SkeletonBlock className="h-3 w-24" />
    </Card>
  );
}
