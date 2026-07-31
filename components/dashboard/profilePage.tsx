import { mockProfileDetails } from "@/lib/mock-data";
import React from "react";

const photos = ["./hotel1.jfif", "./hotel2.jfif"];

const details = mockProfileDetails;

function ProfileCard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb + Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-400">Business / Profile</p>
        <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
        <p className="text-sm text-gray-500">Hotel Continental</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="flex-1">
          {/* Photo gallery */}
          <div className="mb-6 grid grid-cols-5 gap-3">
            {photos.map((i) => (
              <div
                key={i}
                className="h-24 w-36 shrink-0 overflow-hidden rounded-lg border-2 border-amber-500/70 bg-gradient-to-br from-slate-800 via-slate-700 to-amber-900"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img src={i} alt="profile" />
                </div>
              </div>
            ))}
          </div>

          {/* Details card */}
          <div className="rounded-xl border border-gray-200 bg-white">
            {details.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-5 py-4 ${
                  index !== details.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="w-full shrink-0 space-y-4 lg:w-72">
          {/* Verification status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Verification Status
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-semibold text-gray-900">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Documents</span>
                <span className="text-sm font-semibold text-gray-900">4/4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last Updated</span>
                <span className="text-sm font-semibold text-gray-900">
                  12 Jun 2026
                </span>
              </div>
            </div>
          </div>

          {/* Edit button */}
          <button className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
            Edit
          </button>

          {/* Delete button */}
          <button className="w-full rounded-lg border border-red-400 bg-white py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
