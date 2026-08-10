// components/ui/formFields.tsx
//
// Shared form building blocks — used by any form in the app
// (editProfileForm.tsx, newRoomsForm.tsx, and future ones).
// Previously these lived duplicated inside editProfileForm.tsx;
// now that a second form needs the exact same pieces, they live here once.

"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { Upload, type LucideIcon } from "lucide-react";

export function FormSection({
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

export function FormField({
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
  registration: UseFormRegisterReturn;
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

export function SelectField({
  label,
  icon: Icon,
  options,
  placeholder = "Select type",
  error,
  registration,
}: {
  label: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-800">
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
          className={`w-full text-slate-500 appearance-none rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-100"
              : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-slate-500"
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

export function FileUploadField({
  label,
  multiple = false,
}: {
  label: string;
  multiple?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-800 ">
        {label}
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400 hover:border-orange-300">
        <Upload size={15} />
        Upload file
        <input type="file" multiple={multiple} className="hidden" />
      </label>
    </div>
  );
}
