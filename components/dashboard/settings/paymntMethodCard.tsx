import { useState } from "react";
import { Landmark, Radio, Smartphone } from "lucide-react";
import {
  BankTransferForm,
  MobileMoneyForm,
  SettlementMethod,
} from "@/lib/types";
import { Card } from "@/components/providerui/card";

export function PaymentMethodsCard() {
  const [defaultMethod, setDefaultMethod] =
    useState<SettlementMethod>("poem_pay");

  const [bankForm, setBankForm] = useState<BankTransferForm>({
    bankName: "Afriland First Bank",
    accountNumber: "CM21 1000 5000 1234 5678 90",
  });
  const [savedBankForm, setSavedBankForm] = useState(bankForm);
  const [isSavingBank, setIsSavingBank] = useState(false);

  const [mobileForm, setMobileForm] = useState<MobileMoneyForm>({
    provider: "MTN Mobile Money",
    registeredNumber: "+237 6 70 00 00 00",
  });
  const [savedMobileForm, setSavedMobileForm] = useState(mobileForm);
  const [isSavingMobile, setIsSavingMobile] = useState(false);

  const isBankDirty =
    JSON.stringify(bankForm) !== JSON.stringify(savedBankForm);
  const isMobileDirty =
    JSON.stringify(mobileForm) !== JSON.stringify(savedMobileForm);

  async function handleSaveBank() {
    setIsSavingBank(true);
    try {
      // await api.updateBankTransfer(bankForm);
      setSavedBankForm(bankForm);
    } finally {
      setIsSavingBank(false);
    }
  }

  async function handleSaveMobile() {
    setIsSavingMobile(true);
    try {
      // await api.updateMobileMoney(mobileForm);
      setSavedMobileForm(mobileForm);
    } finally {
      setIsSavingMobile(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Settlement Methods
          </h2>
          <p className="text-sm text-slate-500">
            Configure accounts for payouts and transactions.
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
          Last modified: System (Oct 01)
        </span>
      </div>

      {/* Poem Pay — default */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/40 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Radio size={16} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-900">Poem Pay</p>
              {defaultMethod === "poem_pay" && (
                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-medium text-white">
                  DEFAULT
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">
              Instant unified settlements across all channels.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Merchant ID: PP-8823-XV · Status:{" "}
              <span className="text-green-600">Verified &amp; Active</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {defaultMethod !== "poem_pay" && (
            <button
              type="button"
              onClick={() => setDefaultMethod("poem_pay")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Set as default
            </button>
          )}
        </div>
      </div>

      {/* Bank + Mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Bank Transfer */}
        <div className="rounded-lg border border-slate-100 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark size={16} className="text-slate-400" />
              <p className="text-sm font-medium text-slate-900">
                Bank Transfer
              </p>
            </div>
            {defaultMethod === "bank_transfer" && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-white">
                DEFAULT
              </span>
            )}
          </div>

          <label className="mb-3 block">
            <span className="mb-1.5 block text-sm text-slate-600">
              Bank Name
            </span>
            <input
              type="text"
              value={bankForm.bankName}
              onChange={(e) =>
                setBankForm((prev) => ({ ...prev, bankName: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-600">
              IBAN / Account Number
            </span>
            <input
              type="text"
              value={bankForm.accountNumber}
              onChange={(e) =>
                setBankForm((prev) => ({
                  ...prev,
                  accountNumber: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </label>

          <button
            type="button"
            onClick={handleSaveBank}
            disabled={!isBankDirty || isSavingBank}
            className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingBank ? "Updating..." : "Update Details"}
          </button>
        </div>

        {/* Mobile Money */}
        <div className="rounded-lg border border-slate-100 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-slate-400" />
              <p className="text-sm font-medium text-slate-900">Mobile Money</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              Backup
            </span>
          </div>

          <label className="mb-3 block">
            <span className="mb-1.5 block text-sm text-slate-600">
              Provider
            </span>
            <select
              value={mobileForm.provider}
              onChange={(e) =>
                setMobileForm((prev) => ({
                  ...prev,
                  provider: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            >
              <option>MTN Mobile Money</option>
              <option>Orange Money</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-600">
              Registered Number
            </span>
            <input
              type="text"
              value={mobileForm.registeredNumber}
              onChange={(e) =>
                setMobileForm((prev) => ({
                  ...prev,
                  registeredNumber: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </label>

          <button
            type="button"
            onClick={handleSaveMobile}
            disabled={!isMobileDirty || isSavingMobile}
            className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingMobile ? "Updating..." : "Update Details"}
          </button>
        </div>
      </div>
    </Card>
  );
}
