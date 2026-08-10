import { SkeletonBlock } from "./skeletonBlock";

export function ProfileCardSkeleton() {
  const detailRows = [1, 2, 3, 4, 5, 6];
  const photoSlots = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb + Header */}
      <div className="mb-6">
        <SkeletonBlock className="mb-2 h-3 w-32" />
        <SkeletonBlock className="mb-2 h-7 w-56" />
        <SkeletonBlock className="h-4 w-40" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="flex-1">
          {/* Photo gallery */}
          <div className="mb-6 grid grid-cols-5 gap-3">
            {photoSlots.map((slot) => (
              <SkeletonBlock
                key={slot}
                className="h-24 w-36 shrink-0 rounded-lg"
              />
            ))}
          </div>

          {/* Details card */}
          <div className="rounded-xl border border-gray-200 bg-white">
            {detailRows.map((row, index) => (
              <div
                key={row}
                className={`flex items-center justify-between px-5 py-4 ${
                  index !== detailRows.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="w-full shrink-0 space-y-4 lg:w-72">
          {/* Verification status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <SkeletonBlock className="mb-4 h-4 w-36" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-14" />
                <SkeletonBlock className="h-4 w-16" />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-4 w-10" />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <SkeletonBlock className="h-11 w-full rounded-lg" />
          <SkeletonBlock className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
