"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Info,
  MapPin,
  Images,
  Tag,
  ShieldCheck,
  Scale,
  Phone,
  Mail,
  X,
  Plus,
  Upload,
  Trash2,
} from "lucide-react";

type BusinessProfileFormState = {
  logoUrl: string;
  coverPhotoUrl: string;
  propertyName: string;
  propertyDescription: string;
  propertyType: string;
  starRating: number;
  fullAddress: string;
  latitude: string;
  longitude: string;
  gallery: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  childPolicy: string;
  petPolicy: string;
  refundPolicy: string;
  rccmNumber: string;
  taxNumber: string;
  email: string;
  phone: string;
  physicalAddress: string;
  city: string;
};

const initialState: BusinessProfileFormState = {
  logoUrl: "",
  coverPhotoUrl: "/hotels.jpg",
  propertyName: "L'Éclat Cameroun",
  propertyDescription:
    "Experience unparalleled luxury in the heart of Douala. L'Éclat offers premium accommodations with state-of-the-art facilities, perfect for business travelers and vacationers seeking elegance and comfort.",
  propertyType: "Luxury Hotel",
  starRating: 5,
  fullAddress: "Avenue de Gaulle, Bonanjo, Douala, Cameroon",
  latitude: "4.0456° N",
  longitude: "9.6923° E",
  gallery: [
    "/hotels.jpg",
    "/hotel1.jfif",
    "/hotel1.jfif",
    "/hotel2.jfif",
    "/hotel2.jfif",
    "/hotel1.jfif",
    "/hotel2.jfif",
    "/hotel1.jfif",
  ],
  amenities: [
    "High-Speed Wi-Fi",
    "Infinity Pool",
    "Air Conditioning",
    "Fine Dining",
    "Gym",
  ],
  checkInTime: "15:00",
  checkOutTime: "12:00",
  cancellationPolicy:
    "Free cancellation up to 3 days before arrival. Cancellations within 3 days will be charged the first night.",
  childPolicy:
    "Children under 12 stay free when using existing bedding. Extra beds available upon request.",
  petPolicy:
    "Pets allowed with prior approval. A non-refundable fee of 5,000frs per stay applies.",
  refundPolicy:
    "Refunds are processed within 5-7 business days back to the original method of payment.",
  rccmNumber: "",
  taxNumber: "",
  email: "contact@grandhorizon.com",
  phone: "+237 6XX XXX XXX",
  physicalAddress: "123 Boulevard de la Liberté, Akwa",
  city: "Douala",
};

const GALLERY_PREVIEW_COUNT = 5;

