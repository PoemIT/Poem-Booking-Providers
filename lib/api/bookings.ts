// lib/api/bookings.ts
//
// TEMPORARY: pretends to be a real API call, same pattern as
// lib/api/dashboard.ts. Waits a bit like a real request would,
// then returns the mock data. Swap the inside for a real fetch()
// later — nothing that imports getRecentBookings() has to change.

import { mockRecentBookings } from "@/lib/mock-data";

export async function getRecentBookings() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // later:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider/bookings/recent`);
  // if (!res.ok) throw new Error("Failed to load bookings");
  // return res.json();

  return {
    bookings: mockRecentBookings,
    totalCount: mockRecentBookings.length,
  };
}
