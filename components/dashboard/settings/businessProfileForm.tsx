import { Card } from "@/components/providerui/card";
import { BusinessProfileForm } from "@/lib/types";
import { useState } from "react";

const initialProfile: BusinessProfileForm = {
  legalName: "Horizon Hospitality Group",
  registrationNumber: "RC/YAO/2018/B/1452",
  corporateAddress: "142 Avenue de l'Indépendance, Yaoundé, Centre",
};

export function BusinessProfileCard() {
  const [profile, setProfile] = useState<BusinessProfileForm>(initialProfile);
  const [saved, setSaved] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);

  const isDirty = JSON.stringify(profile) !== JSON.stringify(saved);

  function updateField<K extends keyof BusinessProfileForm>(
    field: K,
    value: BusinessProfileForm[K],
  ) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      // await api.updateBusinessProfile(profile);
      setSaved(profile);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Business Profile
          </h2>
          <p className="text-sm text-slate-500">
            Manage your primary enterprise details and location.
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
          Last modified: A. Ndi (Today, 09:40)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Legal Business Name"
          value={profile.legalName}
          onChange={(v) => updateField("legalName", v)}
        />
        <Field
          label="Registration Number"
          value={profile.registrationNumber}
          onChange={(v) => updateField("registrationNumber", v)}
        />
      </div>

      <div className="mt-4">
        <Field
          label="Corporate Address"
          value={profile.corporateAddress}
          onChange={(v) => updateField("corporateAddress", v)}
        />
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-slate-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
      />
    </label>
  );
}
