import { forwardRef } from "react";
import { Minus, Plus } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NumberField = forwardRef(
  ({ className, disabled, min, max, step = 1, onChange, ...props }, ref) => {
    const triggerChange = (inputElement, newValue) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(inputElement, newValue);
      const ev = new Event("input", { bubbles: true });
      inputElement.dispatchEvent(ev);
    };

    const handleDecrement = (e) => {
      const input = e.currentTarget.nextElementSibling;
      input.stepDown();
      triggerChange(input, input.value);
    };

    const handleIncrement = (e) => {
      const input = e.currentTarget.previousElementSibling;
      input.stepUp();
      triggerChange(input, input.value);
    };

    return (
      <div className={cn("relative flex items-center w-full max-w-[200px]", className)}>
        <button
          type="button"
          disabled={disabled}
          onClick={handleDecrement}
          className="absolute left-1 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors cursor-pointer"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          ref={ref}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-center text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-slate-800 transition-colors",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={handleIncrement}
          className="absolute right-1 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
NumberField.displayName = "NumberField";
