import { useState, useEffect } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { SearchModal } from "@/components/core-components/SearchModal";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // Detect OS for shortcut hint
    const isMacPlatform = typeof navigator !== "undefined" && 
      (/Mac|iPod|iPhone|iPad/.test(navigator.platform) || 
       (navigator.userAgentData && navigator.userAgentData.platform === "macOS") ||
       /Mac/.test(navigator.userAgent));
    setIsMac(isMacPlatform);

    // Global keyboard listener for search shortcut
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-lg transition-colors">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            SnapUI
          </Link>
        </div>

        {/* Middle Section: Search Trigger */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-8">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full max-w-md items-center justify-between rounded-full border border-slate-300 dark:border-slate-800 bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900 dark:hover:bg-slate-900/80 py-2 pl-4 pr-3 text-sm text-slate-400 dark:text-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-400 dark:hover:border-slate-700 cursor-pointer group"
            aria-label="Open search dialog"
          >
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors shrink-0" />
              <span className="text-left font-medium select-none truncate">Search documentation...</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200/50 border border-slate-300/30 text-slate-500 dark:bg-slate-800 dark:border-slate-700/50 dark:text-slate-400 text-[10px] font-semibold tracking-tight shadow-sm shrink-0">
              <span>{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative inline-flex items-center group">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 cursor-pointer"
              aria-label="Toggle dark mode"
              aria-describedby="theme-tooltip"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="pointer-events-none absolute right-[-60px] top-full mt-3 z-10 w-[240px] max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-left text-sm text-slate-900 shadow-xl shadow-slate-900/5 backdrop-blur-xl opacity-0 scale-95 transition-all duration-200 ease-out dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-100 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {theme === "dark"
                  ? "Switch to light theme, Your choice is saved on this device."
                  : "Switch to dark theme, Your choice is saved on this device."}
              </p>
            </div>
          </div>

          <a
            href="https://github.com/saha007subham/snap-ui"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            aria-label="GitHub repository"
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>

      {/* Global Search command palette */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
