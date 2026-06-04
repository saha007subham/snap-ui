export const segmentedControlUsageCode = `import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

export default function SegmentedControlDemo() {
  const [value, setValue] = useState("preview");

  const viewOptions = [
    { label: "Preview", value: "preview" },
    { label: "Code", value: "code" },
    { label: "Live", value: "live" },
  ];

  const themeOptions = [
    { 
      label: "Light", 
      value: "light",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      )
    },
    { 
      label: "Dark", 
      value: "dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Default Segmented Control */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Standard Segmented Control
        </label>
        <SegmentedControl 
          options={viewOptions} 
          value={value} 
          onChange={setValue} 
        />
        <div className="text-xs text-slate-500">Active Option: {value}</div>
      </div>

      {/* Segmented Control with Icons */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          With Icons
        </label>
        <SegmentedControl 
          options={themeOptions} 
          defaultValue="dark" 
        />
      </div>

      {/* Sizing Presets */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Sizes (sm, md, lg)
        </label>
        <div className="flex flex-col gap-3 items-start">
          <SegmentedControl size="sm" options={viewOptions} defaultValue="preview" />
          <SegmentedControl size="md" options={viewOptions} defaultValue="preview" />
          <SegmentedControl size="lg" options={viewOptions} defaultValue="preview" />
        </div>
      </div>

      {/* Full Width block option */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Full Width Block
        </label>
        <SegmentedControl 
          fullWidth
          options={viewOptions} 
          defaultValue="preview" 
        />
      </div>
    </div>
  );
}
`;
