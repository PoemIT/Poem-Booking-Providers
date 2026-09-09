// components/addRoomModal.tsx
//
// Small popup for adding one physical room — Room Number, Floor,
// and an initial Status. Kept as a modal rather than a full page,
// since it's only 2 real fields, matching the same "quick popup"
// pattern as the amenity-adding popup in the Create Room Category form.

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Hash, Building2, ToggleLeft } from "lucide-react";
import {
  newHotelRoomSchema,
  type NewHotelRoomInput,
  type NewHotelRoomOutput,
} from "@/lib/schemas/newHotelRoom";
import { FormField, SelectField } from "@/components/providerui/formFields";

type AddRoomModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (room: NewHotelRoomOutput) => void;
};

export function AddRoomModal({ open, onClose, onAdd }: AddRoomModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewHotelRoomInput, any, NewHotelRoomOutput>({
    resolver: zodResolver(newHotelRoomSchema),
    defaultValues: { status: "operational" },
  });

  if (!open) return null;

  function onSubmit(values: NewHotelRoomOutput) {
    // TODO: replace with a real API call once the backend exists
    onAdd(values);
    reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Add Room</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Room Number"
            icon={Hash}
            placeholder="e.g. 205"
            error={errors.room_number?.message}
            registration={register("room_number")}
          />

          <FormField
            label="Floor (optional)"
            icon={Building2}
            placeholder="e.g. 2"
            error={errors.floor?.message}
            registration={register("floor")}
          />

          <SelectField
            label="Status"
            icon={ToggleLeft}
            registration={register("status")}
            options={[
              { value: "operational", label: "Operational" },
              { value: "maintenance", label: "Maintenance" },
              { value: "out_of_service", label: "Out of Service" },
            ]}
          />

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
