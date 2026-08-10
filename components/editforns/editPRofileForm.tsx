// components/forms/editProfileForm.tsx
//
// The whole "Edit Business Information" form. FormSection and FormField
// are small helpers defined right in this same file (not separate files)
// since they're only used here — kept together so there aren't 4 tiny
// files for one form.

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  ChevronDown,
  FileText,
  Phone,
  Mail,
  Link2,
  MapPin,
  Upload,
  type LucideIcon,
} from "lucide-react";
import {
  businessProfileSchema,
  type BusinessProfileFormValues,
} from "@/lib/schemas/businessProfile";
import { toast } from "sonner";

// ---------- small local helpers ----------

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </div>
  );
}

function FormField({
  label,
  icon: Icon,
  placeholder,
  error,
  registration,
}: {
  label: string;
  icon: LucideIcon;
  placeholder: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          {...registration}
          placeholder={placeholder}
          className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-100"
              : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  icon: Icon,
  options,
  error,
  registration,
}: {
  label: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-900">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <select
          {...registration}
          defaultValue=""
          className={`w-full appearance-none rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs focus:outline-none text-black/80 font-bold focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-100"
              : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
          }`}
        >
          <option value="" disabled>
            Select type
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ---------- the actual form ----------

export function EditProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
  });

  function onSubmit(values: BusinessProfileFormValues) {
    // TODO: replace with a real API call once the backend exists
    console.log("form submitted:", values);
    toast.success("Business information saved");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
      <div className="mb-6">
        <p className="text-xs text-slate-400">Business / Profile / Edit</p>
        <h1 className="text-xl font-bold text-slate-900">
          Edit Business Information
        </h1>
        <p className="text-sm text-slate-500">Update your business details</p>
      </div>

      <div className="space-y-5">
        <FormSection title="Business Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Business Name"
              icon={User}
              placeholder="Enter name"
              error={errors.businessName?.message}
              registration={register("businessName")}
            />
            <SelectField
              label="Business Type"
              icon={ChevronDown}
              error={errors.businessType?.message}
              registration={register("businessType")}
              options={[
                { value: "hotel", label: "Hotel" },
                { value: "apartment", label: "Furnished Apartment" },
                { value: "bus", label: "Transport Agency" },
                { value: "restaurant", label: "Restaurant" },
              ]}
            />
            <FormField
              label="Registration Number"
              icon={FileText}
              placeholder="Enter number"
              error={errors.registrationNumber?.message}
              registration={register("registrationNumber")}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3">
            <FormField
              label="Tax Number"
              icon={FileText}
              placeholder="Enter number"
              error={errors.taxNumber?.message}
              registration={register("taxNumber")}
            />
          </div>
        </FormSection>

        <FormSection title="Contact Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Phone Number"
              icon={Phone}
              placeholder="Enter phone number"
              error={errors.phoneNumber?.message}
              registration={register("phoneNumber")}
            />
            <FormField
              label="Business Email"
              icon={Mail}
              placeholder="Enter email address"
              error={errors.businessEmail?.message}
              registration={register("businessEmail")}
            />
            <FormField
              label="Website"
              icon={Link2}
              placeholder="Enter details"
              error={errors.website?.message}
              registration={register("website")}
            />
          </div>
        </FormSection>

        <FormSection title="Address">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Street Address"
              icon={MapPin}
              placeholder="Enter location"
              error={errors.streetAddress?.message}
              registration={register("streetAddress")}
            />
            <FormField
              label="City"
              icon={MapPin}
              placeholder="Enter location"
              error={errors.city?.message}
              registration={register("city")}
            />
            <FormField
              label="Region"
              icon={MapPin}
              placeholder="Enter location"
              error={errors.region?.message}
              registration={register("region")}
            />
          </div>
        </FormSection>

        <FormSection title="Media">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Logo Upload
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400 hover:border-orange-300">
                <Upload size={15} />
                Upload file
                <input type="file" className="hidden" />
              </label>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Cover Image
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400 hover:border-orange-300">
                <Upload size={15} />
                Upload file
                <input type="file" className="hidden" />
              </label>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Gallery
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400 hover:border-orange-300">
                <Upload size={15} />
                Upload file
                <input type="file" multiple className="hidden" />
              </label>
            </div>
          </div>
        </FormSection>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
