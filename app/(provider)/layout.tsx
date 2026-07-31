// app/(provider)/layout.tsx
//
// ONE layout for every page under (provider) — dashboard, rooms,
// properties, buses, bookings, revenue, everything.
//
// TEMPORARY: there's no backend yet, so we're hardcoding a fake provider
// below. Once the backend exists, delete the mockProvider object and
// uncomment the real fetch — nothing else in this file needs to change.

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import type { ProviderType } from "@/lib/navconfig";

const mockProvider: {
  name: string;
  role: string;
  provider_type: ProviderType;
} = {
  name: "John Doe",
  role: "provider",
  provider_type: "hotel", // change this to "apartment" | "bus" | "restaurant" to test other sidebars
};

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = mockProvider; // later: const provider = await getProviderFromSession();

  return (
    <div className="flex h-screen">
      <Sidebar providerType={provider.provider_type} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          breadcrumb={["Home", "Provider Dashboard"]}
          userName={provider.name}
          userRole={provider.role}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
