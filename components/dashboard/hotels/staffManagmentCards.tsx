"use client";

import { useMemo, useState } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  Mail,
  Download,
  UserPlus,
  Search,
  ChevronDown,
  Pencil,
  Shield,
  Trash2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { StaffMember, StaffRole, StaffStatus } from "@/lib/types";
import Link from "next/link";

// ----------------------------- Types -----------------------------

// ----------------------------- Config -----------------------------

const ROLES: StaffRole[] = [
  "Owner",
  "Manager",
  "Accountant",
  "Receptionist",
  "Housekeeping",
];
const DEPARTMENTS = [
  "Executive",
  "Operations",
  "Finance",
  "Front Desk",
  "Housekeeping",
];

const roleBadgeStyles: Record<StaffRole, string> = {
  Owner: "bg-slate-100 text-slate-700",
  Manager: "bg-orange-100 text-orange-700",
  Accountant: "bg-slate-100 text-slate-700",
  Receptionist: "bg-slate-100 text-slate-700",
  Housekeeping: "bg-slate-100 text-slate-700",
};

// ----------------------------- Mock data -----------------------------

const firstNames = [
  "Arthur",
  "Sarah",
  "Marcus",
  "David",
  "Aicha",
  "Nadia",
  "Paul",
  "Claire",
  "Henri",
  "Sophie",
  "Jean",
  "Marie",
  "Amadou",
  "Fatou",
  "Yves",
  "Diane",
  "Eric",
  "Grace",
  "Samuel",
  "Julie",
];
const lastNames = [
  "Pendleton",
  "Jenkins",
  "Rivera",
  "Chen",
  "Njoya",
  "Fouda",
  "Biyong",
  "Ondo",
  "Etoundi",
  "Ateba",
  "Mbida",
  "Nguema",
  "Toumani",
  "Diallo",
  "Ngo",
  "Kamga",
  "Talla",
  "Meka",
  "Ebong",
  "Fotso",
];

function buildMockStaff(): StaffMember[] {
  return firstNames.map((first, i) => {
    const last = lastNames[i];
    const role = ROLES[i % ROLES.length];
    const department = DEPARTMENTS[i % DEPARTMENTS.length];
    return {
      id: `staff-${i + 1}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@grandhorizon.com`,
      role,
      department,
      status: i === 2 ? "Inactive" : "Active",
      onDuty: i % 3 === 0,
    };
  });
}

const initialStaff = buildMockStaff();

// ----------------------------- Helpers -----------------------------

const avatarColors = [
  "bg-rose-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
];

