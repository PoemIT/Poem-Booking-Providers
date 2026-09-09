"use client";

import { useForm } from "react-hook-form";
import {
  Building2,
  MapPin,
  Star,
  Clock,
  AlignLeft,
  Locate,
  Network,
} from "lucide-react";
import {
  FormSection,
  FormField,
  SelectField,
  FileUploadField,
} from "@/components/providerui/formFields";

function NewHotelsForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(values: unknown) {
    console.log("new hotel submitted:", values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header — Cancel/Save sit up top for this form, not the bottom */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Create Hotel Branch
          </h1>
          <p className="text-sm text-slate-500">
            Add a new property to your provider account.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save hotel
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <FormSection title="Basic Info">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Hotel Name"
              icon={Building2}
              placeholder="e.g. Ocean View Hotel"
              registration={register("name")}
            />
            <SelectField
              label="Star Rating"
              icon={Star}
              registration={register("starRating")}
              options={[
                { value: "1", label: "1 star" },
                { value: "2", label: "2 stars" },
                { value: "3", label: "3 stars" },
                { value: "4", label: "4 stars" },
                { value: "5", label: "5 stars" },
              ]}
            />
          </div>

          <div className="mt-4">
            <SelectField
              label="Branch (optional)"
              icon={Network}
              placeholder="No branch — main property"
              registration={register("branchId")}
              options={[
                { value: "branch-1", label: "Downtown Branch" },
                { value: "branch-2", label: "Airport Branch" },
                { value: "branch-3", label: "Beachfront Branch" },
              ]}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe this property"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </FormSection>

        <FormSection title="Location">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="City"
              icon={MapPin}
              registration={register("cityId")}
              options={[
                { value: "douala", label: "Douala" },
                { value: "yaounde", label: "Yaoundé" },
                { value: "bafoussam", label: "Bafoussam" },
                { value: "bamenda", label: "Bamenda" },
                { value: "limbe", label: "Limbe" },
                { value: "kribi", label: "Kribi" },
                { value: "buea", label: "Buea" },
              ]}
            />
            <FormField
              label="Address"
              icon={AlignLeft}
              placeholder="Street address"
              registration={register("address")}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Latitude"
              icon={Locate}
              placeholder="e.g. 4.0511"
              registration={register("latitude")}
            />
            <FormField
              label="Longitude"
              icon={Locate}
              placeholder="e.g. 9.7679"
              registration={register("longitude")}
            />
          </div>
        </FormSection>

        <FormSection title="Check-in / Check-out">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Check-in Time"
              icon={Clock}
              placeholder="14:00"
              registration={register("checkInTime")}
            />
            <FormField
              label="Check-out Time"
              icon={Clock}
              placeholder="12:00"
              registration={register("checkOutTime")}
            />
          </div>
        </FormSection>

        <FormSection title="Image">
          <FileUploadField label="Hotel Cover Image" />
        </FormSection>
      </div>
    </form>
  );
}

export default NewHotelsForm;
