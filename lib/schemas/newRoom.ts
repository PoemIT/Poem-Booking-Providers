// lib/schemas/newRoom.ts

import { z } from "zod";

export const newRoomSchema = z.object({
  // Basic Info
  roomName: z.string().min(1, "Room name is required"),
  roomType: z.string().min(1, "Please select a room type"),
  maxOccupancy: z.coerce.number().min(1, "Must allow at least 1 guest"),

  // Pricing — coerce turns the text typed into the input into a real number
  basePrice: z.coerce.number().min(1, "Base price is required"),
  weekendPrice: z.coerce.number().optional(),
  seasonalPricing: z.coerce.number().optional(),

  // Amenities & Media
  amenities: z.string().optional(), // simple text for now, e.g. "Wi-Fi, TV, AC"
  bedType: z.string().min(1, "Please select a bed type"),
});

export type NewRoomFormValues = z.infer<typeof newRoomSchema>;
export type NewRoomFormInput = z.input<typeof newRoomSchema>;
export type NewRoomFormOutput = z.output<typeof newRoomSchema>;
