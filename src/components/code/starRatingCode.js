export const starRatingCodeString = `import { forwardRef, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const StarRating = forwardRef(
  (
    {
      maxStars = 5,
      value,
      defaultValue = 0,
      onChange,
      allowHalf = false,
      allowClear = true,
      readOnly = false,
      disabled = false,
      size = "md",
      color = "amber",
      showTooltip = false,
      tooltips = [],
      name,
      className,
      ...props
    },
    ref
  ) => {
    const [rating, setRating] = useState(value !== undefined ? value : defaultValue);
    const [hoverRating, setHoverRating] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef(null);

    useEffect(() => {
      if (value !== undefined) {
        setRating(value);
      }
    }, [value]);

    const activeRating = hoverRating !== null ? hoverRating : rating;

    const handleSelect = (newValue) => {
      if (disabled || readOnly) return;

      let finalValue = newValue;
      if (allowClear && rating === newValue) {
        finalValue = 0;
      }

      if (value === undefined) {
        setRating(finalValue);
      }
      
      if (onChange) {
        onChange(finalValue);
      }
    };

    const colorMap = {
      amber: {
        active: "text-amber-500 fill-amber-500",
        inactive: "text-slate-300 dark:text-slate-700",
      },
      yellow: {
        active: "text-yellow-400 fill-yellow-400",
        inactive: "text-slate-300 dark:text-slate-700",
      },
      rose: {
        active: "text-rose-500 fill-rose-500",
        inactive: "text-slate-300 dark:text-slate-700",
      },
      indigo: {
        active: "text-indigo-500 fill-indigo-500",
        inactive: "text-slate-300 dark:text-slate-700",
      },
      emerald: {
        active: "text-emerald-500 fill-emerald-500",
        inactive: "text-slate-300 dark:text-slate-700",
      },
    };

    const activeColors = colorMap[color]?.active || "text-amber-500 fill-amber-500";
    const inactiveColors = colorMap[color]?.inactive || "text-slate-300 dark:text-slate-700";

    const sizeMap = {
      sm: "h-5 w-5",
      md: "h-7 w-7",
      lg: "h-9 w-9",
      xl: "h-11 w-11",
    };

    const starSizeClass = sizeMap[size] || sizeMap.md;

    const handleKeyDown = (e) => {
      if (disabled || readOnly) return;

      const step = allowHalf ? 0.5 : 1;
      let nextRating = rating;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          nextRating = Math.min(maxStars, rating + step);
          handleSelect(nextRating);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          nextRating = Math.max(allowClear ? 0 : step, rating - step);
          handleSelect(nextRating);
          break;
        case "Home":
          e.preventDefault();
          handleSelect(allowClear ? 0 : step);
          break;
        case "End":
          e.preventDefault();
          handleSelect(maxStars);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (hoverRating !== null) {
            handleSelect(hoverRating);
          }
          break;
        default:
          break;
      }
    };

    const getFillWidth = (index) => {
      const difference = activeRating - index;
      if (difference >= 1) return "w-full";
      if (difference > 0) return "w-1/2";
      return "w-0";
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "inline-flex flex-col gap-2 items-center select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div
          ref={ref}
          role="slider"
          aria-valuenow={rating}
          aria-valuemin={0}
          aria-valuemax={maxStars}
          aria-label="Star Rating"
          aria-disabled={disabled}
          tabIndex={disabled || readOnly ? -1 : 0}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocusedIndex(0)}
          onBlur={() => {
            setFocusedIndex(-1);
            setHoverRating(null);
          }}
          className={cn(
            "flex items-center gap-1 outline-none rounded-lg p-1 transition-all",
            !disabled && !readOnly && "focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          )}
        >
          {Array.from({ length: maxStars }).map((_, index) => {
            const fillWidthClass = getFillWidth(index);

            return (
              <div
                key={index}
                className="relative flex items-center justify-center transition-transform duration-100 ease-out"
                onMouseLeave={() => !disabled && !readOnly && setHoverRating(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    starSizeClass,
                    inactiveColors,
                    "transition-colors duration-200"
                  )}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>

                <div
                  className={cn(
                    "absolute top-0 left-0 h-full overflow-hidden transition-all duration-75 pointer-events-none",
                    fillWidthClass
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={cn(
                      starSizeClass,
                      activeColors,
                      "stroke-current stroke-2 pointer-events-none"
                    )}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>

                {!disabled && !readOnly && (
                  <div className="absolute inset-0 z-10 flex">
                    {allowHalf ? (
                      <>
                        <div
                          className="w-1/2 h-full cursor-pointer"
                          onMouseEnter={() => setHoverRating(index + 0.5)}
                          onClick={() => handleSelect(index + 0.5)}
                        />
                        <div
                          className="w-1/2 h-full cursor-pointer"
                          onMouseEnter={() => setHoverRating(index + 1)}
                          onClick={() => handleSelect(index + 1)}
                        />
                      </>
                    ) : (
                      <div
                        className="w-full h-full cursor-pointer"
                        onMouseEnter={() => setHoverRating(index + 1)}
                        onClick={() => handleSelect(index + 1)}
                      />
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {rating === index + 1 && !disabled && !readOnly && (
                    <motion.div
                      layoutId="active-star-pop"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="absolute inset-0 pointer-events-none z-0"
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {showTooltip && (activeRating > 0 || tooltips.length > 0) && (
          <div className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-all shadow-sm">
            {tooltips[Math.ceil(activeRating) - 1] || activeRating}
          </div>
        )}

        {name && <input type="hidden" name={name} value={rating} />}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";
`;
