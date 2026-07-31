// components/dashboard/quickActions.tsx
//
// Simple static buttons — no fetching, no state. Just a list of
// {icon, title, description, href} that gets mapped into clickable cards.
// Add or remove an action by editing the "actions" array below.

import Link from "next/link";
import {
  Plus,
  CalendarClock,
  ClipboardList,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../providerui/card";

type QuickAction = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const actions: QuickAction[] = [
  {
    icon: Plus,
    title: "Add Room",
    description: "List a new room or suite",
    href: "/rooms/new",
  },
  {
    icon: CalendarClock,
    title: "Update Availability",
    description: "Manage dates & inventory",
    href: "/availability",
  },
  {
    icon: ClipboardList,
    title: "View Bookings",
    description: "All reservations overview",
    href: "/bookings",
  },
  {
    icon: Wallet,
    title: "View Payments",
    description: "Revenue & transactions",
    href: "/payments",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="flex items-center gap-3 transition-shadow hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white">
              <action.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {action.title}
              </p>
              <p className="text-xs text-slate-500">{action.description}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
