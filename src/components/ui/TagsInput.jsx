import { forwardRef, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const TagsInput = forwardRef(
  (
    {
      value,
      defaultValue = [],
      onChange,
      placeholder = "Add tag...",
      maxTags,
      allowDuplicates = false,
      validateTag,
      addOnBlur = true,
      disabled = false,
      readOnly = false,
      delimiter = ["Enter", ","],
      className,
      tagClassName,
      ...props
    },
    ref
  ) => {
    // Controlled vs uncontrolled state
    const [tags, setTags] = useState(value !== undefined ? value : defaultValue);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(null);
    const [activeTagIndex, setActiveTagIndex] = useState(-1);

    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const tagRefs = useRef([]);

    // Sync controlled state
    useEffect(() => {
      if (value !== undefined) {
        setTags(value);
      }
    }, [value]);

    // Handle tag index focus updates
    useEffect(() => {
      if (activeTagIndex >= 0 && tagRefs.current[activeTagIndex]) {
        tagRefs.current[activeTagIndex].focus();
      } else if (activeTagIndex === -1 && inputRef.current) {
        inputRef.current.focus();
      }
    }, [activeTagIndex]);

    const handleAddTag = (tagText) => {
      const cleanTag = tagText.trim();
      if (!cleanTag) return;

      // Reset errors
      setError(null);

      // Check max tags limit
      if (maxTags && tags.length >= maxTags) {
        setError(`Maximum limit of ${maxTags} tags reached.`);
        return;
      }

      // Check duplicate tags
      if (!allowDuplicates && tags.includes(cleanTag)) {
        setError(`Tag "${cleanTag}" already exists.`);
        return;
      }

      // Custom validation check
      if (validateTag && !validateTag(cleanTag)) {
        setError(`Tag "${cleanTag}" is invalid.`);
        return;
      }

      const nextTags = [...tags, cleanTag];
      if (value === undefined) {
        setTags(nextTags);
      }
      if (onChange) {
        onChange(nextTags);
      }

      setInputValue("");
    };

    const handleRemoveTag = (indexToRemove) => {
      if (disabled || readOnly) return;

      const nextTags = tags.filter((_, i) => i !== indexToRemove);
      if (value === undefined) {
        setTags(nextTags);
      }
      if (onChange) {
        onChange(nextTags);
      }

      // Adjust focus state
      if (activeTagIndex === indexToRemove) {
        setActiveTagIndex(nextTags.length > 0 ? Math.max(0, indexToRemove - 1) : -1);
      } else if (activeTagIndex > indexToRemove) {
        setActiveTagIndex((prev) => prev - 1);
      }
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      if (error) setError(null);
    };

    const handleInputKeyDown = (e) => {
      if (disabled || readOnly) return;

      // Delimiter checks
      const delimiters = Array.isArray(delimiter) ? delimiter : [delimiter];
      if (delimiters.includes(e.key)) {
        e.preventDefault();
        handleAddTag(inputValue);
        return;
      }

      // Backspace handler to select or delete last tag
      if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        e.preventDefault();
        setActiveTagIndex(tags.length - 1);
        return;
      }

      // ArrowLeft handler to focus last tag
      if (e.key === "ArrowLeft" && !inputValue && tags.length > 0) {
        e.preventDefault();
        setActiveTagIndex(tags.length - 1);
        return;
      }
    };

    const handleTagKeyDown = (e, index) => {
      if (disabled || readOnly) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setActiveTagIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          if (index === tags.length - 1) {
            setActiveTagIndex(-1);
          } else {
            setActiveTagIndex((prev) => Math.min(tags.length - 1, prev + 1));
          }
          break;
        case "Backspace":
        case "Delete":
          e.preventDefault();
          handleRemoveTag(index);
          break;
        case "Escape":
          e.preventDefault();
          setActiveTagIndex(-1);
          break;
        default:
          break;
      }
    };

    const handleBlur = (e) => {
      // Check if we are shifting focus within the component container
      if (containerRef.current?.contains(e.relatedTarget)) {
        return;
      }

      // Trigger tag creation on blur
      if (addOnBlur && inputValue) {
        handleAddTag(inputValue);
      }
      
      setActiveTagIndex(-1);
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Main Input Wrapper Box */}
        <div
          ref={containerRef}
          onBlur={handleBlur}
          onClick={() => {
            if (!disabled && activeTagIndex === -1) {
              inputRef.current?.focus();
            }
          }}
          className={cn(
            "flex flex-wrap gap-2 items-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 rounded-lg transition-all",
            !disabled && "cursor-text focus-within:ring-2 focus-within:ring-slate-400 dark:focus-within:ring-slate-600 focus-within:border-transparent",
            disabled && "opacity-60 cursor-not-allowed",
            error && "border-red-500 focus-within:ring-red-400 dark:focus-within:ring-red-600",
            className
          )}
        >
          <AnimatePresence initial={false}>
            {tags.map((tag, index) => {
              const isFocused = activeTagIndex === index;
              return (
                <motion.span
                  key={`${tag}-${index}`}
                  ref={(node) => {
                    tagRefs.current[index] = node;
                  }}
                  tabIndex={disabled || readOnly ? -1 : 0}
                  onKeyDown={(e) => handleTagKeyDown(e, index)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none transition-all",
                    isFocused && "ring-2 ring-slate-900 dark:ring-slate-100 border-transparent",
                    tagClassName
                  )}
                >
                  {tag}
                  {!disabled && !readOnly && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(index);
                      }}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </motion.span>
              );
            })}
          </AnimatePresence>

          {/* Interactive Text Field */}
          {!readOnly && (
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="flex-1 min-w-[100px] bg-transparent border-0 outline-none p-0 text-sm text-slate-950 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0"
              {...props}
            />
          )}
        </div>

        {/* Error Validation Message */}
        {error && (
          <span className="text-xs font-medium text-red-500 dark:text-red-400 animate-fade-in px-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TagsInput.displayName = "TagsInput";
