"use client";
import {
  financeSection,
  businessSection,
  bookingsSection,
  typeSection,
  ProviderType,
  homeLink,
  NavItem,
} from "@/lib/navconfig";
import { NavLink } from "./NavLink";
import { LogOut } from "lucide-react";

type SidebarProps = {
  providerType: ProviderType; // "hotel" | "apartment" | "bus" — comes from whoever is logged in
};

function withProviderPrefix(
  providerType: ProviderType,
  items: NavItem[],
): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: `/${providerType}${item.href}`,
  }));
}

export function Sidebar({ providerType }: SidebarProps) {
  const homeLinks = withProviderPrefix(providerType, homeLink);
  const businessLinks = withProviderPrefix(providerType, businessSection);
  const typeSpecificLinks = withProviderPrefix(
    providerType,
    typeSection[providerType].items,
  );
  const bookingsLinks = withProviderPrefix(providerType, bookingsSection);
  const financeLinks = withProviderPrefix(providerType, financeSection);

  function handleLogout() {
    // TODO: replace with real logout logic once auth exists
    // e.g. call your sign-out endpoint, then redirect to /login
    console.log("logging out...");
  }

  return (
    <div className="flex h-screen w-60 flex-col justify-between bg-slate-900 py-6 text-slate-400 overflow-auto">
      <nav>
        <div className="mb-2 flex items-center gap-2 px-5 pb-6">
          <span className="h-5 w-5 rounded-md bg-orange-500" />
          <span className="text-base font-semibold text-white">
            poemBooking
          </span>
        </div>

        <div className="flex flex-col gap-1 px-3">
          {/* Links every provider sees, regardless of type */}
          {homeLinks.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Business
        </p>

        <div className="flex flex-col gap-1 px-3">
          {/* Links every provider sees, regardless of type */}
          {businessLinks.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        {/* Only the section matching this provider's type */}
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {typeSection[providerType].label}
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
          {bookingsLinks.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
        <p className="mb-1 mt-5 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          General
        </p>
        <div className="flex flex-col gap-1 px-3">
          {financeLinks.map((item) => (
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
