// lib/schemas/newHotelRoom.ts

import { z } from "zod";

export const newHotelRoomSchema = z.object({
  room_number: z.string().min(1, "Room number is required"),
  floor: z.coerce.number().optional(),
  status: z.enum(["operational", "maintenance", "out_of_service"]),
});

export type NewHotelRoomInput = z.input<typeof newHotelRoomSchema>;
export type NewHotelRoomOutput = z.output<typeof newHotelRoomSchema>;
