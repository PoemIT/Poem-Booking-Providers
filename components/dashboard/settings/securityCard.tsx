import { useState } from "react";
import { Laptop, Smartphone } from "lucide-react";
import { ActiveSession, PasswordForm, TwoFAMethod } from "@/lib/types";
import { Card } from "@/components/providerui/card";
import { ToggleRow } from "./toggle";

const twoFALabels: Record<TwoFAMethod, { label: string; description: string }> =
  {
    email: {
      label: "Email 2FA",
      description: "Receive verification codes via your registered email.",
    },
    sms: {
      label: "SMS 2FA",
      description: "Receive codes via SMS to your primary phone number.",
    },
    whatsapp: {
      label: "WhatsApp 2FA",
      description: "Secure, encrypted verification codes via WhatsApp.",
    },
  };

const mockSessions: ActiveSession[] = [
  {
    id: "s1",
    device: "MacBook Pro",
    browser: "Safari",
    location: "Yaounde, CM • IP: 197.234.xx.xx",
    lastActive: "",
    isCurrent: true,
  },
  {
    id: "s2",
    device: "iPhone 13",
    browser: "Safari",
    location: "Douala, CM • Oct 23, 14:00",
    lastActive: "Oct 23, 14:00",
    isCurrent: false,
  },
];

export function SecurityCard() {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [twoFA, setTwoFA] = useState<Record<TwoFAMethod, boolean>>({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const [sessions, setSessions] = useState<ActiveSession[]>(mockSessions);

  function toggleTwoFA(method: TwoFAMethod) {
    setTwoFA((prev) => ({ ...prev, [method]: !prev[method] }));
    // await api.updateTwoFA(method, !twoFA[method]);
  }

  async function handleUpdatePassword() {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) return;
    setIsUpdatingPassword(true);
    try {
      // await api.updatePassword(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  function revokeSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    // await api.revokeSession(id);
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Security Settings
          </h2>
          <p className="text-sm text-slate-500">
            Manage passwords, 2FA, and active sessions.
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
          Last modified: M. Dubois (Oct 24)
        </span>
      </div>

      {/* Change password */}
      <h3 className="mb-3 text-sm font-medium text-slate-700">
        Change Password
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-slate-600">
            Current Password
          </span>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-slate-600">
            New Password
          </span>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={handleUpdatePassword}
        disabled={
          !passwordForm.currentPassword ||
          !passwordForm.newPassword ||
          isUpdatingPassword
        }
        className="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUpdatingPassword ? "Updating..." : "Update Password"}
      </button>

      <div className="my-5 border-t border-slate-100" />

      {/* Two-factor authentication */}
      <h3 className="mb-1 text-sm font-medium text-slate-700">
        Two-Factor Authentication (2FA)
      </h3>
      <div className="divide-y divide-slate-100">
        {(Object.keys(twoFALabels) as TwoFAMethod[]).map((method) => (
          <ToggleRow
            key={method}
            label={twoFALabels[method].label}
            description={twoFALabels[method].description}
            checked={twoFA[method]}
            onChange={() => toggleTwoFA(method)}
          />
        ))}
      </div>

      <div className="my-5 border-t border-slate-100" />

      {/* Active sessions */}
      <h3 className="mb-3 text-sm font-medium text-slate-700">
        Active Sessions
      </h3>
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {session.device.includes("iPhone") ? (
                <Smartphone size={16} className="text-slate-400" />
              ) : (
                <Laptop size={16} className="text-slate-400" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {session.device} - {session.browser}
                </p>
                <p className="text-xs text-slate-500">{session.location}</p>
              </div>
            </div>

            {session.isCurrent ? (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
                Current Session
              </span>
            ) : (
              <button
                type="button"
                onClick={() => revokeSession(session.id)}
                className="text-xs font-medium text-red-500 hover:text-red-600"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
