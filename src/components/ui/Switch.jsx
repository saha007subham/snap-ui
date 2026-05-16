import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Switch = forwardRef(
  ({ className, disabled, ...props }, ref) => {
    return (
      <label className={cn("group relative inline-flex items-center cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div className={cn(
          "w-11 h-6 bg-slate-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-800 dark:bg-slate-800 peer-checked:bg-slate-900 dark:peer-checked:bg-slate-50 transition-colors",
          className
        )}></div>
        <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full flex items-center justify-center shadow-sm dark:bg-slate-400 dark:peer-checked:bg-slate-900"></div>
      </label>
    );
  }
);
Switch.displayName = "Switch";
