import { forwardRef, useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DEFAULT_REQUIREMENTS = [
  { id: "length", label: "At least 8 characters", test: (val) => val.length >= 8 },
  { id: "lowercase", label: "At least one lowercase letter", test: (val) => /[a-z]/.test(val) },
  { id: "uppercase", label: "At least one uppercase letter", test: (val) => /[A-Z]/.test(val) },
  { id: "number", label: "At least one number (0-9)", test: (val) => /[0-9]/.test(val) },
  { id: "special", label: "At least one special character (e.g., @$!%*?&)", test: (val) => /[^A-Za-z0-9]/.test(val) },
];

export const PasswordInput = forwardRef(
  (
    {
      className,
      value: customValue,
      onChange,
      showStrength = false,
      showRequirements = false,
      requirements = DEFAULT_REQUIREMENTS,
      requirementsClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    
    // Support both controlled and uncontrolled value tracking
    const isControlled = customValue !== undefined;
    const currentValue = isControlled ? customValue : internalValue;

    const handleTextChange = (e) => {
      const val = e.target.value;
      if (!isControlled) {
        setInternalValue(val);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Calculate requirements status
    const reqStatus = requirements.map((req) => ({
      ...req,
      met: req.test(currentValue),
    }));

    const metCount = reqStatus.filter((r) => r.met).length;
    const totalCount = requirements.length;

    // Calculate strength score (0 to 4 range for the meter UI)
    const getStrengthDetails = () => {
      if (!currentValue) return { score: 0, label: "Empty", color: "bg-slate-200 dark:bg-slate-800 text-slate-400" };
      
      const percentage = (metCount / totalCount) * 100;
      
      if (percentage <= 20) {
        return { score: 1, label: "Very Weak", color: "bg-rose-500 text-rose-500" };
      } else if (percentage <= 40) {
        return { score: 1, label: "Weak", color: "bg-orange-500 text-orange-500" };
      } else if (percentage <= 60) {
        return { score: 2, label: "Fair", color: "bg-amber-500 text-amber-500" };
      } else if (percentage <= 80) {
        return { score: 3, label: "Good", color: "bg-teal-500 text-teal-500" };
      } else {
        return { score: 4, label: "Strong", color: "bg-emerald-500 text-emerald-500" };
      }
    };

    const strength = getStrengthDetails();

    return (
      <div className="w-full space-y-3">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={currentValue}
            onChange={handleTextChange}
            className={cn(
              "flex h-10 w-full rounded-md border border-slate-200 bg-white pl-3 pr-10 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-slate-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium dark:file:text-white",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 transition-transform active:scale-95" />
            ) : (
              <Eye className="h-4 w-4 transition-transform active:scale-95" />
            )}
          </button>
        </div>

        {/* Strength Meter Section */}
        {showStrength && currentValue.length > 0 && (
          <div className="space-y-1.5 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
              <span className={cn("font-semibold transition-colors duration-300", strength.label === "Empty" ? "text-slate-400" : strength.color.replace("bg-", "text-"))}>
                {strength.label}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900">
              {[1, 2, 3, 4].map((index) => {
                const isActive = strength.score >= index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      isActive ? strength.color : "bg-transparent"
                    )}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Requirements Checklist Section */}
        {showRequirements && (
          <div className={cn("space-y-1.5 pt-1", requirementsClassName)}>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Must contain:
            </p>
            <ul className="space-y-1">
              {reqStatus.map((req) => (
                <li
                  key={req.id}
                  className="flex items-center gap-2 text-xs transition-colors duration-300"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center h-4 w-4 rounded-full border transition-all duration-300",
                      req.met
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 dark:bg-emerald-500/20"
                        : currentValue.length > 0
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400 dark:bg-rose-500/20"
                        : "bg-transparent border-slate-200 dark:border-slate-800 text-transparent"
                    )}
                  >
                    {req.met ? (
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    ) : currentValue.length > 0 ? (
                      <X className="h-2.5 w-2.5 stroke-[3]" />
                    ) : (
                      <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "transition-all duration-300",
                      req.met
                        ? "text-emerald-600 dark:text-emerald-400 font-medium"
                        : currentValue.length > 0
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
