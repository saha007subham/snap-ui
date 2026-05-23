import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, Palette, Sliders } from "lucide-react";
import { cn } from "@/utils/cn";

// Helper color converters
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return "#" + f(0) + f(8) + f(4);
}

function hexToHsl(hex) {
  let c = hex.replace(/^#/, "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  if (c.length !== 6) return null;

  let r = parseInt(c.substring(0, 2), 16) / 255;
  let g = parseInt(c.substring(2, 4), 16) / 255;
  let b = parseInt(c.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function isValidHex(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex) || /^#[0-9A-F]{3}$/i.test(hex);
}

const DEFAULT_PRESETS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#8b5cf6", // Violet
  "#f43f5e", // Rose
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#6366f1", // Indigo
  "#64748b", // Slate
  "#1e293b", // Slate-800
  "#000000", // Black
  "#ffffff"  // White
];

export const ColourPicker = forwardRef(
  (
    {
      value = "#3b82f6",
      onChange,
      presets = DEFAULT_PRESETS,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("presets"); // "presets" | "custom"

    // Local HSL state derived from controlled HEX value
    const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
    const [hexInput, setHexInput] = useState(value);

    const wrapperRef = useRef(null);
    const nativeInputRef = useRef(null);

    // Synchronize HSL and hex input text when controlled value shifts externally
    useEffect(() => {
      if (value && isValidHex(value)) {
        setHexInput(value);
        const parsedHsl = hexToHsl(value);
        if (parsedHsl) {
          setHsl(parsedHsl);
        }
      }
    }, [value]);

    // Click outside handler to close popover
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

    // Color update handlers
    const updateColor = (newHex) => {
      if (disabled) return;
      if (onChange) {
        onChange(newHex);
      }
    };

    const handleHslChange = (changes) => {
      const nextHsl = { ...hsl, ...changes };
      setHsl(nextHsl);
      const nextHex = hslToHex(nextHsl.h, nextHsl.s, nextHsl.l);
      setHexInput(nextHex);
      updateColor(nextHex);
    };

    const handleHexInputChange = (e) => {
      const input = e.target.value;
      setHexInput(input);

      if (isValidHex(input)) {
        updateColor(input);
        const nextHsl = hexToHsl(input);
        if (nextHsl) {
          setHsl(nextHsl);
        }
      }
    };

    const handleCopy = (e) => {
      e.stopPropagation();
      if (disabled) return;
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    const triggerNativePicker = (e) => {
      e.stopPropagation();
      if (disabled) return;
      nativeInputRef.current?.click();
    };

    return (
      <div className={cn("relative w-full", className)} ref={wrapperRef}>
        {/* Trigger Button */}
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center justify-between w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-slate-400 dark:hover:border-slate-600 select-none",
            disabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Round color block */}
            <div
              className="h-5 w-5 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner shrink-0"
              style={{ backgroundColor: value }}
            />
            <span className="font-mono text-xs truncate font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {value}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Copy Hex Code Action */}
            {!disabled && (
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Copy color hex"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            )}
            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isOpen && "transform rotate-180")} />
          </div>
        </div>

        {/* Floating Colour Picker Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden p-4 space-y-4"
            >
              {/* Active Color Preview & Slider Config */}
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-800 shadow-inner shrink-0"
                  style={{ backgroundColor: value }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <span className="text-slate-400 dark:text-slate-600 font-mono text-xs select-none">#</span>
                    <input
                      type="text"
                      value={hexInput.replace(/^#/, "")}
                      onChange={handleHexInputChange}
                      className="w-full bg-transparent p-0 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 focus:outline-none border-none"
                      placeholder="333333"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs selector */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 p-0.5 gap-1 bg-slate-50 dark:bg-slate-950 rounded-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("presets")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors select-none",
                    activeTab === "presets"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  <Palette className="h-3.5 w-3.5" />
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("custom")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors select-none",
                    activeTab === "custom"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  Sliders
                </button>
              </div>

              {/* Presets Swatches Tab */}
              {activeTab === "presets" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-2 pt-1">
                    {presets.map((presetColor) => {
                      const isSelected = value.toLowerCase() === presetColor.toLowerCase();
                      return (
                        <button
                          key={presetColor}
                          type="button"
                          onClick={() => updateColor(presetColor)}
                          className={cn(
                            "h-7 w-7 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-transform hover:scale-110 flex items-center justify-center relative shrink-0",
                            isSelected && "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-slate-900"
                          )}
                          style={{ backgroundColor: presetColor }}
                          title={presetColor}
                        >
                          {isSelected && (
                            <Check
                              className={cn(
                                "h-3.5 w-3.5 font-bold drop-shadow",
                                presetColor.toLowerCase() === "#ffffff" ? "text-slate-900" : "text-white"
                              )}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Sliders Tab */}
              {activeTab === "custom" && (
                <div className="space-y-3 pt-1">
                  {/* Hue Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span>HUE</span>
                      <span className="font-mono">{hsl.h}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={hsl.h}
                      onChange={(e) => handleHslChange({ h: parseInt(e.target.value) })}
                      className="appearance-none h-2 w-full rounded-full cursor-pointer outline-none bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>

                  {/* Saturation Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span>SATURATION</span>
                      <span className="font-mono">{hsl.s}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={hsl.s}
                      onChange={(e) => handleHslChange({ s: parseInt(e.target.value) })}
                      className="appearance-none h-2 w-full rounded-full cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow-md"
                      style={{
                        background: "linear-gradient(to right, hsl(" + hsl.h + ", 0%, " + hsl.l + "%), hsl(" + hsl.h + ", 100%, " + hsl.l + "%))"
                      }}
                    />
                  </div>

                  {/* Lightness Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span>LIGHTNESS</span>
                      <span className="font-mono">{hsl.l}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={hsl.l}
                      onChange={(e) => handleHslChange({ l: parseInt(e.target.value) })}
                      className="appearance-none h-2 w-full rounded-full cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow-md"
                      style={{
                        background: "linear-gradient(to right, #000000, hsl(" + hsl.h + ", " + hsl.s + "%, 50%), #ffffff)"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Utility / Native dialog link */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={triggerNativePicker}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors select-none cursor-pointer flex items-center gap-1"
                >
                  More colors...
                </button>
                <input
                  type="color"
                  ref={nativeInputRef}
                  value={value}
                  onChange={(e) => updateColor(e.target.value)}
                  className="sr-only"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-semibold rounded select-none cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ColourPicker.displayName = "ColourPicker";
