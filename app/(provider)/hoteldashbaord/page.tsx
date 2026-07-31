// app/(provider)/dashboard/page.tsx
//
// The actual dashboard page. Notice this file has NO fetching logic
// and NO loading/error handling itself — all of that lives inside
// <StatsSection />. This page just arranges page-level layout:
// title, subtitle, date badge, then the stats section.

import { CalendarDays } from "lucide-react";
import { StatsSection } from "@/components/dashboard/statsSection";
import { QuickActions } from "@/components/dashboard/quickActions";
import { formatFullDate } from "@/lib/format";
import { RecentBookingsSection } from "@/components/dashboard/recentBookingsSection";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Provider Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back, Admin User — here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <CalendarDays size={16} className="text-orange-500" />
          {formatFullDate()}
        </div>
      </div>

      <div className="mb-6">
        <StatsSection />
      </div>

      <div className="mb-6">
        <QuickActions />
      </div>

      <RecentBookingsSection />
    </div>
  );
}
