export const pinUsageCode = `import { useState } from "react";
import { PinInput } from "@/components/ui/PinInput";

export default function PinInputDemo() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComplete = (value) => {
    setIsVerifying(true);
    setError(false);
    setSuccess(false);

    // Simulate server verification API
    setTimeout(() => {
      setIsVerifying(false);
      if (value === "123456") {
        setSuccess(true);
      } else {
        setError(true);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* 6-Digit OTP Verification Box */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Enter Verification Code
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter the 6-digit code sent to your email (Try 123456 for success, anything else for error)
        </p>
        <PinInput
          length={6}
          type="numeric"
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
          disabled={isVerifying}
          error={error}
          success={success}
          variant="outline"
          size="md"
        />
        {isVerifying && <p className="text-xs text-blue-500">Verifying code...</p>}
        {success && <p className="text-xs text-emerald-500">Success! Code verified.</p>}
        {error && <p className="text-xs text-rose-500">Invalid code. Please try again.</p>}
      </div>

      {/* Secret Passcode Masked */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Secret 4-Digit Passcode
        </label>
        <PinInput
          length={4}
          type="numeric"
          mask="★"
          variant="filled"
          size="lg"
        />
      </div>
    </div>
  );
}
`;
