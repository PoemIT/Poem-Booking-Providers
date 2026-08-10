// components/skeleton/viewRoomSkeleton.tsx
//
// Matches ViewRoom's layout: header, 4 photo placeholders, the details
// list, and the right-column performance card + Edit button.

import { Card } from "../providerui/card";
import { SkeletonBlock } from "./skeletonBlock";

export function ViewRoomSkeleton() {
  const photoSlots = [1, 2, 3, 4];
  const detailRows = [1, 2, 3, 4, 5, 6, 7]; // matches the 7 rows in the real details card

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <SkeletonBlock className="mb-2 h-6 w-48" />
        <SkeletonBlock className="h-4 w-56" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="flex-1">
          {/* Photo strip */}
          <div className="mb-6 grid grid-cols-4 gap-3">
            {photoSlots.map((slot) => (
              <SkeletonBlock key={slot} className="h-28 rounded-lg" />
            ))}
          </div>

          {/* Details card */}
          <Card className="p-0">
            {detailRows.map((row, index) => (
              <div
                key={row}
                className={`flex items-center justify-between px-5 py-4 ${
                  index !== detailRows.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            ))}
          </Card>
        </div>

        {/* Right column */}
        <div className="w-full shrink-0 space-y-4 lg:w-72">
          <Card>
            <SkeletonBlock className="mb-4 h-4 w-24" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-4 w-10" />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-4 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-4 w-10" />
              </div>
            </div>
          </Card>

          <SkeletonBlock className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
