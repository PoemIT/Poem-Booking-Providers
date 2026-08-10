"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "@/lib/icon-map";
import { NavItem } from "@/lib/navconfig";

export function NavLink({ label, href, icon }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = iconMap[icon];
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
