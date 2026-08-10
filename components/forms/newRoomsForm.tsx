"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tag,
  ChevronDown,
  Users,
  Wallet,
  Sparkles,
  BedDouble,
} from "lucide-react";
import {
  newRoomSchema,
  type NewRoomFormInput,
  type NewRoomFormOutput,
} from "@/lib/schemas/newRoom";
import {
  FormSection,
  FormField,
  SelectField,
  FileUploadField,
} from "@/components/providerui/formFields";
import { ResultModal } from "@/components/providerui/resultModal";

function NewRoomsForm() {
  // null = no modal showing. Otherwise holds whatever we need to display.
  const [result, setResult] = useState<
    { variant: "success"; roomName: string } | { variant: "error" } | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewRoomFormInput, any, NewRoomFormOutput>({
    resolver: zodResolver(newRoomSchema),
  });

  function onSubmit(values: NewRoomFormOutput) {
    console.log("new room submitted:", values);
    setResult({ variant: "success", roomName: values.roomName });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header — Cancel/Save sit up top for this form, not the bottom */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Create Room</h1>
          <p className="text-sm text-slate-500">
            Add a new room to your property.
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
            disabled={isSubmitting}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Room"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <FormSection title="Basic Info">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Room Name"
              icon={Tag}
              placeholder="Enter name"
              error={errors.roomName?.message}
              registration={register("roomName")}
            />
            <SelectField
              label="Room Type"
              icon={ChevronDown}
              error={errors.roomType?.message}
              registration={register("roomType")}
              options={[
                { value: "standard", label: "Standard" },
                { value: "deluxe", label: "Deluxe" },
                { value: "executive", label: "Executive" },
                { value: "family", label: "Family" },
              ]}
            />
            <FormField
              label="Max Occupancy"
              icon={Users}
              placeholder="Enter number"
              error={errors.maxOccupancy?.message}
              registration={register("maxOccupancy")}
            />
          </div>
        </FormSection>

        <FormSection title="Pricing">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Base Price"
              icon={Wallet}
              placeholder="Enter amount"
              error={errors.basePrice?.message}
              registration={register("basePrice")}
            />
            <FormField
              label="Weekend Price"
              icon={Wallet}
              placeholder="Enter amount"
              error={errors.weekendPrice?.message}
              registration={register("weekendPrice")}
            />
            <FormField
              label="Seasonal Pricing"
              icon={Wallet}
              placeholder="Enter amount"
              error={errors.seasonalPricing?.message}
              registration={register("seasonalPricing")}
            />
          </div>
        </FormSection>

        <FormSection title="Amenities & Media">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              label="Amenities"
              icon={Sparkles}
              placeholder="Select options"
              error={errors.amenities?.message}
              registration={register("amenities")}
            />
            <SelectField
              label="Bed Type"
              icon={BedDouble}
              error={errors.bedType?.message}
              registration={register("bedType")}
              options={[
                { value: "single", label: "Single" },
                { value: "double", label: "Double" },
                { value: "queen", label: "Queen" },
                { value: "king", label: "King" },
              ]}
            />
            <FileUploadField label="Room Gallery" multiple />
          </div>
        </FormSection>
      </div>

      {result?.variant === "success" && (
        <ResultModal
          open
          variant="success"
          title="Room created successfully"
          message={`"${result.roomName}" has been added to your property and is now live for bookings.`}
          primaryLabel="Done"
          onPrimary={() => setResult(null)}
          secondaryLabel="Add Another"
          onSecondary={() => setResult(null)}
        />
      )}

      {result?.variant === "error" && (
        <ResultModal
          open
          variant="error"
          title="Something went wrong"
          message="We couldn't save this room. Please check the required fields and try again."
          primaryLabel="Try Again"
          onPrimary={() => setResult(null)}
          secondaryLabel="Cancel"
          onSecondary={() => setResult(null)}
        />
      )}
    </form>
  );
}

export default NewRoomsForm;
