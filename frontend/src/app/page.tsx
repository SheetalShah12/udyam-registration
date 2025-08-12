"use client";
import ProgressTracker from "../components/ProgressTracker";
import Step1Form from "../components/Step1Form";
import Step2Form from "../components/Step2Form";
import React, { useState } from "react";

export default function Home() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<any>({});

  const handleStep1Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleStep2Submit = async (data: any) => {
  const allData = { ...formData, ...data };
  try {
    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allData),
    });
    const json = await res.json();
    if (json.success) {
      alert("Form submitted successfully!");
    } else {
      alert("Failed to submit form.");
    }
  } catch (error) {
    alert("Error submitting form.");
    console.error(error);
  }
};


  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
<h1 className="text-4xl font-extrabold mb-6 text-[#0B4F6C] tracking-wide drop-shadow-sm">
  Udyam Registration
</h1>


      <ProgressTracker currentStep={step} totalSteps={2} />

      {step === 1 && <Step1Form onNext={handleStep1Submit} />}
      {step === 2 && <Step2Form onSubmit={handleStep2Submit} />}
    </main>
  );
}


