"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Shield,
  CheckCircle2,
  Lock,
  RefreshCw,
  UserPlus,
} from "lucide-react";

// ----------------------------- Types -----------------------------

type StaffRole =
  | "Owner"
  | "Manager"
  | "Accountant"
  | "Receptionist"
  | "Housekeeping";

type PermissionItem = { label: string; granted: boolean };
type PermissionGroup = { title: string; items: PermissionItem[] };

type NewStaffFormState = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: StaffRole | "";
  permissionTemplate: string;
  personalMessage: string;
  sendViaEmail: boolean;
  sendViaSms: boolean;
  temporaryPassword: string;
};

// ----------------------------- Config -----------------------------

const ROLES: StaffRole[] = [
  "Owner",
  "Manager",
  "Accountant",
  "Receptionist",
  "Housekeeping",
];

const permissionTemplates = [
  "Standard Access",
  "Full Access",
  "Restricted",
  "Custom",
];

const countryCodes = [{ label: "CMR +237", value: "+237" }];

const rolePermissionPreview: Record<StaffRole, PermissionGroup[]> = {
  Owner: [
    {
      title: "DASHBOARD",
      items: [{ label: "Full access to stats and overview", granted: true }],
    },
    {
      title: "STAFF MANAGEMENT",
      items: [
        { label: "View team & edit roles", granted: true },
        { label: "Invite new members", granted: true },
        { label: "Delete or transfer owners", granted: true },
      ],
    },
    {
      title: "VERIFICATION",
      items: [
        { label: "Upload documents & view status", granted: true },
        { label: "Approve or reject verifications", granted: true },
      ],
    },
    {
      title: "REPORTS",
      items: [
        { label: "Generate monthly reports", granted: true },
        { label: "View inventory logs", granted: true },
        { label: "View financial summaries", granted: true },
      ],
    },
  ],
  Manager: [
    {
      title: "DASHBOARD",
      items: [{ label: "Full access to stats and overview", granted: true }],
    },
    {
      title: "STAFF MANAGEMENT",
      items: [
        { label: "View team & edit roles", granted: true },
        { label: "Invite new members", granted: true },
        { label: "Cannot delete owners", granted: false },
      ],
    },
    {
      title: "VERIFICATION",
      items: [
        { label: "Upload documents & view status", granted: true },
        { label: "Request re-uploads", granted: true },
      ],
    },
    {
      title: "REPORTS",
      items: [
        { label: "Generate monthly reports", granted: true },
        { label: "View inventory logs", granted: true },
      ],
    },
  ],
  Accountant: [
    {
      title: "DASHBOARD",
      items: [{ label: "View financial summaries only", granted: true }],
    },
    {
      title: "STAFF MANAGEMENT",
      items: [
        { label: "View team roster", granted: true },
        { label: "Cannot edit roles", granted: false },
      ],
    },
    {
      title: "VERIFICATION",
      items: [{ label: "Cannot process verifications", granted: false }],
    },
    {
      title: "REPORTS",
      items: [
        { label: "Generate financial reports", granted: true },
        { label: "Export transaction history", granted: true },
      ],
    },
  ],
  Receptionist: [
    {
      title: "DASHBOARD",
      items: [{ label: "View today's bookings only", granted: true }],
    },
    {
      title: "STAFF MANAGEMENT",
      items: [{ label: "No staff management access", granted: false }],
    },
    {
      title: "VERIFICATION",
      items: [{ label: "Upload guest ID documents", granted: true }],
    },
    {
      title: "REPORTS",
      items: [{ label: "No report access", granted: false }],
    },
  ],
  Housekeeping: [
    {
      title: "DASHBOARD",
      items: [{ label: "View room status board only", granted: true }],
    },
    {
      title: "STAFF MANAGEMENT",
      items: [{ label: "No staff management access", granted: false }],
    },
    {
      title: "VERIFICATION",
      items: [{ label: "No verification access", granted: false }],
    },
    {
      title: "REPORTS",
      items: [{ label: "No report access", granted: false }],
    },
  ],
};

const initialState: NewStaffFormState = {
  fullName: "",
  email: "",
  countryCode: "+237",
  phoneNumber: "",
  role: "",
  permissionTemplate: "",
  personalMessage: "",
  sendViaEmail: true,
  sendViaSms: false,
  temporaryPassword: "",
};

// ----------------------------- Helpers -----------------------------

function generateSecurePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
  let result = "";
  for (let i = 0; i < 14; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// ----------------------------- Main component -----------------------------

export default function NewStaffForm({
  onBack,
  onCreate,
}: {
  onBack?: () => void;
  onCreate?: (data: NewStaffFormState) => void;
}) {
  const [form, setForm] = useState<NewStaffFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof NewStaffFormState>(
    field: K,
    value: NewStaffFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const previewGroups = form.role ? rolePermissionPreview[form.role] : null;

  const isValid = useMemo(
    () =>
      form.fullName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.role !== "",
    [form.fullName, form.email, form.role],
  );

  async function handleSubmit() {
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      // await api.createStaffMember(form);
      onCreate?.(form);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={14} /> Back to Staff Management
      </button>

      <h1 className="text-2xl font-bold text-gray-900">
        {form.role
          ? `Permissions Preview - ${form.role} Role`
          : "Create New Staff Member"}
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-gray-500">
        Register a new staff member and generate their login credentials. The
        credentials will be securely sent to the user.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Form card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="space-y-5">
            <FieldLabel label="Full Name">
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </FieldLabel>

            <FieldLabel label="Email Address">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane.doe@grandhorizon.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </FieldLabel>

            <FieldLabel label="Phone Number">
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={form.countryCode}
                    onChange={(e) => update("countryCode", e.target.value)}
                    className="h-full appearance-none rounded-lg border border-gray-200 py-2 pl-3 pr-8 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => update("phoneNumber", e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
            </FieldLabel>

            <FieldLabel label="Role Selection">
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) =>
                    update("role", e.target.value as StaffRole | "")
                  }
                  className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option value="">Select a role...</option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </FieldLabel>

            <FieldLabel label="Permission Selection">
              <div className="relative">
                <select
                  value={form.permissionTemplate}
                  onChange={(e) => update("permissionTemplate", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option value="">Select Permission...</option>
                  {permissionTemplates.map((template) => (
                    <option key={template} value={template}>
                      {template}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </FieldLabel>

            <FieldLabel label="Personal Message (optional)">
              <textarea
                value={form.personalMessage}
                onChange={(e) => update("personalMessage", e.target.value)}
                placeholder="Add a welcome message to the invitation email..."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </FieldLabel>

            <div className="border-t border-gray-100 pt-5">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                Credential Delivery
              </span>
              <div className="flex items-center gap-6">
                <CheckboxLabel
                  label="Send via Email"
                  checked={form.sendViaEmail}
                  onChange={() => update("sendViaEmail", !form.sendViaEmail)}
                />
                <CheckboxLabel
                  label="Send via SMS"
                  checked={form.sendViaSms}
                  onChange={() => update("sendViaSms", !form.sendViaSms)}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
                Temporary Password
              </span>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={form.temporaryPassword}
                  readOnly
                  placeholder="Generate a password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm tracking-widest outline-none placeholder:tracking-normal placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() =>
                    update("temporaryPassword", generateSecurePassword())
                  }
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw size={14} /> Generate Secure Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions preview panel */}
        <PermissionsPreviewPanel groups={previewGroups} />
      </div>

      {/* Footer actions */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UserPlus size={15} />
          {isSubmitting ? "Creating..." : "Create Account & Send Credentials"}
        </button>
      </div>
    </div>
  );
}

// ----------------------------- Subcomponents -----------------------------

export function PermissionsPreviewPanel({
  groups,
}: {
  groups: PermissionGroup[] | null;
}) {
  return (
    <div className="h-fit rounded-xl border border-gray-200 bg-gray-50/60 p-5">
      <div className="mb-1 flex items-center gap-2">
        <Shield size={16} className="text-orange-500" />
        <h2 className="text-sm font-semibold text-gray-900">
          Permissions Preview
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Select a role to view the specific access levels and system permissions
        that will be assigned to this new staff member.
      </p>

      <div className="border-t border-gray-200 pt-4">
        {!groups ? (
          <p className="text-sm text-gray-400">Awaiting role selection...</p>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-1.5 text-xs font-semibold tracking-wide text-gray-500">
                  {group.title}
                </p>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 text-sm ${
                        item.granted ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {item.granted ? (
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-orange-500"
                        />
                      ) : (
                        <Lock size={13} className="shrink-0 text-gray-300" />
                      )}
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function CheckboxLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 accent-orange-500"
      />
      {label}
    </label>
  );
}
