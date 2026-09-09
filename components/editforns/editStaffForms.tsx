"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Shield,
  CheckCircle2,
  Lock,
  Save,
} from "lucide-react";

// ----------------------------- Types -----------------------------

type StaffRole =
  | "Owner"
  | "Manager"
  | "Accountant"
  | "Receptionist"
  | "Housekeeping";
type StaffStatus = "Active" | "Inactive";

type PermissionItem = { label: string; granted: boolean };
type PermissionGroup = { title: string; items: PermissionItem[] };

export type EditableStaffMember = {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: StaffRole;
  permissionTemplate: string;
  status: StaffStatus;
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

// ----------------------------- Main component -----------------------------

export default function EditStaffForm({
  staff,
}: {
  staff: EditableStaffMember;
  onBack?: () => void;
  onSave?: (data: EditableStaffMember) => void;
}) {
  const [form, setForm] = useState<EditableStaffMember>(staff);
  const [saved, setSaved] = useState<EditableStaffMember>(staff);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof EditableStaffMember>(
    field: K,
    value: EditableStaffMember[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const previewGroups = form.role ? rolePermissionPreview[form.role] : null;

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  async function handleSubmit() {
    if (!isDirty) return;
    setIsSubmitting(true);
    try {
      // await api.updateStaffMember(form);
      setSaved(form);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <button
        type="button"
        className="mb-3 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={14} /> Back to Staff Management
      </button>

      <h1 className="text-2xl font-bold text-gray-900">
        {form.role
          ? `Permissions Preview - ${form.role} Role`
          : "Edit Staff Member"}
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-gray-500">
        Update this staff member's details, role, and system permissions.
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
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </FieldLabel>

            <FieldLabel label="Email Address">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
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
                  onChange={(e) => update("role", e.target.value as StaffRole)}
                  className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
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

            <div className="border-t border-gray-100 pt-5">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                Account Status
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.status === "Active"}
                  onClick={() =>
                    update(
                      "status",
                      form.status === "Active" ? "Inactive" : "Active",
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    form.status === "Active" ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      form.status === "Active"
                        ? "translate-x-0"
                        : "-translate-x-5"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">
                  {form.status === "Active"
                    ? "Active — has access to the Management Portal"
                    : "Inactive — cannot access the Management Portal"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions preview panel */}
        <div className="h-fit rounded-xl border border-gray-200 bg-gray-50/60 p-5">
          <div className="mb-1 flex items-center gap-2">
            <Shield size={16} className="text-orange-500" />
            <h2 className="text-sm font-semibold text-gray-900">
              Permissions Preview
            </h2>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            Reflects the access levels and system permissions currently assigned
            to this staff member based on their role.
          </p>

          <div className="border-t border-gray-200 pt-4">
            {!previewGroups ? (
              <p className="text-sm text-gray-400">
                Awaiting role selection...
              </p>
            ) : (
              <div className="space-y-4">
                {previewGroups.map((group) => (
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
                            <Lock
                              size={13}
                              className="shrink-0 text-gray-300"
                            />
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
      </div>

      {/* Footer actions */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={15} />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ----------------------------- Subcomponents -----------------------------

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
