// components/verificationCard.tsx
//
// The Verification Documents table. Search/filter/upload button are
// currently just visual — no real search filtering or upload logic
// wired up yet, since there's no backend to search/upload to.

"use client";

import {
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { mockVerificationDocuments } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import type { DocumentStatus } from "@/lib/types";
import { Card } from "../providerui/card";

// A small local badge, separate from the booking StatusBadge — this
// page has different statuses (verified/pending/missing), not the
// same ones bookings use (confirmed/pending/completed/cancelled).
const statusStyles: Record<DocumentStatus, string> = {
  verified: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  missing: "bg-red-50 text-red-700",
};

const statusLabels: Record<DocumentStatus, string> = {
  verified: "Verified",
  pending: "Pending",
  missing: "Missing",
};

function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function VerificationCard() {
  const documents = mockVerificationDocuments;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Business / Verification</p>
          <h1 className="text-xl font-bold text-slate-900">
            Verification Documents
          </h1>
          <p className="text-sm text-slate-500">
            Uploaded compliance documents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-48 rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <button className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50">
            <SlidersHorizontal size={16} />
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600">
            <Plus size={16} />
            Upload Document
          </button>
        </div>
      </div>

      {/* Table */}
      <Card className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Document</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Uploaded</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="px-5 py-4 font-medium text-slate-900">
                  {doc.name}
                </td>
                <td className="px-5 py-4 text-slate-500">{doc.type}</td>
                <td className="px-5 py-4 text-slate-500">
                  {doc.uploadedDate ? formatDate(doc.uploadedDate) : "—"}
                </td>
                <td className="px-5 py-4">
                  <DocumentStatusBadge status={doc.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3 text-slate-400">
                    <button className="hover:text-slate-700">
                      <Eye size={15} />
                    </button>
                    <button className="hover:text-slate-700">
                      <Pencil size={15} />
                    </button>
                    <button className="hover:text-red-500">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default VerificationCard;
