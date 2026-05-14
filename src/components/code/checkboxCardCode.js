export const checkboxCardCodeString = `import { forwardRef } from "react";
import { Check } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const CheckboxCard = forwardRef(
  ({ className, children, title, description, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-within:ring-blue-500 dark:focus-within:ring-offset-slate-950 dark:has-[:checked]:border-blue-500 dark:has-[:checked]:bg-blue-900/10",
          className
        )}
      >
        <div className="flex w-full items-start gap-4">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              type="checkbox"
              ref={ref}
              className="peer h-5 w-5 shrink-0 appearance-none rounded border border-slate-300 bg-white shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 checked:bg-blue-500 checked:border-blue-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 transition-colors cursor-pointer"
              {...props}
            />
            <Check className="pointer-events-none absolute h-3.5 w-3.5 stroke-[3] text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col gap-1">
            {title && (
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </span>
            )}
            {description && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </span>
            )}
            {children && <div className="mt-2 text-sm">{children}</div>}
          </div>
        </div>
      </label>
    );
  }
);
CheckboxCard.displayName = "CheckboxCard";
`;
