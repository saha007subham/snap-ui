export const comboBoxUsageCode = `import { useState } from "react";
import { ComboBox } from "@/components/ui/ComboBox";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function Example() {
  const [value, setValue] = useState(null);

  return (
    <div className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Framework</label>
        <ComboBox 
          options={frameworks}
          placeholder="Search framework..."
          value={value}
          onChange={(val) => setValue(val)}
        />
        <p className="text-xs text-slate-500">
          Selected: {value || "None"}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">Disabled ComboBox</label>
        <ComboBox 
          options={frameworks}
          placeholder="Disabled..."
          disabled 
        />
      </div>
    </div>
  );
}
`;
