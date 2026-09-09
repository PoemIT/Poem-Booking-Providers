// components/hotelWizard/step1.tsx

"use client";

import { useFormContext, Controller } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import type { NewHotelFormInput } from "@/lib/schemas/newHotel";

export function Step1BasicInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewHotelFormInput>();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Basic Hotel Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Hotel Name
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Ocean View Hotel"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe the property guests will see"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Star Rating
          </label>
          <select
            {...register("starRating")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          >
            <option value={0} disabled>
              Select a rating
            </option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          {errors.starRating && (
            <p className="mt-1 text-xs text-red-500">
              {errors.starRating.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Cover Image
          </label>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-orange-200 bg-orange-50/30 px-6 py-8 text-center hover:border-orange-300">
                <UploadCloud size={20} className="text-orange-500" />
                <span className="text-sm font-medium text-slate-900">
                  {field.value ?? "Click to upload a cover photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    field.onChange(e.target.files?.[0]?.name ?? null)
                  }
                />
              </label>
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Gallery
          </label>
          <Controller
            name="gallery"
            control={control}
            render={({ field }) => (
              <div>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 px-6 py-6 text-center hover:border-slate-300">
                  <UploadCloud size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    Add more photos
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const names = Array.from(e.target.files ?? []).map(
                        (f) => f.name,
                      );
                      field.onChange([...field.value, ...names]);
                    }}
                  />
                </label>

                {field.value.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((name, index) => (
                      <span
                        key={`${name}-${index}`}
                        className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              field.value.filter((_, i) => i !== index),
                            )
                          }
                          className="text-slate-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
