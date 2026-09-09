"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
  X,
  UploadCloud,
  Eye,
  File as FileIcon,
  Download,
  Printer,
  Minus,
  Plus as PlusIcon,
  Maximize,
  RotateCw,
  QrCode,
  Clock,
  Lock,
} from "lucide-react";

// ----------------------------- Types -----------------------------

type DocStatus = "missing" | "pending" | "approved" | "rejected";
type SlotType = "single" | "front_back";
type SlotKey = "single" | "front" | "back";

type UploadedFile = {
  name: string;
  url: string;
};

type VerificationDoc = {
  id: string;
  name: string;
  localName?: string; // French / official name shown in parentheses in the viewer
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  slotType: SlotType;
  status: DocStatus;
  files: Partial<Record<SlotKey, UploadedFile>>;
  documentId?: string;
  uploadedDate?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  validUntil?: string;
  rejectionReason?: string;
};

// ----------------------------- Mock data -----------------------------

const initialDocuments: VerificationDoc[] = [
  {
    id: "business_registration",
    name: "Business Registration",
    description: "Registre de Commerce et du Crédit Mobilier (RCCM)",
    icon: FileText,
    slotType: "single",
    status: "missing",
    files: {},
  },
  {
    id: "tax_certificate",
    name: "Tax Certificate",
    localName: "Carte de Contribuable",
    description: "Carte de Contribuable - Valid until Dec 2024",
    icon: CheckCircle2,
    slotType: "single",
    status: "approved",
    documentId: "TC-CM-2023-8891",
    uploadedDate: "Oct 12, 2023",
    verifiedBy: "A. Mballa (Compliance)",
    verifiedDate: "Oct 14, 2023",
    validUntil: "Dec 2024",
    files: {
      single: {
        name: "tax_certificate.pdf",
        url: "https://picsum.photos/seed/tax-cert/500/350",
      },
    },
  },
  {
    id: "owner_id",
    name: "Owner National ID",
    description: "Scan is blurry. Please re-upload a clear copy.",
    icon: AlertCircle,
    slotType: "front_back",
    status: "rejected",
    rejectionReason: "Scan is blurry. Please re-upload a clear copy.",
    files: {
      front: {
        name: "id_front.jpg",
        url: "https://picsum.photos/seed/id-front/500/350",
      },
      back: {
        name: "id_back.jpg",
        url: "https://picsum.photos/seed/id-back/500/350",
      },
    },
  },
  {
    id: "hotel_license",
    name: "Hotel Authorization License",
    localName: "Autorisation d'Exploitation Hôtelière",
    description: "Operating permit from Ministry of Tourism",
    icon: ShieldCheck,
    slotType: "single",
    status: "pending",
    documentId: "HL-CM-2024-0231",
    uploadedDate: "Oct 20, 2024",
    files: {
      single: {
        name: "hotel_license.pdf",
        url: "https://picsum.photos/seed/hotel-license/500/350",
      },
    },
  },
];

// ----------------------------- Status styling -----------------------------

