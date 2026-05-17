export const sliderUsageCode = `import { useState } from "react";
import { Slider } from "@/components/ui/Slider";

export default function Example() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">Volume ({value}%)</label>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">Disabled Slider</label>
        <Slider defaultValue={30} disabled />
      </div>
    </div>
  );
}
`;
