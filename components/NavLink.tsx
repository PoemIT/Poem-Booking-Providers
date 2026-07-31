// components/NavLink.tsx
//
// One single link in the sidebar. Doesn't know or care whether it's
// a "hotel" link or a "bookings" link — it just renders whatever
// label/href/icon it's given, and highlights itself if it's the active page.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "@/lib/icon-map";
import { NavItem } from "@/lib/navconfig";

export function NavLink({ label, href, icon }: NavItem) {
  const pathname = usePathname(); // e.g. "/hotel-dashboard/rooms" — the CURRENT url
  const isActive = pathname === href; // true only if this link IS the current page

  const Icon = iconMap[icon]; // turns "BedDouble" (a string) into the real <BedDouble /> component

  return (
    <Link
      href={href}
      className={[
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
        isActive
          ? "bg-orange-500 font-medium text-slate-900 shadow-sm"
          : "text-slate-300 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <Icon
        size={18}
        strokeWidth={isActive ? 2.5 : 2}
        className={
          isActive ? "text-slate-900" : "text-slate-400 group-hover:text-white"
        }
      />
      {label}
    </Link>
  );
}
