export const autocompleteSearchCodeString = `import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Search, X, Clock, Loader2, CornerDownLeft, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const AutocompleteSearch = forwardRef(
  (
    {
      suggestions = [],
      placeholder = "Search...",
      value = "",
      onChange,
      onSelect,
      onSubmit,
      isLoading = false,
      loadingText = "Searching...",
      maxSuggestions = 8,
      minChars = 1,
      enableRecentSearches = true,
      recentSearchesKey = "snap-ui-recent-searches",
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState([]);

    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // Sync input value with external value if it changes
    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    // Load recent searches
    useEffect(() => {
      if (enableRecentSearches) {
        try {
          const stored = localStorage.getItem(recentSearchesKey);
          if (stored) {
            setRecentSearches(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Failed to load recent searches", e);
        }
      }
    }, [enableRecentSearches, recentSearchesKey]);

    // Handle outside clicks
    useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Expose DOM input element to parent ref
    useImperativeHandle(ref, () => inputRef.current);

    // Save recent search
    const saveSearch = (searchTerm) => {
      if (!enableRecentSearches || !searchTerm.trim()) return;
      const cleanTerm = searchTerm.trim();
      const updated = [
        cleanTerm,
        ...recentSearches.filter((item) => item.toLowerCase() !== cleanTerm.toLowerCase()),
      ].slice(0, 5); // Keep last 5

      setRecentSearches(updated);
      try {
        localStorage.setItem(recentSearchesKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save recent searches", e);
      }
    };

    // Remove single recent search
    const deleteRecentSearch = (e, indexToDelete) => {
      e.stopPropagation();
      const updated = recentSearches.filter((_, idx) => idx !== indexToDelete);
      setRecentSearches(updated);
      try {
        localStorage.setItem(recentSearchesKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update recent searches", e);
      }
    };

    // Clear all recent searches
    const clearAllRecent = (e) => {
      e.stopPropagation();
      setRecentSearches([]);
      try {
        localStorage.removeItem(recentSearchesKey);
      } catch (e) {
        console.error("Failed to clear recent searches", e);
      }
    };

    // Normalize suggestions to objects: { id, label, category, raw }
    const normalizedSuggestions = suggestions.map((item, idx) => {
      if (typeof item === "string") {
        return { id: idx, label: item, category: null, raw: item };
      }
      return {
        id: item.id !== undefined ? item.id : idx,
        label: item.label || item.name || String(item),
        category: item.category || null,
        raw: item,
      };
    });

    // Filter suggestions based on query
    const query = inputValue.trim().toLowerCase();
    const shouldShowSuggestions = query.length >= minChars;

    const filteredSuggestions = shouldShowSuggestions
      ? normalizedSuggestions
          .filter((item) => item.label.toLowerCase().includes(query))
          .slice(0, maxSuggestions)
      : [];

    // Group suggestions by category
    const groupedSuggestions = {};
    const uncategorized = [];

    filteredSuggestions.forEach((item) => {
      if (item.category) {
        if (!groupedSuggestions[item.category]) {
          groupedSuggestions[item.category] = [];
        }
        groupedSuggestions[item.category].push(item);
      } else {
        uncategorized.push(item);
      }
    });

    // Flatten representation of currently displayed options for keyboard indices
    const flattenedOptions = [];
    if (inputValue.trim() === "" && enableRecentSearches && recentSearches.length > 0) {
      recentSearches.forEach((term, idx) => {
        flattenedOptions.push({ type: "recent", label: term, index: idx });
      });
    } else {
      // Uncategorized first, then categorized
      uncategorized.forEach((item) => {
        flattenedOptions.push({ type: "suggestion", data: item, index: flattenedOptions.length });
      });
      Object.keys(groupedSuggestions).forEach((cat) => {
        groupedSuggestions[cat].forEach((item) => {
          flattenedOptions.push({ type: "suggestion", data: item, index: flattenedOptions.length });
        });
      });
    }

    const totalSelectableCount = flattenedOptions.length;

    // Handle typing
    const handleInputChange = (e) => {
      const val = e.target.value;
      setInputValue(val);
      setIsOpen(true);
      setHighlightedIndex(-1);
      if (onChange) {
        onChange(val);
      }
    };

    // Handle selecting an item
    const handleSelect = (item) => {
      const finalVal = item.type === "recent" ? item.label : item.data.label;
      if (item.type === "recent") {
        if (onSelect) onSelect(item.label);
      } else {
        if (onSelect) onSelect(item.data.raw);
      }

      setInputValue(finalVal);
      setIsOpen(false);
      setHighlightedIndex(-1);
      saveSearch(finalVal);

      if (onChange) {
        onChange(finalVal);
      }
    };

    // Handle submit (press enter when search input has focus)
    const handleFormSubmit = (e) => {
      e?.preventDefault();
      if (disabled) return;

      // If there's a highlighted index, select that instead of raw search
      if (highlightedIndex >= 0 && highlightedIndex < totalSelectableCount) {
        handleSelect(flattenedOptions[highlightedIndex]);
        return;
      }

      setIsOpen(false);
      saveSearch(inputValue);
      if (onSubmit) {
        onSubmit(inputValue);
      }
    };

    // Keyboard controls
    const handleKeyDown = (e) => {
      if (disabled) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) => (prev < totalSelectableCount - 1 ? prev + 1 : 0));
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(totalSelectableCount - 1);
        } else {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalSelectableCount - 1));
        }
      } else if (e.key === "Enter") {
        // Only prevent form submit if suggestions are open and an item is selected
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < totalSelectableCount) {
          e.preventDefault();
          handleSelect(flattenedOptions[highlightedIndex]);
        } else {
          handleFormSubmit(e);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    // Helper to highlight match
    const renderHighlightedText = (text, highlight) => {
      if (!highlight.trim()) return <span>{text}</span>;
      const escaped = highlight.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
      const regex = new RegExp(\`(\${escaped})\`, "gi");
      const parts = text.split(regex);
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <mark
                key={i}
                className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold px-0.5 rounded"
              >
                {part}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </span>
      );
    };

    const handleClear = () => {
      setInputValue("");
      setHighlightedIndex(-1);
      if (onChange) onChange("");
      inputRef.current?.focus();
    };

    return (
      <div className={cn("relative w-full", className)} ref={wrapperRef}>
        {/* Search Input Container */}
        <form onSubmit={handleFormSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {isLoading ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin text-blue-500" />
            ) : (
              <Search className="h-4.5 w-4.5" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            className={cn(
              "w-full h-11 pl-10 pr-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
              disabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900/50"
            )}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            {...props}
          />

          <AnimatePresence>
            {inputValue && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        {/* Dropdown Suggestions */}
        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden"
            >
              {isLoading && (
                <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-850/10">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                  <span>{loadingText}</span>
                </div>
              )}
              {/* Recent Searches (Empty input, has history) */}
              {inputValue.trim() === "" && enableRecentSearches && recentSearches.length > 0 && (
                <div className="py-2">
                  <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={clearAllRecent}
                      className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <ul>
                    {recentSearches.map((term, idx) => {
                      const absoluteIndex = idx;
                      const isHighlighted = highlightedIndex === absoluteIndex;
                      return (
                        <li
                          key={term}
                          onClick={() => handleSelect({ type: "recent", label: term })}
                          onMouseEnter={() => setHighlightedIndex(absoluteIndex)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer transition-colors",
                            isHighlighted ? "bg-slate-50 dark:bg-slate-800/60" : ""
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Clock className="h-4.5 w-4.5 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{term}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isHighlighted && (
                              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 flex items-center gap-0.5">
                                <CornerDownLeft className="h-2.5 w-2.5" /> Select
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => deleteRecentSearch(e, idx)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                              title="Delete search history item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Filtering suggestions */}
              {inputValue.trim() !== "" && (
                <>
                  {filteredSuggestions.length === 0 && !isLoading ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                      No matches found for <span className="font-semibold text-slate-900 dark:text-white">"{inputValue}"</span>
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto custom-scrollbar py-1">
                      {/* Uncategorized first */}
                      {uncategorized.length > 0 && (
                        <ul>
                          {uncategorized.map((item) => {
                            const option = flattenedOptions.find(
                              (opt) => opt.type === "suggestion" && opt.data.id === item.id
                            );
                            const isHighlighted = highlightedIndex === option?.index;
                            return (
                              <li
                                key={item.id}
                                onClick={() => handleSelect(option)}
                                onMouseEnter={() => setHighlightedIndex(option?.index || 0)}
                                className={cn(
                                  "flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer transition-colors",
                                  isHighlighted ? "bg-slate-50 dark:bg-slate-800/60" : ""
                                )}
                              >
                                <span className="truncate">
                                  {renderHighlightedText(item.label, inputValue)}
                                </span>
                                {isHighlighted && (
                                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 flex items-center gap-0.5">
                                    <CornerDownLeft className="h-2.5 w-2.5" /> Select
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* Categorized suggestions */}
                      {Object.keys(groupedSuggestions).map((category) => (
                        <div key={category} className="mt-1.5 first:mt-0">
                          <div className="px-4 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/20">
                            {category}
                          </div>
                          <ul>
                            {groupedSuggestions[category].map((item) => {
                              const option = flattenedOptions.find(
                                (opt) => opt.type === "suggestion" && opt.data.id === item.id
                              );
                              const isHighlighted = highlightedIndex === option?.index;
                              return (
                                <li
                                  key={item.id}
                                  onClick={() => handleSelect(option)}
                                  onMouseEnter={() => setHighlightedIndex(option?.index || 0)}
                                  className={cn(
                                    "flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer transition-colors",
                                    isHighlighted ? "bg-slate-50 dark:bg-slate-800/60" : ""
                                  )}
                                >
                                  <span className="truncate">
                                    {renderHighlightedText(item.label, inputValue)}
                                  </span>
                                  {isHighlighted && (
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 flex items-center gap-0.5">
                                      <CornerDownLeft className="h-2.5 w-2.5" /> Select
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Info footer (only when open) */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center">
                <span>Use arrows to navigate, Esc to close</span>
                <span>Press Enter to select</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AutocompleteSearch.displayName = "AutocompleteSearch";
`;
