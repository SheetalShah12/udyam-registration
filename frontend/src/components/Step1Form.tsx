"use client";
import React, { useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Step1FormProps {
  onNext: (data: { aadhaar: string; otp: string }) => void;
}

export default function Step1Form({ onNext }: Step1FormProps) {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateOtp = async () => {
    if (!/^\d{12}$/.test(aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar }),
      });
      const result = await response.json();

      if (result.success) {
        setOtpSent(true);
        alert("OTP sent successfully.");
      } else {
        alert(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      alert("Error sending OTP.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar, otp }),
      });
      const result = await response.json();

      if (result.success) {
        onNext({ aadhaar, otp });
      } else {
        alert(result.message || "OTP verification failed.");
      }
    } catch (error) {
      alert("Error verifying OTP.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      {/* Blue heading bar */}
      <div className="bg-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-6">
        Step 1: Aadhaar Verification
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Aadhaar Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Aadhaar Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="flex-1 border-2 border-gray-400 rounded px-4 py-2 text-lg text-black
                         focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 12-digit Aadhaar"
              maxLength={12}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleGenerateOtp}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Generate OTP"}
            </button>
          </div>
        </div>

        {/* OTP Field */}
        {otpSent && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border-2 border-gray-400 rounded px-4 py-2 text-lg text-black
                         focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              disabled={loading}
            />
          </div>
        )}

        {/* Next Button */}
        {otpSent && (
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Next"}
          </button>
        )}
      </form>
    </div>
  );
}
