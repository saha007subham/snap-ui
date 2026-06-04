export const segmentedControlCodeString = `import { forwardRef, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const SegmentedControl = forwardRef(
  (
    {
      options = [],
      value,
      defaultValue,
      onChange,
      size = "md",
      fullWidth = false,
      disabled = false,
      name,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(() => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return options[0]?.value;
    });

    const optionRefs = useRef([]);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleSelect = (val) => {
      if (disabled) return;

      if (value === undefined) {
        setSelectedValue(val);
      }

      if (onChange) {
        onChange(val);
      }
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      const enabledOptions = options.filter((opt) => !opt.disabled);
      if (enabledOptions.length === 0) return;

      const currentIndex = enabledOptions.findIndex((opt) => opt.value === selectedValue);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (currentIndex + 1) % enabledOptions.length;
          handleSelect(enabledOptions[nextIndex].value);
          focusOption(enabledOptions[nextIndex].value);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
          handleSelect(enabledOptions[nextIndex].value);
          focusOption(enabledOptions[nextIndex].value);
          break;
        default:
          break;
      }
    };

    const focusOption = (val) => {
      const idx = options.findIndex((opt) => opt.value === val);
      if (idx !== -1 && optionRefs.current[idx]) {
        optionRefs.current[idx].focus();
      }
    };

    const sizeMap = {
      sm: {
        container: "p-0.5 rounded-lg h-9",
        button: "px-3 py-1 text-xs rounded-md",
      },
      md: {
        container: "p-1 rounded-xl h-11",
        button: "px-4 py-1.5 text-sm rounded-lg",
      },
      lg: {
        container: "p-1 rounded-2xl h-13",
        button: "px-5 py-2 text-base rounded-xl",
      },
    };

    const activeSize = sizeMap[size] || sizeMap.md;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 items-center justify-start select-none transition-colors",
          fullWidth ? "flex w-full" : "w-auto",
          disabled && "opacity-50 cursor-not-allowed",
          activeSize.container,
          className
        )}
        {...props}
      >
        {options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          const isOptionDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isOptionDisabled}
              disabled={isOptionDisabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative flex items-center justify-center font-medium transition-colors outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
                fullWidth ? "flex-1" : "flex-initial",
                isOptionDisabled && "opacity-50 cursor-not-allowed",
                isSelected
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
                activeSize.button
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="segmented-active-indicator"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-[inherit] shadow-sm border border-slate-200/60 dark:border-slate-700/60 z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap">
                {option.icon && <span className="h-4 w-4 flex items-center justify-center shrink-0">{option.icon}</span>}
                {option.label}
              </span>
            </button>
          );
        })}

        {name && <input type="hidden" name={name} value={selectedValue} />}
      </div>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";
`;
