import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  X,
  FileText,
  Component,
  Code,
  Wrench,
  Compass,
  History,
  CornerDownLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { docsRegistry } from "@/data/docsRegistry";

// Category display order priority
const CATEGORY_ORDER = ["Getting Started", "Guides", "Components", "Hooks", "Utilities", "Examples"];

// Map categories to specific icons
const categoryIconMap = {
  "Getting Started": FileText,
  "Guides": FileText,
  "Components": Component,
  "Hooks": Code,
  "Utilities": Wrench,
  "Examples": Compass,
  "Recent Searches": History,
  "Popular Pages": Sparkles
};

// Popular Quick Links when search is empty
const quickLinks = [
  {
    id: "overview",
    title: "Overview",
    description: "Welcome to Snap UI and its copy-paste design system model.",
    category: "Popular Pages",
    path: "/components/overview"
  },
  {
    id: "button",
    title: "Button Component",
    description: "Interactive button element supporting multiple variants and sizes.",
    category: "Popular Pages",
    path: "/components/button"
  },
  {
    id: "datepicker",
    title: "Date Picker Component",
    description: "Fully accessible calendar date selection interface.",
    category: "Popular Pages",
    path: "/components/datepicker"
  },
  {
    id: "use-theme-hook",
    title: "useTheme Hook",
    description: "React hook to fetch and update the active theme state.",
    category: "Popular Pages",
    path: "/components/overview"
  }
];

// Sub-component to render text with highlighting
const HighlightText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) return <span>{text}</span>;

  // Escape special regex characters in the query
  const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").trim();
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

