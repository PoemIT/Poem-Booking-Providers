// lib/schemas/newHotel.ts
//
// Everything the wizard needs that ISN'T a component: validation
// rules, the form's TypeScript shape, and the city list (hardcoded
// here instead of a separate mock-data file, since nothing else needs it).

import { z } from "zod";

export const newHotelSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Hotel name is required"),
  description: z.string().min(1, "Description is required"),
  starRating: z.coerce.number().min(1, "Select a star rating").max(5),
  coverImage: z.string().nullable(),
  gallery: z.array(z.string()),

  // Location & Policies
  cityId: z.string().min(1, "Select a city"),
  address: z.string().min(1, "Address is required"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  checkInTime: z.string().min(1, "Check-in time is required"),
  checkOutTime: z.string().min(1, "Check-out time is required"),

  // Amenities
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
});

export type NewHotelFormValues = z.infer<typeof newHotelSchema>;
export type NewHotelFormInput = z.input<typeof newHotelSchema>;
export type NewHotelFormOutput = z.output<typeof newHotelSchema>;

export const cities = [
  { id: "c1", name: "Douala" },
  { id: "c2", name: "Yaoundé" },
  { id: "c3", name: "Limbe" },
  { id: "c4", name: "Kribi" },
  { id: "c5", name: "Bafoussam" },
  { id: "c6", name: "Bamenda" },
  { id: "c7", name: "Buea" },
];

// Each amenity carries an icon key — the actual icon COMPONENT lookup
// lives in step2.tsx, since icons are components, not plain data, and
// this file is meant to stay pure data/rules only.
export const amenityOptions: { name: string; iconKey: string }[] = [
  { name: "Wi-Fi", iconKey: "wifi" },
  { name: "Swimming Pool", iconKey: "pool" },
  { name: "Air Conditioning", iconKey: "ac" },
  { name: "Restaurant", iconKey: "restaurant" },
  { name: "Parking", iconKey: "parking" },
  { name: "Security", iconKey: "security" },
  { name: "Room Service", iconKey: "bell" },
  { name: "Gym", iconKey: "gym" },
  { name: "Spa", iconKey: "spa" },
  { name: "Bar", iconKey: "bar" },
];