function getAvatarColor(name: string) {
  const hash = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const PAGE_SIZE = 4;

// ----------------------------- Main component -----------------------------

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<StaffRole | "All Roles">(
    "All Roles",
  );
  const [statusFilter, setStatusFilter] = useState<StaffStatus | "All Status">(
    "All Status",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [deactivateTarget, setDeactivateTarget] = useState<StaffMember | null>(
    null,
  );

  const [editTarget, setEditTarget] = useState<StaffMember | null>(null);
  const [editDraft, setEditDraft] = useState<StaffMember | null>(null);

  // ---- derived data ----

  const filteredStaff = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return staff.filter((member) => {
      const matchesQuery =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);
      const matchesRole =
        roleFilter === "All Roles" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "All Status" || member.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [staff, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedStaff = filteredStaff.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const stats = useMemo(
    () => ({
      total: staff.length,
      active: staff.filter((m) => m.status === "Active").length,
      onDuty: staff.filter((m) => m.onDuty && m.status === "Active").length,
      pendingInvites: 6,
    }),
    [staff],
  );

  // ---- permissions modal ----

  function confirmDeactivate() {
    if (!deactivateTarget) return;
    setStaff((prev) =>
      prev.map((m) =>
        m.id === deactivateTarget.id
          ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
          : m,
      ),
    );
    setDeactivateTarget(null);
  }

  // ---- edit modal ----

  function openEdit(member: StaffMember) {
    setEditTarget(member);
    setEditDraft(member);
  }

  function saveEdit() {
    if (!editDraft) return;
    setStaff((prev) =>
      prev.map((m) => (m.id === editDraft.id ? editDraft : m)),
    );
    setEditTarget(null);
    setEditDraft(null);
  }

  // ---- export ----

  function handleExport() {
    const header = "Name,Email,Role,Department,Status\n";
    const rows = filteredStaff
      .map(
        (m) =>
          `"${m.name}","${m.email}","${m.role}","${m.department}","${m.status}"`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-500">
            Manage your hotel personnel, roles, and access permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download size={15} /> Export
          </button>
          <Link href="/hotel/staffs/new">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              <UserPlus size={15} /> Invite Staff
            </button>
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="TOTAL STAFF"
          value={stats.total}
          icon={Users}
          accent="border-t-slate-800"
          iconBg="bg-slate-100 text-slate-600"
        />
        <StatCard
          label="ACTIVE"
          value={stats.active}
          icon={CheckCircle2}
          accent="border-t-emerald-500"
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="ON DUTY"
          value={stats.onDuty}
          icon={Clock}
          accent="border-t-orange-400"
          iconBg="bg-orange-50 text-orange-500"
        />
        <StatCard
          label="PENDING INVITES"
          value={stats.pendingInvites}
          icon={Mail}
          accent="border-t-gray-200"
          iconBg="bg-gray-100 text-gray-500"
        />
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Search + filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
          <div className="relative w-full max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search staff by name or email..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <FilterDropdown
              value={roleFilter}
              onChange={(v) => {
                setRoleFilter(v as StaffRole | "All Roles");
                setCurrentPage(1);
              }}
              options={["All Roles", ...ROLES]}
            />
            <FilterDropdown
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v as StaffStatus | "All Status");
                setCurrentPage(1);
              }}
              options={["All Status", "Active", "Inactive"]}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="w-10 px-4 py-3"></th>
                <th className="px-2 py-3 font-medium">Staff Member</th>
                <th className="px-2 py-3 font-medium">Role</th>
                <th className="px-2 py-3 font-medium">Department</th>
                <th className="px-2 py-3 font-medium">Status</th>
                <th className="px-2 py-3 pr-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    No staff members match your search.
                  </td>
                </tr>
              ) : (
                paginatedStaff.map((member) => (
                  <tr key={member.id}>
                    <td className="px-4 py-3"></td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(
                            member.name,
                          )}`}
                        >
                          {getInitials(member.name)}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleBadgeStyles[member.role]}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      {member.department}
                    </td>
                    <td className="px-2 py-3">
                      {member.status === "Active" ? (
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(member)}
                          aria-label={`Edit ${member.name}`}
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeactivateTarget(member)}
                          aria-label={`Deactivate ${member.name}`}
                          className="rounded-md p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {filteredStaff.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(safePage * PAGE_SIZE, filteredStaff.length)} of{" "}
            {filteredStaff.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                    page === safePage
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            {totalPages > 5 && <span className="px-1 text-gray-400">…</span>}
            {totalPages > 5 && (
              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                  totalPages === safePage
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {totalPages}
              </button>
            )}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Deactivate confirm modal */}
      {deactivateTarget && (
        <Modal onClose={() => setDeactivateTarget(null)} maxWidth="max-w-sm">
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <AlertTriangle size={22} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {deactivateTarget.status === "Active"
                ? "Deactivate Staff Member?"
                : "Reactivate Staff Member?"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {deactivateTarget.status === "Active"
                ? "Are you sure you want to deactivate this staff member? They will lose access to the Management Portal immediately. This action can be reversed by an administrator later."
                : "This will restore this staff member's access to the Management Portal."}
            </p>
          </div>
          <div className="flex justify-center gap-2 border-t border-gray-100 p-4">
            <button
              type="button"
              onClick={() => setDeactivateTarget(null)}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDeactivate}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              {deactivateTarget.status === "Active"
                ? "Deactivate Member"
                : "Reactivate Member"}
            </button>
          </div>
        </Modal>
      )}

      {/* Edit staff modal */}
      {editTarget && editDraft && (
        <Modal onClose={() => setEditTarget(null)} maxWidth="max-w-md">
          <div className="flex items-center justify-between border-b border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Staff Member
            </h2>
            <button
              type="button"
              onClick={() => setEditTarget(null)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4 p-5">
            <TextField
              label="Full Name"
              value={editDraft.name}
              onChange={(v) =>
                setEditDraft((prev) => prev && { ...prev, name: v })
              }
            />
            <TextField
              label="Email"
              value={editDraft.email}
              onChange={(v) =>
                setEditDraft((prev) => prev && { ...prev, email: v })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-sm text-gray-600">Role</span>
                <select
                  value={editDraft.role}
                  onChange={(e) =>
                    setEditDraft(
                      (prev) =>
                        prev && { ...prev, role: e.target.value as StaffRole },
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mb-1.5 block text-sm text-gray-600">
                  Department
                </span>
                <select
                  value={editDraft.department}
                  onChange={(e) =>
                    setEditDraft(
                      (prev) => prev && { ...prev, department: e.target.value },
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-100 p-4">
            <button
              type="button"
              onClick={() => setEditTarget(null)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ----------------------------- Subcomponents -----------------------------

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  iconBg,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  iconBg: string;
}) {
  return (
    <div
      className={`rounded-xl border border-t-4 border-gray-200 bg-white p-4 ${accent}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon size={14} />
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-orange-500" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-gray-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
      />
    </label>
  );
}

function Modal({
  children,
  onClose,
  maxWidth = "max-w-md",
}: {
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-xl bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
