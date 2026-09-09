// components/hotelWizard/step2.tsx
//
// Holds TWO step components — Step2Location and Step3Amenities — in
// one file, so there are still 3 real wizard steps, but only 2 files
// needed to hold all of them (this one, plus step1.tsx).

"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Crosshair,
  Wifi,
  Droplets,
  Wind,
  Utensils,
  ParkingCircle,
  ShieldCheck,
  Bell,
  Dumbbell,
  Heart,
  Wine,
  Sparkles,
  Plus,
  X,
  type LucideIcon,
} from "lucide-react";
import type { NewHotelFormInput } from "@/lib/schemas/newHotel";
import { cities, amenityOptions } from "@/lib/schemas/newHotel";

// Maps each amenity's iconKey (a plain string, from newHotel.ts) to the
// actual icon component. Icons are components, not serializable data,
// so this lookup has to live here in the UI file, not in the schema file.
const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Droplets,
  ac: Wind,
  restaurant: Utensils,
  parking: ParkingCircle,
  security: ShieldCheck,
  bell: Bell,
  gym: Dumbbell,
  spa: Heart,
  bar: Wine,
};

function iconFor(key: string): LucideIcon {
  return iconMap[key] ?? Sparkles; // Sparkles is the fallback for custom-added amenities
}

export function Step2Location() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<NewHotelFormInput>();
  const [locating, setLocating] = useState(false);

  function useCurrentLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude, {
          shouldValidate: true,
        });
        setValue("longitude", position.coords.longitude, {
          shouldValidate: true,
        });
        setLocating(false);
      },
      () => setLocating(false),
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Location & Policies
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              City
            </label>
            <select
              {...register("cityId")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.cityId.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Address
            </label>
            <input
              {...register("address")}
              placeholder="e.g. Rue de la Joie, Bonapriso"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-slate-600">
              Coordinates
            </label>
            <button
              type="button"
              onClick={useCurrentLocation}
              disabled={locating}
              className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700"
            >
              <Crosshair size={12} />
              {locating ? "Locating..." : "Use my current location"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("latitude")}
              placeholder="Latitude"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            <input
              {...register("longitude")}
              placeholder="Longitude"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Check-in Time
            </label>
            <input
              type="time"
              {...register("checkInTime")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            {errors.checkInTime && (
              <p className="mt-1 text-xs text-red-500">
                {errors.checkInTime.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Check-out Time
            </label>
            <input
              type="time"
              {...register("checkOutTime")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            {errors.checkOutTime && (
              <p className="mt-1 text-xs text-red-500">
                {errors.checkOutTime.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step3Amenities() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewHotelFormInput>();
  const selected = watch("amenities");

  // Local list of available amenities — starts from amenityOptions,
  // but grows when the provider adds a custom one via the popup below.
  const [options, setOptions] = useState(amenityOptions);

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIconKey, setNewIconKey] = useState("sparkles");

  function toggle(name: string) {
    setValue(
      "amenities",
      selected.includes(name)
        ? selected.filter((a) => a !== name)
        : [...selected, name],
      { shouldValidate: true },
    );
  }

  function confirmAddAmenity() {
    const name = newName.trim();
    if (!name) return;

    if (!options.some((option) => option.name === name)) {
      setOptions((prev) => [...prev, { name, iconKey: newIconKey }]);
    }
    if (!selected.includes(name)) {
      setValue("amenities", [...selected, name], { shouldValidate: true });
    }

    setNewName("");
    setNewIconKey("sparkles");
    setAddOpen(false);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Hotel Amenities
      </h2>

      <div className="flex flex-wrap gap-2">
        {options.map(({ name, iconKey }) => {
          const Icon = iconFor(iconKey);
          const isSelected = selected.includes(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => toggle(name)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
                isSelected
                  ? "border-orange-300 bg-orange-50 text-orange-600"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Icon size={14} />
              {name}
              {isSelected && <span className="text-orange-500">✓</span>}
            </button>
          );
        })}

        {/* The Add button — this was missing before */}
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-orange-300 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50"
        >
          <Plus size={14} />
          Add New Amenity
        </button>
      </div>

      {errors.amenities && (
        <p className="mt-3 text-xs text-red-500">{errors.amenities.message}</p>
      )}

      {/* Add New Amenity popup */}
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
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Rooftop terrace"
              className="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />

            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Icon
            </label>
            <div className="mb-4 grid grid-cols-6 gap-2">
              {Object.entries(iconMap).map(([key, Icon]) => (
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