const statusBadgeStyles: Record<DocStatus, string> = {
  missing: "bg-gray-100 text-gray-500",
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

const statusLabels: Record<DocStatus, string> = {
  missing: "Not Uploaded",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const iconWrapStyles: Record<DocStatus, string> = {
  missing: "bg-gray-100 text-gray-500",
  pending: "bg-gray-100 text-gray-500",
  approved: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-500",
};

// ----------------------------- Main component -----------------------------

export default function VerificationHub() {
  const [documents, setDocuments] =
    useState<VerificationDoc[]>(initialDocuments);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "upload">("upload");

  const activeDoc = documents.find((d) => d.id === activeDocId) ?? null;

  const approvedCount = documents.filter((d) => d.status === "approved").length;
  const progressPercent = Math.round((approvedCount / documents.length) * 100);

  const overallStatus = useMemo(() => {
    if (
      documents.some((d) => d.status === "rejected" || d.status === "missing")
    ) {
      return {
        label: "Action Required",
        styles: "bg-orange-50 text-orange-600",
      };
    }
    if (documents.every((d) => d.status === "approved")) {
      return { label: "Fully Verified", styles: "bg-green-50 text-green-700" };
    }
    return { label: "Under Review", styles: "bg-blue-50 text-blue-700" };
  }, [documents]);

  function openDoc(doc: VerificationDoc) {
    setActiveDocId(doc.id);
    setModalMode(
      doc.status === "pending" || doc.status === "approved" ? "view" : "upload",
    );
  }

  function handleSubmitDocument(
    docId: string,
    files: Partial<Record<SlotKey, UploadedFile>>,
  ) {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? { ...doc, files, status: "pending", rejectionReason: undefined }
          : doc,
      ),
    );
    setActiveDocId(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Hub</h1>
          <p className="text-sm text-gray-500">
            Manage and track compliance documentation.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Overall Status
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${overallStatus.styles}`}
          >
            {overallStatus.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left: required documents */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Required Documents
          </h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} onOpen={() => openDoc(doc)} />
            ))}
          </div>
        </div>

        {/* Right: progress + assistance */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Verification Progress
            </h3>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-orange-500">
                {progressPercent}%
              </span>
              <span className="text-xs text-gray-400">
                {approvedCount} of {documents.length} Approved
              </span>
            </div>
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-orange-500 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Complete all documentation to activate your hotel listing and
              start receiving bookings.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-slate-900 p-5 text-white">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <HelpCircle size={14} />
              </span>
              <h3 className="text-sm font-semibold">Need Assistance?</h3>
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Our compliance team is available to help you with the verification
              process.
            </p>
            <button
              type="button"
              className="w-full rounded-lg bg-white py-2 text-sm font-medium text-slate-900 hover:bg-gray-100"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {activeDoc && modalMode === "upload" && (
        <DocumentUploadModal
          doc={activeDoc}
          onClose={() => setActiveDocId(null)}
          onSubmit={(files) => handleSubmitDocument(activeDoc.id, files)}
        />
      )}

      {activeDoc && modalMode === "view" && (
        <DocumentViewerModal
          doc={activeDoc}
          onClose={() => setActiveDocId(null)}
        />
      )}
    </div>
  );
}

// ----------------------------- Document row -----------------------------

function DocumentRow({
  doc,
  onOpen,
}: {
  doc: VerificationDoc;
  onOpen: () => void;
}) {
  const Icon = doc.icon;
  const isRejected = doc.status === "rejected";

  return (
    <div
      className={`flex items-center justify-between rounded-xl border bg-white p-4 ${
        isRejected
          ? "border-gray-200 border-l-4 border-l-red-500"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconWrapStyles[doc.status]}`}
        >
          <Icon size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
          <p className="text-sm text-gray-500">{doc.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadgeStyles[doc.status]}`}
        >
          {statusLabels[doc.status]}
        </span>

        {doc.status === "missing" && (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Upload
          </button>
        )}

        {doc.status === "rejected" && (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-orange-600"
          >
            Re-upload
          </button>
        )}

        {(doc.status === "pending" || doc.status === "approved") && (
          <button
            type="button"
            onClick={onOpen}
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

// ----------------------------- Document viewer modal (pending / approved) -----------------------------

function DocumentViewerModal({
  doc,
  onClose,
}: {
  doc: VerificationDoc;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const isApproved = doc.status === "approved";
  const previewFile = doc.files.single ?? doc.files.front;

  function handleDownload() {
    if (!previewFile) return;
    const link = document.createElement("a");
    link.href = previewFile.url;
    link.download = previewFile.name;
    link.click();
  }

  function handlePrint() {
    if (!previewFile) return;
    window.open(previewFile.url, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
          <div className="flex items-start gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isApproved
                  ? "bg-green-50 text-green-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {isApproved ? <CheckCircle2 size={18} /> : <Clock size={18} />}
            </span>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {doc.name}
                {doc.localName && (
                  <span className="font-normal text-gray-500">
                    {" "}
                    ({doc.localName})
                  </span>
                )}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isApproved
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 size={11} />
                  ) : (
                    <Clock size={11} />
                  )}
                  {isApproved ? "APPROVED" : "PENDING"}
                  {isApproved &&
                    doc.validUntil &&
                    ` • VALID UNTIL ${doc.validUntil.toUpperCase()}`}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                {doc.documentId && <>Document ID: {doc.documentId} • </>}
                {doc.uploadedDate && <>Uploaded {doc.uploadedDate}</>}
                {doc.verifiedBy && (
                  <>
                    {" "}
                    • Verified by {doc.verifiedBy}
                    {doc.verifiedDate && <> on {doc.verifiedDate}</>}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download size={14} /> Download
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Printer size={14} /> Print
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Preview Mode:{" "}
            <span className="normal-case text-gray-600">
              {isApproved
                ? "Official Certified Document"
                : "Submitted Document — Awaiting Review"}
            </span>
          </p>
          <div className="flex items-center gap-1.5 text-gray-500">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="rounded-md p-1 hover:bg-gray-200"
              aria-label="Zoom out"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-xs font-medium text-gray-600">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
              className="rounded-md p-1 hover:bg-gray-200"
              aria-label="Zoom in"
            >
              <PlusIcon size={14} />
            </button>
            <span className="mx-1 h-4 w-px bg-gray-200" />
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="rounded-md p-1 hover:bg-gray-200"
              aria-label="Reset zoom"
            >
              <Maximize size={14} />
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="rounded-md p-1 hover:bg-gray-200"
              aria-label="Rotate"
            >
              <RotateCw size={14} />
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div
            className="mx-auto origin-top transition-transform"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              maxWidth: 480,
            }}
          >
            {doc.id === "tax_certificate" ? (
              <TaxCertificateMock doc={doc} />
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                {previewFile ? (
                  <img
                    src={previewFile.url}
                    alt={doc.name}
                    className="w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center gap-2 text-gray-400">
                    <FileIcon size={28} />
                    <span className="text-sm">No preview available</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            {isApproved ? (
              <>
                <Lock size={13} className="text-green-600" />
                Verified &amp; Locked • Complies with CEMAC compliance
                protocols.
              </>
            ) : (
              <>
                <Clock size={13} className="text-amber-500" />
                Submitted • Awaiting compliance review.
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// A stylized mock of the Cameroonian taxpayer card, purely for demo/preview purposes.
function TaxCertificateMock({ doc }: { doc: VerificationDoc }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between text-center text-[10px] leading-tight text-gray-600">
        <div className="text-left">
          <p className="font-semibold text-gray-800">RÉPUBLIQUE DU CAMEROUN</p>
          <p>Paix - Travail - Patrie</p>
          <p className="mt-1 font-semibold text-gray-800">
            MINISTÈRE DES FINANCES
          </p>
          <p>Direction Générale des Impôts</p>
          <p>Centre Régional des Impôts du Littoral</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
          <ShieldCheck size={18} />
        </span>
        <div className="text-right">
          <p className="font-semibold text-gray-800">REPUBLIC OF CAMEROON</p>
          <p>Peace - Work - Fatherland</p>
          <p className="mt-1 font-semibold text-gray-800">
            MINISTRY OF FINANCE
          </p>
          <p>Directorate General of Taxation</p>
          <p>Littoral Regional Taxation Centre</p>
        </div>
      </div>

      <div className="mb-4 bg-slate-900 py-2.5 text-center text-white">
        <p className="text-sm font-bold tracking-wide">CARTE DE CONTRIBUABLE</p>
        <p className="text-[10px] tracking-wide text-slate-300">
          TAXPAYER IDENTIFICATION CARD
        </p>
      </div>

      <div className="grid grid-cols-[1fr_100px] gap-4">
        <div className="space-y-3">
          <div className="rounded bg-amber-50 p-2.5">
            <p className="text-[9px] font-semibold text-amber-700">
              NUMÉRO D'IDENTIFIANT UNIQUE (NIU / NUI)
            </p>
            <p className="font-mono text-sm font-bold text-gray-900">
              {doc.documentId ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-medium text-gray-400">
              RAISON SOCIALE / TRADE NAME
            </p>
            <p className="text-sm font-semibold text-gray-900">
              GRAND HORIZON HOSPITALITY SARL
            </p>
          </div>
          <div>
            <p className="text-[9px] font-medium text-gray-400">
              ACTIVITÉ PRINCIPALE / MAIN ACTIVITY
            </p>
            <p className="text-xs text-gray-700">
              Hôtellerie, Hébergement &amp; Restauration (Code CITI 5510)
            </p>
          </div>
          <div>
            <p className="text-[9px] font-medium text-gray-400">
              SIÈGE SOCIAL / REGISTERED ADDRESS
            </p>
            <p className="text-xs text-gray-700">
              Boulevard de la Liberté, Akwa, B.P. 1248 Douala, Cameroun
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded border border-dashed border-gray-300 text-gray-300">
            <QrCode size={28} />
          </div>
          <p className="text-center text-[8px] font-medium text-gray-400">
            SCAN TO VALIDATE
          </p>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 text-center text-[7px] font-bold leading-tight text-green-600">
            APPROUVÉ
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[10px] text-gray-500">
        <span>
          Date de délivrance:{" "}
          <span className="font-medium text-gray-700">15 Janvier 2023</span>
        </span>
        <span>
          Date d'expiration:{" "}
          <span className="font-medium text-gray-700">
            31 Décembre {doc.validUntil?.replace("Dec ", "") ?? "2024"}
          </span>
        </span>
        <span className="flex items-center gap-1 font-medium text-green-600">
          <Lock size={10} /> Registre DGI Conforme
        </span>
      </div>
    </div>
  );
}

// ----------------------------- Document upload modal (missing / rejected) -----------------------------

function DocumentUploadModal({
  doc,
  onClose,
  onSubmit,
}: {
  doc: VerificationDoc;
  onClose: () => void;
  onSubmit: (files: Partial<Record<SlotKey, UploadedFile>>) => void;
}) {
  const [draftFiles, setDraftFiles] = useState<
    Partial<Record<SlotKey, UploadedFile>>
  >(doc.files);

  const slots: SlotKey[] =
    doc.slotType === "front_back" ? ["front", "back"] : ["single"];
  const canSubmit = slots.every((slot) => draftFiles[slot]);

  function handleFileChange(slot: SlotKey, file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraftFiles((prev) => ({ ...prev, [slot]: { name: file.name, url } }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{doc.name}</h2>
            <p className="text-sm text-gray-500">{doc.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5">
          {doc.status === "rejected" && doc.rejectionReason && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{doc.rejectionReason}</span>
            </div>
          )}

          <div
            className={`grid gap-4 ${slots.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {slots.map((slot) => (
              <UploadSlot
                key={slot}
                label={
                  slot === "front"
                    ? "Front Side"
                    : slot === "back"
                      ? "Back Side"
                      : "Document"
                }
                file={draftFiles[slot]}
                onChange={(file) => handleFileChange(slot, file)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(draftFiles)}
            disabled={!canSubmit}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------- Upload slot -----------------------------

function UploadSlot({
  label,
  file,
  onChange,
}: {
  label: string;
  file?: UploadedFile;
  onChange: (file: File | null) => void;
}) {
  const isImage = file && /\.(jpe?g|png|webp|gif)$/i.test(file.name);

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        {file ? (
          <div className="relative">
            {isImage ? (
              <img
                src={file.url}
                alt={label}
                className="h-36 w-full object-cover"
              />
            ) : (
              <div className="flex h-36 w-full flex-col items-center justify-center gap-1.5 bg-gray-50 text-gray-400">
                <FileIcon size={22} />
                <span className="max-w-[85%] truncate text-xs text-gray-500">
                  {file.name}
                </span>
              </div>
            )}
            <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-1.5 bg-black/60 py-1.5 text-xs font-medium text-white hover:bg-black/70">
              <UploadCloud size={13} /> Replace
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        ) : (
          <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-1.5 bg-gray-50 text-gray-400 hover:bg-gray-100">
            <UploadCloud size={20} />
            <span className="text-xs font-medium">Click to upload</span>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
      </div>
    </div>
  );
}
