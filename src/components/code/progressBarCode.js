export const progressBarCodeString = `import { cn } from "@/utils/cn";

const variants = {
  default: "bg-slate-900 dark:bg-white",
  success: "bg-emerald-500 dark:bg-emerald-400",
  warning: "bg-amber-500 dark:bg-amber-400",
  danger: "bg-rose-500 dark:bg-rose-400",
};

const sizes = {
  sm: "h-2",
  md: "h-2.5",
  lg: "h-3",
};

export function ProgressBar({
  value = 0,
  min = 0,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "md",
  indeterminate = false,
  className,
  barClassName,
  ...props
}) {
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = max > min ? ((clampedValue - min) / (max - min)) * 100 : 0;

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label ? <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span> : <span />}
          {showValue ? <span className="text-sm text-slate-500 dark:text-slate-400">{\`${Math.round(percentage)}%\`}</span> : null}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
        aria-label={label || "Progress"}
        className={cn("relative w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", sizes[size] ?? sizes.md)}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out",
            variants[variant] ?? variants.default,
            indeterminate && "w-full animate-pulse",
            barClassName
          )}
          style={indeterminate ? undefined : { width: \`${percentage}%\` }}
        />
      </div>
    </div>
  );
}
`;
