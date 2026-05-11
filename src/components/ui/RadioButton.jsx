import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const RadioButton = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          ref={ref}
          className={cn(
            "peer h-5 w-5 shrink-0 appearance-none rounded-full border border-slate-300 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:focus-visible:ring-slate-800 checked:bg-slate-900 checked:border-slate-900 dark:checked:bg-slate-50 dark:checked:border-slate-50 transition-colors cursor-pointer",
            className
          )}
          {...props}
        />
        <svg
          className="pointer-events-none absolute h-2.5 w-2.5 fill-current text-white dark:text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 10 10"
        >
          <circle cx="5" cy="5" r="5" />
        </svg>
      </div>
    );
  }
);
RadioButton.displayName = "RadioButton";