function ProfileCard() {
  const [form, setForm] = useState(initialState);
  const [saved, setSaved] = useState(initialState);
  const [newAmenity, setNewAmenity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  function update<K extends keyof BusinessProfileFormState>(
    field: K,
    value: BusinessProfileFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addAmenity() {
    const value = newAmenity.trim();
    if (!value || form.amenities.includes(value)) return;
    update("amenities", [...form.amenities, value]);
    setNewAmenity("");
  }

  function removeAmenity(amenity: string) {
    update(
      "amenities",
      form.amenities.filter((a) => a !== amenity),
    );
  }

  function confirmRemoveImage(index: number) {
    update(
      "gallery",
      form.gallery.filter((_, i) => i !== index),
    );
    setImageToDelete(null);
  }

  function handleDiscard() {
    setForm(saved);
    setNewAmenity("");
    setShowAllPhotos(false);
  }

  async function persistSave() {
    setIsSaving(true);
    try {
      // await api.updateBusinessProfile(form);
      setSaved(form);
    } finally {
      setIsSaving(false);
      setShowSaveConfirm(false);
    }
  }

  const visibleGallery = showAllPhotos
    ? form.gallery
    : form.gallery.slice(0, GALLERY_PREVIEW_COUNT);
  const hiddenCount = form.gallery.length - GALLERY_PREVIEW_COUNT;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
          <p className="text-sm text-gray-500">
            Manage property details, location, and global policies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDiscard}
            disabled={!isDirty}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => setShowSaveConfirm(true)}
            disabled={!isDirty || isSaving}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Brand Assets */}
        <Section icon={ImageIcon} title="Brand Assets">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm text-gray-500">Property Logo</p>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {form.logoUrl ? (
                    <img
                      src={form.logoUrl}
                      alt="Property logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={20} className="text-gray-300" />
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Change Logo
                  </button>
                  <p className="mt-1 text-xs text-gray-400">
                    Recommended: 256×256px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">Main Cover Photo</p>
              <div className="flex items-center gap-3">
                <div className="h-16 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <img
                    src={form.coverPhotoUrl}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Change Cover
                  </button>
                  <p className="mt-1 text-xs text-gray-400">
                    Recommended: 1920×1080px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Basic Information + Location */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Section icon={Info} title="Basic Information">
            <div className="space-y-4">
              <Field
                label="Property Name"
                value={form.propertyName}
                onChange={(v) => update("propertyName", v)}
              />
              <TextArea
                label="Property Description"
                value={form.propertyDescription}
                onChange={(v) => update("propertyDescription", v)}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Property Type"
                  value={form.propertyType}
                  onChange={(v) => update("propertyType", v)}
                />
                <div>
                  <span className="mb-1.5 block text-sm text-gray-600">
                    Star Rating
                  </span>
                  <select
                    value={form.starRating}
                    onChange={(e) =>
                      update("starRating", Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-orange-500 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  >
                    {[3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {"★".repeat(n)} {n}-Star
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Section>

          <Section icon={MapPin} title="Location">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-300">
              <MapPin size={28} />
            </div>
            <Field
              label="Full Address"
              value={form.fullAddress}
              onChange={(v) => update("fullAddress", v)}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Field
                label="Latitude"
                value={form.latitude}
                onChange={(v) => update("latitude", v)}
              />
              <Field
                label="Longitude"
                value={form.longitude}
                onChange={(v) => update("longitude", v)}
              />
            </div>
          </Section>
        </div>

        {/* Property Gallery */}
        <Section
          icon={Images}
          title="Property Gallery"
          action={
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              <Upload size={14} /> Upload Media
            </button>
          }
        >
          {form.gallery.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-400">
              No photos yet. Upload media to build your gallery.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {visibleGallery.map((src, index) => (
                  <GalleryThumb
                    key={`${src}-${index}`}
                    src={src}
                    onDelete={() => setImageToDelete(index)}
                  />
                ))}
              </div>

              {hiddenCount > 0 && (
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllPhotos((prev) => !prev)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    {showAllPhotos
                      ? "Show fewer photos"
                      : `View All (${form.gallery.length})`}
                  </button>
                </div>
              )}
            </>
          )}
        </Section>

        {/* Amenities + Policies */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Section icon={Tag} title="Amenities & Facilities">
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAmenity()}
                placeholder="Add new amenity..."
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm text-orange-700"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="text-orange-400 hover:text-orange-600"
                    aria-label={`Remove ${amenity}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </Section>

          <Section icon={ShieldCheck} title="Property Policies">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <span className="mb-1.5 block text-sm text-gray-600">
                  Check-in Time
                </span>
                <input
                  type="time"
                  value={form.checkInTime}
                  onChange={(e) => update("checkInTime", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <span className="mb-1.5 block text-sm text-gray-600">
                  Check-out Time
                </span>
                <input
                  type="time"
                  value={form.checkOutTime}
                  onChange={(e) => update("checkOutTime", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <TextArea
                label="Cancellation Policy"
                value={form.cancellationPolicy}
                onChange={(v) => update("cancellationPolicy", v)}
                rows={2}
              />
              <TextArea
                label="Child Policy"
                value={form.childPolicy}
                onChange={(v) => update("childPolicy", v)}
                rows={2}
              />
              <TextArea
                label="Pet Policy"
                value={form.petPolicy}
                onChange={(v) => update("petPolicy", v)}
                rows={2}
              />
              <TextArea
                label="Refund Policy"
                value={form.refundPolicy}
                onChange={(v) => update("refundPolicy", v)}
                rows={2}
              />
            </div>
          </Section>
        </div>

        {/* Legal Information */}
        <Section
          icon={Scale}
          title="Legal Information"
          subtitle="Registration and tax details"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="RCCM (Registration Number)"
              value={form.rccmNumber}
              onChange={(v) => update("rccmNumber", v)}
              placeholder="e.g. RC/DLA/2023/B/1234"
              required
            />
            <Field
              label="Contribuable (Tax Number)"
              value={form.taxNumber}
              onChange={(v) => update("taxNumber", v)}
              placeholder="e.g. M123456789012V"
            />
          </div>
        </Section>

        {/* Contact & Location */}
        <Section
          icon={MapPin}
          title="Contact & Location"
          subtitle="How guests can reach you"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-sm text-gray-600">
                Email Address
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                <Mail size={15} className="text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <span className="mb-1.5 block text-sm text-gray-600">
                Phone Number
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                <Phone size={15} className="text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>
            <Field
              label="Physical Address"
              value={form.physicalAddress}
              onChange={(v) => update("physicalAddress", v)}
            />
            <div>
              <span className="mb-1.5 block text-sm text-gray-600">City</span>
              <select
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              >
                <option>Douala</option>
                <option>Yaoundé</option>
                <option>Kribi</option>
                <option>Bafoussam</option>
              </select>
            </div>
          </div>
        </Section>
      </div>

      {/* Delete image confirmation */}
      <ConfirmDialog
        open={imageToDelete !== null}
        title="Remove this photo?"
        description="This photo will be removed from your gallery once you save changes. This can't be undone after saving."
        confirmLabel="Remove Photo"
        destructive
        onCancel={() => setImageToDelete(null)}
        onConfirm={() => {
          if (imageToDelete !== null) confirmRemoveImage(imageToDelete);
        }}
      />

      {/* Save confirmation */}
      <ConfirmDialog
        open={showSaveConfirm}
        title="Save changes?"
        description="This will update your business profile with the changes you've made, including any removed photos."
        confirmLabel={isSaving ? "Saving..." : "Save Changes"}
        onCancel={() => setShowSaveConfirm(false)}
        onConfirm={persistSave}
      />
    </div>
  );
}

function GalleryThumb({
  src,
  onDelete,
}: {
  src: string;
  onDelete: () => void;
}) {
  return (
    <div className="group relative h-28 overflow-hidden rounded-lg">
      <img src={src} alt="Property" className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={onDelete}
        aria-label="Remove photo"
        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100 focus:opacity-100"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  destructive,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-500">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
              destructive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <Icon size={16} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm text-gray-600">
        {label}
        {required && <span className="text-orange-500">*</span>}
      </span>
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

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-gray-600">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
      />
    </label>
  );
}

export default ProfileCard;
