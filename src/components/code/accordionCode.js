export const accordionCodeString = `import { forwardRef, useState, createContext, useContext, useId, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export const Accordion = forwardRef(
  (
    {
      type = "single",
      value,
      defaultValue,
      onValueChange,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isSingle = type === "single";
    const [internalValue, setInternalValue] = useState(() => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return isSingle ? "" : [];
    });

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const activeValues = isSingle
      ? [internalValue]
      : Array.isArray(internalValue)
      ? internalValue
      : [];

    const handleToggleItem = (itemValue) => {
      let nextValue;
      if (isSingle) {
        if (internalValue === itemValue) {
          nextValue = collapsible ? "" : internalValue;
        } else {
          nextValue = itemValue;
        }
      } else {
        const current = Array.isArray(internalValue) ? internalValue : [];
        if (current.includes(itemValue)) {
          nextValue = current.filter((v) => v !== itemValue);
        } else {
          nextValue = [...current, itemValue];
        }
      }

      if (value === undefined) {
        setInternalValue(nextValue);
      }

      if (onValueChange) {
        onValueChange(nextValue);
      }
    };

    const containerRef = useRef(null);

    const handleKeyDown = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const target = e.target;
      if (!target.hasAttribute("data-accordion-trigger")) return;

      const triggers = Array.from(
        container.querySelectorAll("[data-accordion-trigger]:not([disabled])")
      );
      const index = triggers.indexOf(target);

      if (index === -1) return;

      let nextIndex = index;
      switch (e.key) {
        case "ArrowDown":
          nextIndex = (index + 1) % triggers.length;
          break;
        case "ArrowUp":
          nextIndex = (index - 1 + triggers.length) % triggers.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      triggers[nextIndex]?.focus();
    };

    return (
      <AccordionContext.Provider
        value={{
          activeValues,
          handleToggleItem,
        }}
      >
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          onKeyDown={handleKeyDown}
          className={cn("w-full divide-y divide-slate-200 dark:divide-slate-800", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

Accordion.Item = forwardRef(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { activeValues } = useContext(AccordionContext) || {};
    const isExpanded = activeValues ? activeValues.includes(value) : false;
    const triggerId = useId();
    const contentId = useId();

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          disabled,
          isExpanded,
          triggerId,
          contentId,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "border-b border-slate-200 dark:border-slate-800",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

Accordion.Item.displayName = "Accordion.Item";

Accordion.Trigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    const { handleToggleItem } = useContext(AccordionContext) || {};
    const { value, disabled, isExpanded, triggerId, contentId } =
      useContext(AccordionItemContext) || {};

    return (
      <h3 className="flex">
        <button
          ref={ref}
          id={triggerId}
          type="button"
          aria-controls={contentId}
          aria-expanded={isExpanded}
          disabled={disabled}
          data-accordion-trigger
          onClick={() => handleToggleItem && handleToggleItem(value)}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-slate-900 dark:text-white outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 rounded-sm text-left",
            disabled && "cursor-not-allowed hover:no-underline",
            className
          )}
          {...props}
        >
          {children}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200 text-slate-500 dark:text-slate-400",
              isExpanded && "rotate-180"
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
    );
  }
);

Accordion.Trigger.displayName = "Accordion.Trigger";

Accordion.Content = forwardRef(
  ({ className, children, ...props }, ref) => {
    const { isExpanded, triggerId, contentId } = useContext(AccordionItemContext) || {};

    return (
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={ref}
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
            {...props}
          >
            <div className={cn("pb-4 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed", className)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Accordion.Content.displayName = "Accordion.Content";
`;
