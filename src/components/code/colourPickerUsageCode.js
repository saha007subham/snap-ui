export const colourPickerUsageCode = `import { useState } from "react";
import { ColourPicker } from "./components/ui/ColourPicker";

export default function ColourPickerDemo() {
  const [color, setColor] = useState("#3b82f6");
  const [autumnColor, setAutumnColor] = useState("#d97706");

  // Custom autumn-themed preset color swatches
  const customPresets = [
    "#9a3412", // Rust
    "#c2410c", // Orange
    "#ca8a04", // Mustard
    "#d97706", // Amber
    "#b45309", // Warm brown
    "#78350f"  // Deep chestnut
  ];

  return (
    <div className="space-y-8 w-full max-w-sm">
      {/* Default Colour Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Theme Colour
        </label>
        <ColourPicker
          value={color}
          onChange={(val) => setColor(val)}
        />
      </div>

      {/* Colour Picker with Custom Presets Swatches */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Autumn Palette Picker
        </label>
        <ColourPicker
          value={autumnColor}
          onChange={(val) => setAutumnColor(val)}
          presets={customPresets}
        />
      </div>
    </div>
  );
}
`;
