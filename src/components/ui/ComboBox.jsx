import { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ComboBox = forwardRef(
  ({ options = [], placeholder = "Select option...", disabled = false, onChange, value, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    
    const [internalValue, setInternalValue] = useState(value || null);
    const selectedValue = value !== undefined ? value : internalValue;

    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      if (!isOpen && selectedValue) {
        const selectedOption = options.find((opt) => opt.value === selectedValue);
        if (selectedOption) {
          setInputValue(selectedOption.label);
        }
      } else if (!isOpen && !selectedValue) {
        setInputValue("");
      }
    }, [isOpen, selectedValue, options]);

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

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const isInputValueMatchingSelected = selectedOption && inputValue === selectedOption.label;

    const filteredOptions = isInputValueMatchingSelected
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

    const handleSelect = (option) => {
      if (value === undefined) {
        setInternalValue(option.value);
      }
      setInputValue(option.label);
      setIsOpen(false);
      if (onChange) {
        onChange(option.value);
      }
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && isOpen) {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div className={cn("relative w-full", className)} ref={wrapperRef}>
        <div 
          className={cn(
            "relative flex items-center w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
            disabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900"
          )}
        >
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            type="text"
            className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="combobox-options"
            aria-autocomplete="list"
          />
          <button
            type="button"
            className="flex items-center justify-center px-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:cursor-not-allowed"
            onClick={() => {
              if (!disabled) {
                setIsOpen(!isOpen);
                if (!isOpen) inputRef.current?.focus();
              }
            }}
            disabled={disabled}
            tabIndex={-1}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg py-1 max-h-60 overflow-auto focus:outline-none">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                No results found.
              </div>
            ) : (
              <ul id="combobox-options" role="listbox">
                {filteredOptions.map((option, index) => {
                  const isSelected = selectedValue === option.value;
                  const isHighlighted = highlightedIndex === index;
                  
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      className={cn(
                        "relative cursor-default select-none py-2 pl-3 pr-9 text-sm text-slate-900 dark:text-slate-100 transition-colors",
                        isHighlighted ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      )}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <span className={cn("block truncate", isSelected ? "font-semibold" : "font-normal")}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 dark:text-blue-400">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
);
ComboBox.displayName = "ComboBox";
