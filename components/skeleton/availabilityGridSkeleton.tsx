import { Card } from "../providerui/card";
import { SkeletonBlock } from "./skeletonBlock";

export function AvailabilityGridSkeleton() {
  const cards = [1, 2, 3, 4, 5, 6]; // matches the 6 rooms shown in the real grid

  return (
    <div>
      <div className="mb-6">
        <SkeletonBlock className="mb-2 h-6 w-64" />
        <SkeletonBlock className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card} className="overflow-hidden p-0">
            <SkeletonBlock className="h-32 rounded-none" />
            <div className="p-4 pt-6">
              <SkeletonBlock className="mb-2 h-4 w-32" />
              <SkeletonBlock className="mb-4 h-3 w-24" />
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-3 w-14" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
