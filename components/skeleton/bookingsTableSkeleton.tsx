import { Card } from "../providerui/card";
import { SkeletonBlock } from "./skeletonBlock";

export function BookingsTableSkeleton() {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <SkeletonBlock className="h-5 w-40" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-8 w-20" />
          <SkeletonBlock className="h-8 w-20" />
          <SkeletonBlock className="h-8 w-28" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-24" />
          </div>
        ))}
      </div>
    </Card>
  );
}
