import type { IconName } from "./icon-map";

export type ProviderType = "hotel" | "apartment" | "bus" | "restaurant";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

// The single "Dashboard Home" link, shown with no section label above it.
export const homeLink: NavItem[] = [
  {
    label: "Dashboard Home",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
];

export const businessSection: NavItem[] = [
  { label: "Profile", href: "/profile", icon: "Users" },
  { label: "Verification", href: "/verification", icon: "ShieldCheck" },
  { label: "Staff Management", href: "/staffs", icon: "Users" },
];

export const typeSection: Record<
  ProviderType,
  { label: string; items: NavItem[] }
> = {
  hotel: {
    label: "HOTELS",
    items: [
      { label: "Room Type", href: "/roomtypes", icon: "BedDouble" },
      { label: "Add Room Type", href: "/roomtypes/new", icon: "Plus" },
      /* { label: "Hotels", href: "/hotels", icon: "House" },
      { label: "Room Types", href: "/roomtypes", icon: "Home" },
      { label: "Availability", href: "/availability", icon: "House" }, */
    ],
  },
  apartment: {
    label: "APARTMENTS",
    items: [{ label: "Properties", href: "/properties", icon: "Home" }],
  },
  bus: {
    label: "TRANSPORT",
    items: [
      { label: "Buses", href: "/buses", icon: "Bus" },
      { label: "Routes", href: "/routes", icon: "Route" },
      { label: "Trips", href: "/trips", icon: "Map" },
    ],
  },
  restaurant: {
    label: "RESTAURANTS",
    items: [
      { label: "Menu", href: "/menu", icon: "UtensilsCrossed" },
      { label: "Tables", href: "/tables", icon: "Armchair" },
    ],
  },
};

// Section 3: BOOKINGS — same for every provider type.
export const bookingsSection: NavItem[] = [
  { label: "Bookings", href: "/bookings", icon: "ClipboardList" },
];

// Section 4: FINANCE — same for every provider type.
export const financeSection: NavItem[] = [
  { label: "Revenue", href: "/revenue", icon: "DollarSign" },
  { label: "Refunds", href: "/refunds", icon: "Undo2" },
  { label: "Reviews", href: "/reviews", icon: "Star" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];