// Sub-component for individual search result items to handle self-scrolling when selected
const SearchItem = React.forwardRef(({ item, isActive, onClick, onRemove, highlight }, ref) => {
  const itemRef = useRef(null);

  // Sync forward ref and local ref
  React.useImperativeHandle(ref, () => itemRef.current);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest"
      });
    }
  }, [isActive]);

  const Icon = categoryIconMap[item.category] || FileText;

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
        isActive
          ? "bg-blue-600 text-white dark:bg-blue-600/90"
          : "bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-300"
      }`}
    >
      <div className="flex items-center min-w-0 gap-3">
        {/* Left Icon */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-slate-200/50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          }`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        {/* Middle Info */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold leading-none truncate mb-1">
            <HighlightText text={item.title} highlight={highlight} />
          </span>
          <span
            className={`text-xs leading-normal truncate ${
              isActive ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <HighlightText text={item.description} highlight={highlight} />
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {item.isRecent && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e, item.id);
            }}
            className={`p-1 rounded-md transition-all hover:bg-red-500/20 ${
              isActive
                ? "text-blue-200 hover:text-white"
                : "text-slate-400 hover:text-red-500 dark:text-slate-500"
            } cursor-pointer`}
            title="Remove search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {isActive ? (
          <CornerDownLeft className="h-3.5 w-3.5 opacity-80" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
        )}
      </div>
    </div>
  );
});

SearchItem.displayName = "SearchItem";

export function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("snapui-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse recent searches", err);
      }
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setActiveIndex(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Calculate filtered results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const cleanQuery = query.toLowerCase().trim();
    const matches = [];

    docsRegistry.forEach((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      const category = item.category.toLowerCase();
      const keywords = item.keywords.map((k) => k.toLowerCase());

      // 1. Exact match on title
      if (title === cleanQuery) {
        score += 100;
      }
      // 2. Prefix match on title
      else if (title.startsWith(cleanQuery)) {
        score += 50;
      }
      // 3. Substring match on title
      else if (title.includes(cleanQuery)) {
        score += 25;
      }

      // 4. Exact keyword match
      if (keywords.includes(cleanQuery)) {
        score += 30;
      }
      // 5. Keyword substring match
      else if (keywords.some((k) => k.includes(cleanQuery))) {
        score += 15;
      }

      // 6. Substring match in description
      if (desc.includes(cleanQuery)) {
        score += 10;
      }

      // 7. Substring match in category name
      if (category.includes(cleanQuery)) {
        score += 5;
      }

      if (score > 0) {
        matches.push({ ...item, score });
      }
    });

    // Sort by: Category (priority order), then Score (descending), then Alphabetical
    return matches.sort((a, b) => {
      const idxA = CATEGORY_ORDER.indexOf(a.category);
      const idxB = CATEGORY_ORDER.indexOf(b.category);
      if (idxA !== idxB) return idxA - idxB;
      return b.score - a.score || a.title.localeCompare(b.title);
    });
  }, [query]);

  // Generate the currently displayed active list based on whether there's a search query
  const activeList = useMemo(() => {
    if (query.trim()) {
      return filteredResults;
    }

    const recents = recentSearches.map((item) => ({
      ...item,
      isRecent: true,
      category: "Recent Searches"
    }));

    const quicks = quickLinks.map((item) => ({
      ...item,
      isQuickLink: true,
      category: "Popular Pages"
    }));

    return [...recents, ...quicks];
  }, [query, filteredResults, recentSearches]);

  // Clamp activeIndex when activeList changes
  useEffect(() => {
    setActiveIndex((prev) => {
      if (activeList.length === 0) return 0;
      return Math.min(prev, activeList.length - 1);
    });
  }, [activeList]);

  // Handle addition of a search result to the recent searches list
  const addRecentSearch = (item) => {
    // Strip temporary category/recent properties
    const cleanItem = {
      id: item.id,
      title: item.title,
      description: item.description,
      // Map back to original category
      category: item.isQuickLink || item.isRecent ? docsRegistry.find(x => x.id === item.id)?.category || "Components" : item.category,
      path: item.path
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter((x) => x.id !== item.id);
      const updated = [cleanItem, ...filtered].slice(0, 5);
      localStorage.setItem("snapui-recent-searches", JSON.stringify(updated));
      return updated;
    });
  };

  // Remove a recent search
  const handleRemoveRecent = (e, id) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((x) => x.id !== id);
      localStorage.setItem("snapui-recent-searches", JSON.stringify(updated));
      return updated;
    });
  };

  // Clear all recent searches
  const handleClearAllRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem("snapui-recent-searches");
  };

  // Navigate to target path and save to recent searches
  const handleSelectItem = (item) => {
    addRecentSearch(item);
    navigate(item.path);
    onClose();
  };

  // Key handlers for command palette
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % activeList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeList.length > 0) {
        handleSelectItem(activeList[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  // Track categories to render category section titles in the results list
  let lastCategory = null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Main command palette dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl z-10 flex flex-col"
      >
        {/* Decorative inner glows */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Input Bar */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-4 relative z-10">
          <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation (components, hooks, guides...)"
            className="flex-1 ml-3 bg-transparent text-slate-950 dark:text-slate-50 border-none outline-none text-base placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0 focus:outline-none"
          />
          
          <div className="flex items-center gap-2 ml-2 shrink-0">
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-400 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results Container */}
        <div className="relative z-10 max-h-[400px] overflow-y-auto custom-scrollbar p-3 space-y-1">
          {activeList.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                No results for "{query}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Try searching for keywords like "button", "picker", "theme", or check your spelling.
              </p>
            </div>
          ) : (
            activeList.map((item, index) => {
              const showHeader = item.category !== lastCategory;
              lastCategory = item.category;

              return (
                <div key={`${item.category}-${item.id}`} className="space-y-1">
                  {showHeader && (
                    <div className="flex items-center justify-between px-3 pt-3 pb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                      <span>{item.category}</span>
                      {item.isRecent && (
                        <button
                          onClick={handleClearAllRecents}
                          className="hover:text-red-500 hover:underline cursor-pointer lowercase normal-case"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  )}

                  <SearchItem
                    item={item}
                    isActive={index === activeIndex}
                    onClick={() => handleSelectItem(item)}
                    onRemove={handleRemoveRecent}
                    highlight={query}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info/controls bar */}
        <div className="relative z-10 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-3 text-[11px] text-slate-500 dark:text-slate-500 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-white px-1.5 py-0.5 border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 font-mono text-[9px]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-white px-1.5 py-0.5 border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 font-mono text-[9px]">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-white px-1.5 py-0.5 border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 font-mono text-[9px]">ESC</kbd> Close
            </span>
          </div>
          <div>
            SnapUI Search v1.0
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
