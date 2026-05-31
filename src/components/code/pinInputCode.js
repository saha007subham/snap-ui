export const pinCodeString = `import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import { motion } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const PinInput = forwardRef(
  (
    {
      length = 4,
      type = "numeric",
      mask = false,
      variant = "outline",
      size = "md",
      gap = "3",
      placeholder = "",
      error = false,
      success = false,
      disabled = false,
      autoFocus = true,
      value: customValue,
      onChange,
      onComplete,
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 w-8 text-sm rounded-md",
      md: "h-10 w-10 text-base rounded-md",
      lg: "h-12 w-12 text-lg font-semibold rounded-lg",
      xl: "h-14 w-14 text-xl font-bold rounded-xl",
    };

    const variantClasses = {
      outline: "border border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
      filled: "border border-transparent bg-slate-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-slate-900 dark:focus:bg-slate-950 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
      underlined: "border-b-2 border-t-0 border-x-0 border-slate-200 bg-transparent rounded-none focus:border-blue-500 dark:border-slate-800 dark:focus:border-blue-400",
      glass: "border border-slate-200/50 bg-white/20 backdrop-blur-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-slate-800/50 dark:bg-slate-950/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
    };

    const isControlled = customValue !== undefined;
    const [internalValue, setInternalValue] = useState(Array(length).fill(""));
    
    const valuesArray = isControlled
      ? (customValue || "").split("").concat(Array(length).fill("")).slice(0, length)
      : internalValue;

    const inputRefs = useRef([]);

    useEffect(() => {
      if (isControlled) {
        setInternalValue(
          (customValue || "").split("").concat(Array(length).fill("")).slice(0, length)
        );
      }
    }, [customValue, isControlled, length]);

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    }, [autoFocus]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        const firstEmptyIndex = valuesArray.findIndex((v) => !v);
        const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      },
      clear: () => {
        const cleared = Array(length).fill("");
        if (!isControlled) {
          setInternalValue(cleared);
        }
        onChange?.("");
        inputRefs.current[0]?.focus();
      },
      inputs: inputRefs.current,
    }));

    const validateChar = (char) => {
      if (type === "numeric") return /^[0-9]$/.test(char);
      if (type === "alphabetic") return /^[a-zA-Z]$/.test(char);
      if (type === "alphanumeric") return /^[a-zA-Z0-9]$/.test(char);
      return true;
    };

    const triggerChanges = (newValues) => {
      const combinedVal = newValues.join("");
      if (!isControlled) setInternalValue(newValues);
      onChange?.(combinedVal);
      if (combinedVal.length === length && onComplete) {
        onComplete(combinedVal);
      }
    };

    const handleInputChange = (e, index) => {
      const char = e.target.value;
      if (!char) return;

      const targetChar = char.slice(-1);
      if (!validateChar(targetChar)) return;

      const newValues = [...valuesArray];
      newValues[index] = targetChar;
      triggerChanges(newValues);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...valuesArray];
        if (valuesArray[index]) {
          newValues[index] = "";
          triggerChanges(newValues);
        } else if (index > 0) {
          newValues[index - 1] = "";
          triggerChanges(newValues);
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData.getData("text");
      const cleaned = pastedData
        .split("")
        .filter((c) => validateChar(c))
        .slice(0, length);

      if (cleaned.length === 0) return;

      const newValues = [...valuesArray];
      for (let i = 0; i < length; i++) {
        if (cleaned[i] !== undefined) {
          newValues[i] = cleaned[i];
        }
      }

      triggerChanges(newValues);
      const focusIndex = Math.min(cleaned.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    };

    const gapStyle = isNaN(gap) ? {} : { gap: \`\${gap * 0.25}rem\` };
    const gapClass = isNaN(gap) ? \`gap-\${gap}\` : "";

    return (
      <motion.div
        className={cn("flex flex-row items-center", gapClass, className)}
        style={gapStyle}
        animate={
          error
            ? { x: [-8, 8, -6, 6, -4, 4, -2, 2, 0] }
            : success && valuesArray.join("").length === length
            ? { scale: [1, 1.03, 1] }
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        {Array(length)
          .fill(null)
          .map((_, index) => {
            const hasVal = !!valuesArray[index];
            const isMasked = mask && hasVal;

            return (
              <div key={index} className="relative">
                <input
                  type={isMasked ? "password" : "text"}
                  inputMode={type === "numeric" ? "numeric" : "text"}
                  pattern={type === "numeric" ? "[0-9]*" : undefined}
                  maxLength={1}
                  disabled={disabled}
                  value={valuesArray[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  ref={(el) => (inputRefs.current[index] = el)}
                  placeholder={placeholder || undefined}
                  className={cn(
                    "text-center transition-all duration-200 outline-none select-none",
                    sizeClasses[size],
                    variantClasses[variant],
                    disabled && "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800",
                    error
                      ? "border-rose-500 ring-rose-500/20 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500 dark:focus:border-rose-500 text-rose-600 dark:text-rose-400"
                      : success
                      ? "border-emerald-500 ring-emerald-500/20 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-emerald-400 dark:focus:border-emerald-400 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700",
                    inputClassName
                  )}
                  {...props}
                />
                
                {mask && hasVal && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-800 dark:text-slate-100"
                  >
                    <span className="text-xs">
                      {typeof mask === "string" ? mask : "●"}
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
      </motion.div>
    );
  }
);

PinInput.displayName = "PinInput";
`;
