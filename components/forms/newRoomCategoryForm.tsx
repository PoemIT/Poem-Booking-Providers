"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Tag,
  ChevronDown,
  Users,
  Baby,
  Wallet,
  Hash,
  ToggleLeft,
  Sparkles,
  Plus,
  X,
  Wifi,
  Snowflake,
  Tv,
  Wine,
  Sun,
  Bell,
  Lock,
  Droplets,
  Dumbbell,
  Utensils,
  Car,
  ShieldCheck,
  Waves,
  LucideIcon,
} from "lucide-react";
import {
  FileUploadField,
  FormField,
  FormSection,
  SelectField,
} from "../providerui/formFields";

// Icon choices offered when a user adds a custom amenity.
// "sparkles" is also the fallback icon for anything that has no match.
const ICON_CHOICES: { key: string; icon: LucideIcon }[] = [
  { key: "wifi", icon: Wifi },
  { key: "ac", icon: Snowflake },
  { key: "tv", icon: Tv },
  { key: "wine", icon: Wine },
  { key: "sun", icon: Sun },
  { key: "bell", icon: Bell },
  { key: "lock", icon: Lock },
  { key: "droplets", icon: Droplets },
  { key: "dumbbell", icon: Dumbbell },
  { key: "utensils", icon: Utensils },
  { key: "car", icon: Car },
  { key: "shield", icon: ShieldCheck },
  { key: "waves", icon: Waves },
  { key: "sparkles", icon: Sparkles },
];

function iconFor(key: string): LucideIcon {
  return ICON_CHOICES.find((choice) => choice.key === key)?.icon ?? Sparkles;
}

type AmenityOption = { name: string; iconKey: string };

const DEFAULT_AMENITIES: AmenityOption[] = [
  { name: "Wi-Fi", iconKey: "wifi" },
  { name: "Air conditioning", iconKey: "ac" },
  { name: "TV", iconKey: "tv" },
  { name: "Mini bar", iconKey: "wine" },
  { name: "Balcony", iconKey: "sun" },
  { name: "Room service", iconKey: "bell" },
  { name: "Safe box", iconKey: "lock" },
  { name: "Hot water", iconKey: "droplets" },
];

function AmenitiesField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [options, setOptions] = useState<AmenityOption[]>(DEFAULT_AMENITIES);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Standalone "add new amenity" popup — independent of the search
  // dropdown's open/blur state, so it's always reachable.
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIconKey, setNewIconKey] = useState("sparkles");

  function getOption(name: string) {
    return options.find((option) => option.name === name);
  }

  const filtered = options.filter(
    (option) =>
      option.name.toLowerCase().includes(query.toLowerCase()) &&
      !value.includes(option.name),
  );

  function toggleSelect(name: string) {
    onChange([...value, name]);
    setQuery("");
    setOpen(false);
  }

  function removeSelected(name: string) {
    onChange(value.filter((item) => item !== name));
  }

  function openAddPopup(prefill = "") {
    setNewName(prefill);
    setNewIconKey("sparkles");
    setAddOpen(true);
    setOpen(false);
  }

  function confirmAddAmenity() {
    const name = newName.trim();
    if (!name) return;

    if (!getOption(name)) {
      setOptions((prev) => [...prev, { name, iconKey: newIconKey }]);
    }
    if (!value.includes(name)) {
      onChange([...value, name]);
    }

    setNewName("");
    setNewIconKey("sparkles");
    setAddOpen(false);
    setQuery("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        Amenities
      </label>

      {/* Selected chips, each with its icon */}
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {value.map((name) => {
            const Icon = iconFor(getOption(name)?.iconKey ?? "sparkles");
            return (
              <span
                key={name}
                className="flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700"
              >
                <Icon size={12} />
                {name}
                <button
                  type="button"
                  onClick={() => removeSelected(name)}
                  className="text-orange-400 hover:text-orange-600"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Sparkles
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search amenities"
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />

          {open && filtered.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {filtered.map((option) => {
                const Icon = iconFor(option.iconKey);
                return (
                  <button
                    key={option.name}
                    type="button"
                    onMouseDown={() => toggleSelect(option.name)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon size={14} className="text-slate-400" />
                    {option.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Always-visible entry point — not hidden inside dropdown state */}
        <button
          type="button"
          onClick={() => openAddPopup(query)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-500 hover:border-orange-300 hover:text-orange-600"
        >
          <Plus size={14} />
          New amenity
        </button>
      </div>

      {/* Small popup for adding a new amenity, with icon picker */}
      {addOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/30">
          <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Add amenity
              </h3>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Name
            </label>
            <input
              autoFocus
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="e.g. Rooftop terrace"
              className="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />

            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Icon
            </label>
            <div className="mb-4 grid grid-cols-7 gap-2">
              {ICON_CHOICES.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setNewIconKey(key)}
                  className={`flex items-center justify-center rounded-lg border p-2 ${
                    newIconKey === key
                      ? "border-orange-400 bg-orange-50 text-orange-600"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAddAmenity}
                disabled={!newName.trim()}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Add amenity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type RoomCategoryFormValues = {
  name: string;
  status: string;
  description: string;
  maxAdults: string;
  maxChildren: string;
  basePrice: string;
  currency: string;
  totalRooms: string;
  amenities: string[];
};

function NewRoomCategoryForm() {
  const { register, handleSubmit, setValue, watch } =
    useForm<RoomCategoryFormValues>({
      defaultValues: { amenities: [] },
    });

  const amenities = watch("amenities");

  function onSubmit(values: unknown) {
    console.log("new room category submitted:", values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header — Cancel/Save sit up top for this form, not the bottom */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Create Room Category
          </h1>
          <p className="text-sm text-slate-500">
            Define a rate plan for this property. Rooms are added to this
            category afterward.
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
            Save category
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <FormSection title="Basic Info">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Category Name"
              icon={Tag}
              placeholder="e.g. Deluxe Room"
              registration={register("name")}
            />
            <SelectField
              label="Status"
              icon={ToggleLeft}
              registration={register("status")}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe this room category"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </FormSection>

        <FormSection title="Occupancy">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Max Adults"
              icon={Users}
              placeholder="e.g. 2"
              registration={register("maxAdults")}
            />
            <FormField
              label="Max Children"
              icon={Baby}
              placeholder="e.g. 1"
              registration={register("maxChildren")}
            />
          </div>
        </FormSection>

        <FormSection title="Pricing & Inventory">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Base Price"
              icon={Wallet}
              placeholder="Enter amount"
              registration={register("basePrice")}
            />

            <FormField
              label="Total Rooms"
              icon={Hash}
              placeholder="e.g. 5"
              registration={register("totalRooms")}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            This creates that many physical rooms under this category
            automatically. By Room Number
          </p>
        </FormSection>

        <FormSection title="Amenities">
          <AmenitiesField
            value={amenities}
            onChange={(next) => setValue("amenities", next)}
          />
        </FormSection>

        <FormSection title="Images">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FileUploadField label="Category Cover Photo" multiple />
            <FileUploadField label="Category Gallery" multiple />
          </div>
        </FormSection>
      </div>
    </form>
  );
}

export default NewRoomCategoryForm;
