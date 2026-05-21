export const datePickerCodeString = `import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

// Lightweight internal date helpers to keep the component dependency-free
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return month + " " + day + ", " + year;
}

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date) {
  return isSameDay(date, new Date());
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const DatePicker = forwardRef(
  (
    {
      mode = "single",
      value,
      onChange,
      placeholder = "Select date...",
      disabled = false,
      minDate,
      maxDate,
      showPresets = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Track calendar's active viewing month/year
    const today = startOfDay(new Date());
    const initialViewDate =
      mode === "single"
        ? value || today
        : value?.from || today;
    
    const [viewDate, setViewDate] = useState(initialViewDate);
    const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "month" | "year"
    const [yearRangeStart, setYearRangeStart] = useState(
      Math.floor(viewDate.getFullYear() / 12) * 12
    );
    const [hoveredDate, setHoveredDate] = useState(null);

    const wrapperRef = useRef(null);

    // Sync view date if value changes externally
    useEffect(() => {
      if (mode === "single" && value) {
        setViewDate(new Date(value));
      } else if (mode === "range" && value?.from) {
        setViewDate(new Date(value.from));
      }
    }, [value, mode]);

    // Close calendar popover on click outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    // Check if a date is out of min/max boundaries
    const isDateDisabled = (date) => {
      if (!date) return false;
      const target = startOfDay(date);
      if (minDate && target < startOfDay(minDate)) return true;
      if (maxDate && target > startOfDay(maxDate)) return true;
      return false;
    };

    // Calendar grid calculations (42 days representation)
    const getDays = () => {
      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
      const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
      const prevTotalDays = new Date(currentYear, currentMonth, 0).getDate();

      const days = [];

      // Padding from previous month
      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const d = new Date(currentYear, currentMonth - 1, prevTotalDays - i);
        days.push({
          date: d,
          isCurrentMonth: false,
          disabled: isDateDisabled(d),
        });
      }

      // Days of the active month
      for (let i = 1; i <= totalDays; i++) {
        const d = new Date(currentYear, currentMonth, i);
        days.push({
          date: d,
          isCurrentMonth: true,
          disabled: isDateDisabled(d),
        });
      }

      // Padding from next month
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(currentYear, currentMonth + 1, i);
        days.push({
          date: d,
          isCurrentMonth: false,
          disabled: isDateDisabled(d),
        });
      }

      return days;
    };

    const daysGrid = getDays();

    // Event Handlers for Month / Year shifts
    const handlePrev = () => {
      if (viewMode === "calendar") {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
      } else if (viewMode === "month") {
        setViewDate(new Date(currentYear - 1, currentMonth, 1));
      } else if (viewMode === "year") {
        setYearRangeStart((prev) => prev - 12);
      }
    };

    const handleNext = () => {
      if (viewMode === "calendar") {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
      } else if (viewMode === "month") {
        setViewDate(new Date(currentYear + 1, currentMonth, 1));
      } else if (viewMode === "year") {
        setYearRangeStart((prev) => prev + 12);
      }
    };

    // Handle selecting a specific day
    const handleDayClick = (day) => {
      if (day.disabled || disabled) return;

      const clicked = startOfDay(day.date);

      if (mode === "single") {
        onChange(clicked);
        setIsOpen(false);
      } else if (mode === "range") {
        const currentRange = value || { from: null, to: null };

        // Reset or select start date
        if (!currentRange.from || (currentRange.from && currentRange.to)) {
          onChange({ from: clicked, to: null });
        } else {
          // If selected end date is before start date, treat it as the new start date
          if (clicked < currentRange.from) {
            onChange({ from: clicked, to: null });
          } else {
            onChange({ from: currentRange.from, to: clicked });
            setIsOpen(false);
          }
        }
      }
    };

    // Range status calculations
    const isDaySelected = (date) => {
      if (mode === "single") {
        return value && isSameDay(date, value);
      } else {
        return (
          (value?.from && isSameDay(date, value.from)) ||
          (value?.to && isSameDay(date, value.to))
        );
      }
    };

    const isDayInRange = (date) => {
      if (mode !== "range" || !value?.from) return false;
      const target = startOfDay(date);
      const from = startOfDay(value.from);

      if (value.to) {
        const to = startOfDay(value.to);
        return target > from && target < to;
      }

      if (hoveredDate) {
        const hover = startOfDay(hoveredDate);
        if (hover > from) {
          return target > from && target < hover;
        }
      }
      return false;
    };

    const isRangeStart = (date) => {
      return mode === "range" && value?.from && isSameDay(date, value.from);
    };

    const isRangeEnd = (date) => {
      return mode === "range" && value?.to && isSameDay(date, value.to);
    };

    // Fast Preset Selector (for Range Mode)
    const presets = [
      {
        label: "Today",
        getValue: () => {
          const d = startOfDay(new Date());
          return { from: d, to: d };
        },
      },
      {
        label: "Yesterday",
        getValue: () => {
          const d = startOfDay(new Date());
          d.setDate(d.getDate() - 1);
          return { from: d, to: d };
        },
      },
      {
        label: "Last 7 Days",
        getValue: () => {
          const to = startOfDay(new Date());
          const from = startOfDay(new Date());
          from.setDate(from.getDate() - 6);
          return { from, to };
        },
      },
      {
        label: "Last 30 Days",
        getValue: () => {
          const to = startOfDay(new Date());
          const from = startOfDay(new Date());
          from.setDate(from.getDate() - 29);
          return { from, to };
        },
      },
      {
        label: "This Month",
        getValue: () => {
          const today = new Date();
          const from = startOfDay(new Date(today.getFullYear(), today.getMonth(), 1));
          const to = startOfDay(new Date(today.getFullYear(), today.getMonth() + 1, 0));
          return { from, to };
        },
      },
    ];

    const applyPreset = (preset) => {
      if (disabled) return;
      const val = preset.getValue();
      // Validate bounds of preset
      if (isDateDisabled(val.from) || isDateDisabled(val.to)) return;
      onChange(val);
      setViewDate(val.from);
      setIsOpen(false);
    };

    const clearValue = (e) => {
      e.stopPropagation();
      if (disabled) return;
      onChange(mode === "single" ? null : { from: null, to: null });
    };

    // Calculate readable value string for input triggers
    const getTriggerText = () => {
      if (mode === "single") {
        return value ? formatDate(value) : "";
      } else {
        if (!value?.from) return "";
        if (!value.to) return formatDate(value.from) + " - ...";
        return formatDate(value.from) + " - " + formatDate(value.to);
      }
    };

    const triggerText = getTriggerText();

    return (
      <div className={cn("relative w-full", className)} ref={wrapperRef}>
        {/* Trigger Button/Input */}
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center justify-between w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-slate-400 dark:hover:border-slate-600 select-none",
            disabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-4 w-4 text-slate-400 shrink-0" />
            <span className={cn("truncate", !triggerText && "text-slate-400")}>
              {triggerText || placeholder}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {triggerText && !disabled && (
              <button
                type="button"
                onClick={clearValue}
                className="p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isOpen && "transform rotate-180")} />
          </div>
        </div>

        {/* Datepicker Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row focus:outline-none"
            >
              {/* Presets Sidebar (Desktop/Range mode) */}
              {mode === "range" && showPresets && (
                <div className="w-full md:w-36 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-2.5 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="px-2.5 py-1.5 text-xs text-left font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded transition-colors whitespace-nowrap md:w-full select-none cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Calendar Panel */}
              <div className="p-4 w-[280px] sm:w-[300px] select-none">
                {/* Header Navigation */}
                <div className="flex justify-between items-center mb-4">
                  {viewMode === "calendar" && (
                    <>
                      <div className="flex gap-1.5 items-center">
                        <button
                          type="button"
                          onClick={() => setViewMode("month")}
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                        >
                          {MONTHS[currentMonth]}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setViewMode("year");
                            setYearRangeStart(Math.floor(currentYear / 12) * 12);
                          }}
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                        >
                          {currentYear}
                        </button>
                      </div>
                    </>
                  )}

                  {viewMode === "month" && (
                    <span className="text-sm font-semibold text-slate-900 dark:text-white px-1.5">
                      Select Month ({currentYear})
                    </span>
                  )}

                  {viewMode === "year" && (
                    <span className="text-sm font-semibold text-slate-900 dark:text-white px-1.5">
                      Years {yearRangeStart} - {yearRangeStart + 11}
                    </span>
                  )}

                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded cursor-pointer transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Grid Content */}
                {viewMode === "calendar" && (
                  <>
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-y-1 text-center mb-1.5">
                      {WEEKDAYS.map((day) => (
                        <div key={day} className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div
                      className="grid grid-cols-7 gap-y-1 text-center"
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {daysGrid.map((day, idx) => {
                        const isSel = isDaySelected(day.date);
                        const isTodayDate = isToday(day.date);
                        const isRangeSt = isRangeStart(day.date);
                        const isRangeEd = isRangeEnd(day.date);
                        const inRange = isDayInRange(day.date);

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={day.disabled}
                            onClick={() => handleDayClick(day)}
                            onMouseEnter={() => {
                              if (mode === "range" && value?.from && !value.to && !day.disabled) {
                                setHoveredDate(day.date);
                              }
                            }}
                            className={cn(
                              "relative h-8 w-8 text-xs font-normal rounded-md transition-colors flex items-center justify-center cursor-pointer select-none",
                              // Month boundary
                              day.isCurrentMonth
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-300 dark:text-slate-600",
                              // Today highlight
                              isTodayDate && !isSel && "border border-blue-500 text-blue-600 dark:text-blue-400 font-semibold",
                              // Selected highlight (Solid backgrounds)
                              isSel && "bg-blue-600 text-white font-semibold dark:bg-blue-500",
                              // Hover style when not selected
                              !isSel && !inRange && !day.disabled && "hover:bg-slate-100 dark:hover:bg-slate-800",
                              // Range highlights
                              inRange && "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-none",
                              isRangeSt && mode === "range" && value?.to && "rounded-r-none",
                              isRangeEd && "rounded-l-none",
                              // Disabled
                              day.disabled && "opacity-30 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent"
                            )}
                          >
                            <span>{day.date.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {viewMode === "month" && (
                  <div className="grid grid-cols-3 gap-2 py-2">
                    {MONTHS.map((month, idx) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => {
                          setViewDate(new Date(currentYear, idx, 1));
                          setViewMode("calendar");
                        }}
                        className={cn(
                          "py-2.5 text-xs font-medium rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer transition-colors",
                          currentMonth === idx && "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800"
                        )}
                      >
                        {month.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                )}

                {viewMode === "year" && (
                  <div className="grid grid-cols-3 gap-2 py-2">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const year = yearRangeStart + idx;
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setViewDate(new Date(year, currentMonth, 1));
                            setViewMode("calendar");
                          }}
                          className={cn(
                            "py-2.5 text-xs font-medium rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer transition-colors",
                            currentYear === year && "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800"
                          )}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
`;
