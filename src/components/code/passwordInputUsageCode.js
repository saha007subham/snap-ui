export const passwordInputUsageCode = `import { useState } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";

export default function PasswordInputDemo() {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* 1. Basic Password Input with visibility toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Password
        </label>
        <PasswordInput
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* 2. Password Input with Strength Meter & Requirements */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Secure Password
        </label>
        <PasswordInput
          placeholder="Choose a strong password"
          showStrength
          showRequirements
        />
      </div>

      {/* 3. Disabled Password Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Disabled Input
        </label>
        <PasswordInput
          placeholder="Cannot enter password"
          disabled
        />
      </div>
    </div>
  );
}`;
