import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import type { ProviderType } from "@/lib/navconfig";

const mockProvider: {
  name: string;
  hotel: string;
  role: string;
  provider_type: ProviderType;
} = {
  name: "John Doe",
  hotel: "Long Bridge Hotel",
  role: "provider",
  provider_type: "apartment",
};

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = mockProvider;

  return (
    <div className="flex h-screen text-black">
      <Sidebar providerType={provider.provider_type} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          breadcrumb={["Home", provider.hotel]}
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
