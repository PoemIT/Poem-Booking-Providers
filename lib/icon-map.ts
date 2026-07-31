import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Store,
  Settings,
  BedDouble,
  Home,
  Bus,
  Route,
  Map,
  UtensilsCrossed,
  Armchair,
  DollarSign,
  Star,
  Undo2,
  CreditCard,
  ShieldCheck,
  Search,
  Bell,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  LayoutDashboard,
  ClipboardList,
  Users,
  Store,
  Settings,
  BedDouble,
  Home,
  Bus,
  Route,
  Map,
  UtensilsCrossed,
  Armchair,
  DollarSign,
  Star,
  Undo2,
  CreditCard,
  ShieldCheck,
  Search,
  Bell,
  ChevronDown,
} satisfies Record<string, LucideIcon>;

// This gives you a type that's ONLY ever one of the keys above —
// e.g. "LayoutDashboard" | "ClipboardList" | "Users" | ...
// so a typo like "LayotuDashboard" fails at compile time instead of
// silently rendering nothing.
export type IconName = keyof typeof iconMap;
