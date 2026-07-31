"use client";

import { useState } from "react";
import { iconMap } from "@/lib/icon-map";

type HeaderProps = {
  breadcrumb: string[]; // e.g. ["Home", "Provider Dashboard"]
  userName: string;
  userRole: string;
};

export function Header({ breadcrumb, userName, userRole }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const Bell = iconMap.Bell;
  const Search = iconMap.Search;
  const ChevronDown = iconMap.ChevronDown;

  return (
    <header className="flex h-16 items-center justify-between gap-6 border-b border-slate-200 bg-white px-6">
      {/* Breadcrumb */}
      <nav className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500">
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-300">/</span>}
            <span
              className={
                i === breadcrumb.length - 1
                  ? "font-medium text-slate-900"
                  : "text-slate-500"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search bookings, rooms, guests..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
        />
      </div>

      {/* Right side: notifications, toggle, user */}
      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={darkMode}
          onClick={() => setDarkMode((v) => !v)}
          className={[
            "relative h-6 w-11 rounded-full transition-colors",
            darkMode ? "bg-slate-900" : "bg-slate-200",
          ].join(" ")}
        >
          <span
            className={[
              "absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
              darkMode ? "translate-x-5" : "translate-x-0.5",
            ].join(" ")}
          />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
            {userName.charAt(0)}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-slate-900">
              {userName}
            </span>
            <span className="block text-xs leading-tight text-slate-500">
              {userRole}
            </span>
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
