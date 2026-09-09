// components/hotelWizard/hotelWizard.tsx
//
// The brain: holds the shared form, tracks the current step, and
// renders its own inline progress bar (no separate stepper file).

"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import {
  newHotelSchema,
  type NewHotelFormInput,
  type NewHotelFormOutput,
} from "@/lib/schemas/newHotel";
import { Step1BasicInfo } from "./step1";
import { Step2Location, Step3Amenities } from "./step2";

type Step = 1 | 2 | 3;
const stepLabels = ["Basic Info", "Location & Policies", "Amenities"];

const stepFields: Record<Step, (keyof NewHotelFormInput)[]> = {
  1: ["name", "description", "starRating", "coverImage", "gallery"],
  2: [
    "cityId",
    "address",
    "latitude",
    "longitude",
    "checkInTime",
    "checkOutTime",
  ],
  3: ["amenities"],
};

export function HotelWizard() {
  const [step, setStep] = useState<Step>(1);

  const methods = useForm<NewHotelFormInput, any, NewHotelFormOutput>({
    resolver: zodResolver(newHotelSchema),
    defaultValues: {
      name: "",
      description: "",
      starRating: 0,
      coverImage: null,
      gallery: [],
      cityId: "",
      address: "",
      latitude: 0,
      longitude: 0,
      checkInTime: "",
      checkOutTime: "",
      amenities: [],
    },
  });

  async function handleNext() {
    const isValid = await methods.trigger(stepFields[step]);
    if (isValid && step < 3) setStep((step + 1) as Step);
  }

  function onSubmit(values: NewHotelFormOutput) {
    // At this point starRating/latitude/longitude are guaranteed real
    // numbers — zod already coerced and validated them before this runs.
    // TODO: replace with a real API call once the backend exists
    console.log("hotel created:", values);
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Create Hotel</h1>
          <p className="text-sm text-slate-500">
            Add a new hotel and provide the information guests will see when
            viewing the property.
          </p>
        </div>

        {/* Inline stepper — no separate file for this anymore */}
        <div className="mb-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
          {stepLabels.map((label, index) => {
            const stepNumber = (index + 1) as Step;
            const isComplete = stepNumber < step;
            const isCurrent = stepNumber === step;
            return (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      isComplete
                        ? "bg-slate-900 text-white"
                        : isCurrent
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isComplete ? <Check size={14} /> : stepNumber}
                  </span>
                  <span
                    className={`text-sm ${isCurrent ? "font-semibold text-slate-900" : "text-slate-500"}`}
                  >
                    {label}
                  </span>
                </div>
                {index < stepLabels.length - 1 && (
                  <div
                    className={`mx-3 h-px flex-1 ${isComplete ? "bg-slate-900" : "bg-slate-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {step === 1 && <Step1BasicInfo />}
        {step === 2 && <Step2Location />}
        {step === 3 && <Step3Amenities />}

        <div className="mt-6 flex justify-between">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as Step)}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                ← Back
              </button>
            )}
          </div>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="button"
              onClick={methods.handleSubmit(onSubmit)}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
            >
              Create Hotel ✓
            </button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
