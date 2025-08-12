interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressTracker({
  currentStep,
  totalSteps,
}: ProgressTrackerProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <p className="mb-2 text-center font-semibold text-black">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="h-3 bg-gray-200 rounded-lg shadow-inner border border-gray-300">
        <div
          className="h-3 bg-[#0B4F6C] rounded-lg transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
