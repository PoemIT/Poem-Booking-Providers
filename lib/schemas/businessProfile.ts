// lib/schemas/businessProfile.ts
//
// One schema describing every field in the Edit Business Information
// form, plus its validation rules. react-hook-form reads this to know
// what's required and what error message to show.

import { z } from "zod";

export const businessProfileSchema = z.object({
  // Business Details
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxNumber: z.string().optional(),

  // Contact Information
  phoneNumber: z.string().min(1, "Phone number is required"),
  businessEmail: z.string().email("Enter a valid email address"),
  website: z.string().optional(),

  // Address
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
});

export type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>;
