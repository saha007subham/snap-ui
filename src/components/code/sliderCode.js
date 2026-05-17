export const sliderCodeString = `import { forwardRef, useState, useEffect } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Slider = forwardRef(
  ({ className, disabled, min = 0, max = 100, defaultValue = 50, value, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue);

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const percentage = max > min ? ((internalValue - min) / (max - min)) * 100 : 0;

    return (
      <div className={cn("relative w-full h-5 flex items-center group", disabled && "opacity-50", className)}>
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden pointer-events-none">
          {/* Active Track */}
          <div 
            className="h-full bg-slate-900 dark:bg-white transition-all duration-75 ease-out" 
            style={{ width: \`\${percentage}%\` }}
          />
        </div>
        
        {/* Native Input */}
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          className="peer absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          {...props}
        />
        
        {/* Custom Thumb */}
        <div 
          className={cn(
            "absolute h-5 w-5 bg-white border-[2.5px] border-slate-900 dark:border-white rounded-full pointer-events-none shadow-sm flex items-center justify-center transition-transform",
            "peer-hover:scale-110 peer-active:scale-95",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-slate-400 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-slate-500 dark:peer-focus-visible:ring-offset-slate-950",
            disabled && "peer-hover:scale-100 peer-active:scale-100"
          )}
          style={{ 
            left: \`calc(\${percentage}% - 10px)\`
          }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";
`;
