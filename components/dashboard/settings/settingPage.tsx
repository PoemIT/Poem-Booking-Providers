"use client";

import { useState } from "react";
import {
  Briefcase,
  Shield,
  Bell,
  Landmark,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { SettingsTab } from "@/lib/types";
import { BusinessProfileCard } from "@/components/dashboard/settings/businessProfileForm";
import { SecurityCard } from "@/components/dashboard/settings/securityCard";
import { PaymentMethodsCard } from "@/components/dashboard/settings/paymntMethodCard";
import { AuditLogsCard } from "@/components/dashboard/settings/auditLogCard";
import { NotificationsCard } from "./notificationsCard";

const tabs: { id: SettingsTab; label: string; icon: LucideIcon }[] = [
  { id: "business-profile", label: "Business Profile", icon: Briefcase },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payment-methods", label: "Payment Methods", icon: Landmark },
  { id: "audit-logs", label: "Audit Logs", icon: ScrollText },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("business-profile");

  return (
    <div className="mx-auto p-6 text-black">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            System Settings
          </h1>
          <p className="text-sm text-slate-500">
            Manage your enterprise configuration and preferences.
          </p>
        </div>
        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-sm">
          <button className="bg-white px-3 py-1.5 font-medium text-slate-900">
            EN
          </button>
          <button className="bg-slate-50 px-3 py-1.5 text-slate-500 hover:bg-slate-100">
            FR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <nav className="h-fit rounded-xl border border-slate-100 bg-white p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xl font-medium transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Active section */}
        <div className="space-y-6">
          {activeTab === "business-profile" && <BusinessProfileCard />}
          {activeTab === "security" && <SecurityCard />}
          {activeTab === "notifications" && <NotificationsCard />}
          {activeTab === "payment-methods" && <PaymentMethodsCard />}
          {activeTab === "audit-logs" && <AuditLogsCard />}
        </div>
      </div>
    </div>
  );
}
