"use client";
import {
  financeSection,
  businessSection,
  bookingsSection,
  typeSection,
  ProviderType,
  homeLink,
} from "@/lib/navconfig";
import { NavLink } from "./NavLink";
import { LogOut } from "lucide-react";

type SidebarProps = {
  providerType: ProviderType; // "hotel" | "apartment" | "bus" — comes from whoever is logged in
};

export function Sidebar({ providerType }: SidebarProps) {
  const typeSpecificLinks = typeSection[providerType].items;

  function handleLogout() {
    // TODO: replace with real logout logic once auth exists
    // e.g. call your sign-out endpoint, then redirect to /login
    console.log("logging out...");
  }

  return (
    <div className="flex h-screen w-60 flex-col justify-between bg-slate-900 py-6 text-slate-400">
      <nav>
        <div className="mb-2 flex items-center gap-2 px-5 pb-6">
          <span className="h-5 w-5 rounded-md bg-orange-500" />
          <span className="text-base font-semibold text-white">
            poemBooking
          </span>
        </div>

        <div className="flex flex-col gap-1 px-3">
          {/* Links every provider sees, regardless of type */}
          {homeLink.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Business
        </p>

        <div className="flex flex-col gap-1 px-3">
          {/* Links every provider sees, regardless of type */}
          {businessSection.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {/* Only the section matching this provider's type */}
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {providerType}
        </p>
        <div className="flex flex-col gap-1 px-3">
          {typeSpecificLinks.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Bookings
        </p>
        <div className="flex flex-col gap-1 px-3">
          {bookingsSection.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          General
        </p>
        <div className="flex flex-col gap-1 px-3">
          {financeSection.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
      </nav>

      {/* Logout — now a real button, same padding/icon size/hover pattern as NavLink */}
      <div className="px-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
}
