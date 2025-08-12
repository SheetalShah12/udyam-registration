"use client";
import React, { useState, useEffect } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Step2FormProps {
  onSubmit: (data: { pan: string; pin: string; city: string; state: string }) => void;
}

export default function Step2Form({ onSubmit }: Step2FormProps) {
  const [pan, setPan] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-fetch city/state by PIN
  useEffect(() => {
    if (pin.length === 6 && /^\d{6}$/.test(pin)) {
      setLoading(true);
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
            setCity(data[0].PostOffice[0].District);
            setState(data[0].PostOffice[0].State);
          } else {
            setCity("");
            setState("");
          }
        })
        .catch(() => {
          setCity("");
          setState("");
        })
        .finally(() => setLoading(false));
    } else {
      setCity("");
      setState("");
    }
  }, [pin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
      alert("Please enter a valid PAN (e.g., ABCDE1234F).");
      return;
    }
    if (!/^\d{6}$/.test(pin)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }
    if (!city) {
      alert("City is required.");
      return;
    }
    if (!state) {
      alert("State is required.");
      return;
    }

    setSubmitting(true);
    try {
      // Call your backend to submit data
      const response = await fetch(`${backendUrl}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pan: pan.toUpperCase(), pin, city, state }),
      });
      const result = await response.json();

      if (result.success) {
        alert("Form submitted successfully!");
        onSubmit({ pan: pan.toUpperCase(), pin, city, state });
      } else {
        alert(result.message || "Failed to submit form.");
      }
    } catch (error) {
      alert("Error submitting form.");
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
    >
      {/* Heading */}
      <div className="bg-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-6">
        Step 2: PAN Verification
      </div>

      {/* PAN Input */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">PAN Number</label>
        <input
          type="text"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          maxLength={10}
          className="w-full border-2 border-gray-400 rounded px-4 py-2 text-lg text-black
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="ABCDE1234F"
          disabled={submitting}
        />
      </div>

      {/* PIN Input */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">PIN Code</label>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={6}
          className="w-full border-2 border-gray-400 rounded px-4 py-2 text-lg text-black
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter 6-digit PIN"
          disabled={submitting}
        />
      </div>

      {/* City Input (readonly) */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">City</label>
        <input
          type="text"
          value={city}
          readOnly
          className="w-full border-2 border-gray-300 bg-gray-100 rounded px-4 py-2 text-lg text-black"
          placeholder="City auto-filled"
        />
      </div>

      {/* State Input (readonly) */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-1">State</label>
        <input
          type="text"
          value={state}
          readOnly
          className="w-full border-2 border-gray-300 bg-gray-100 rounded px-4 py-2 text-lg text-black"
          placeholder="State auto-filled"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        disabled={loading || submitting}
      >
        {submitting ? "Submitting..." : loading ? "Fetching..." : "Submit"}
      </button>
    </form>
  );
}
