"use client";

import { CircleCheck, CircleAlert } from "lucide-react";

type ResultModalProps = {
  open: boolean;
  variant: "success" | "error";
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
};

export function ResultModal({
  open,
  variant,
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: ResultModalProps) {
  if (!open) return null;

  const isSuccess = variant === "success";
  const Icon = isSuccess ? CircleCheck : CircleAlert;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <Icon
            size={28}
            className={isSuccess ? "text-green-500" : "text-red-500"}
          />
        </div>

        <h2 className="mb-1.5 text-base font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mb-6 text-sm text-slate-500">{message}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSecondary}
            className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            {secondaryLabel}
          </button>
          <button
            type="button"
            onClick={onPrimary}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium text-white ${
              isSuccess
                ? "bg-slate-900 hover:bg-slate-800"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
