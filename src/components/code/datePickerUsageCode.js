export const datePickerUsageCode = `import { useState } from "react";
import { DatePicker } from "./components/ui/DatePicker";

export default function DatePickerDemo() {
  const [date, setDate] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });

  return (
    <div className="space-y-8 w-full max-w-sm">
      {/* Single Date Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Pick a Date
        </label>
        <DatePicker
          mode="single"
          value={date}
          onChange={(val) => setDate(val)}
          placeholder="Select a date"
        />
      </div>

      {/* Date Range Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Pick a Date Range
        </label>
        <DatePicker
          mode="range"
          value={range}
          onChange={(val) => setRange(val)}
          placeholder="Select range"
          showPresets
        />
      </div>
    </div>
  );
}
`;
