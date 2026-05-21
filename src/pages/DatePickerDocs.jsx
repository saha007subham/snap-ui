import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { DatePicker } from "@/components/ui/DatePicker";
import { datePickerUsageCode } from "@/components/code/datePickerUsageCode";
import { datePickerCodeString } from "@/components/code/datePickerCode";

function DatePickerUsagePreview() {
  const [singleDate, setSingleDate] = useState(null);
  const [rangeDate, setRangeDate] = useState({ from: null, to: null });
  const [constrainedDate, setConstrainedDate] = useState(null);

  // Setup min and max dates for the constrained picker example
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() - 7); // Min is 7 days ago
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // Max is 7 days from now

  const formatDateValue = (val) => {
    if (!val) return "null";
    if (val instanceof Date) {
      return `Date(${val.toLocaleDateString()})`;
    }
    return `{ from: ${val.from ? `Date(${val.from.toLocaleDateString()})` : "null"}, to: ${val.to ? `Date(${val.to.toLocaleDateString()})` : "null"} }`;
  };

  return (
    <div
      className="
    flex flex-col lg:flex-row
    justify-center items-center
    gap-8
    bg-slate-50 dark:bg-slate-900/50
    p-6 sm:p-12
    rounded-xl
    border border-slate-200 dark:border-slate-800
    shadow-inner
    w-full min-h-[500px]
  "
    >
      {/* Interactive Controls Panel */}
      <div className="flex-1 flex flex-col gap-8 max-w-md w-full mx-auto lg:mx-0">
        {/* Single Date Picker */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none block">
            Single Date Picker
          </label>
          <DatePicker
            mode="single"
            value={singleDate}
            onChange={(val) => setSingleDate(val)}
            placeholder="Select your birthday..."
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value:{" "}
            <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
              {formatDateValue(singleDate)}
            </span>
          </p>
        </div>

        {/* Date Range Picker with Presets */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none block">
            Date Range Picker (with Presets)
          </label>
          <DatePicker
            mode="range"
            value={rangeDate}
            onChange={(val) => setRangeDate(val)}
            placeholder="Select travel dates..."
            showPresets
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value:{" "}
            <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 block sm:inline-block mt-1 sm:mt-0 truncate max-w-full">
              {formatDateValue(rangeDate)}
            </span>
          </p>
        </div>

        {/* Constrained Date Picker */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none block">
            Constrained Date Picker (-7 to +7 days)
          </label>
          <DatePicker
            mode="single"
            value={constrainedDate}
            onChange={(val) => setConstrainedDate(val)}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Choose day in window..."
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value:{" "}
            <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
              {formatDateValue(constrainedDate)}
            </span>
          </p>
        </div>

        {/* Disabled State Example */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-400 dark:text-slate-500 select-none block">
            Disabled Date Picker
          </label>
          <DatePicker
            mode="single"
            value={null}
            onChange={() => {}}
            disabled
            placeholder="Unavailable..."
          />
        </div>
      </div>

      {/* Aesthetic Live Sandbox Monitor */}
      {/* <div className="flex-1 flex flex-col justify-center items-center bg-slate-900 dark:bg-black/40 border border-slate-800 rounded-lg p-6 text-slate-300 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase select-none">
          Live Sandbox State
        </h3>
        <div className="w-full font-mono text-xs space-y-2 bg-slate-950 p-4 rounded-md border border-slate-900/50 shadow-inner overflow-x-auto text-slate-300">
          <div><span className="text-blue-400">const</span> [singleDate, setSingleDate] = <span className="text-emerald-400">useState</span>(<span className="text-amber-500">{singleDate ? `"${singleDate.toDateString()}"` : "null"}</span>);</div>
          <div className="mt-2"><span className="text-blue-400">const</span> [range, setRange] = <span className="text-emerald-400">useState</span>({`{`}</div>
          <div className="pl-4">from: <span className="text-amber-500">{rangeDate?.from ? `"${rangeDate.from.toDateString()}"` : "null"}</span>,</div>
          <div className="pl-4">to: <span className="text-amber-500">{rangeDate?.to ? `"${rangeDate.to.toDateString()}"` : "null"}</span></div>
          <div>{`});`}</div>
          <div className="mt-2"><span className="text-blue-400">const</span> [constrained, setConstrained] = <span className="text-emerald-400">useState</span>(<span className="text-amber-500">{constrainedDate ? `"${constrainedDate.toDateString()}"` : "null"}</span>);</div>
        </div>
        <p className="text-xs text-slate-500 text-center select-none">
          Interact with the components on the left to see live state changes update above.
        </p>
      </div> */}
    </div>
  );
}

export function DatePickerDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <DatePickerUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock
          code={datePickerUsageCode}
          language="jsx"
          filename="Example.jsx"
        />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock
          code={datePickerCodeString}
          language="jsx"
          filename="DatePicker.jsx"
        />
      ),
    },
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Date Picker Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium, customizable date selection control supporting calendar
            month grid, interactive single & range selection, fast month/year
            offsets, and animated transitions.
          </p>
          <div className="inline-flex gap-3">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires React, Tailwind CSS, Framer Motion, and Lucide React
            </span>
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Usage
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy and paste the code below to use the Date Picker in your
              application.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Installation Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy the source code below into your components folder.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Date Picker Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Steps to set up the Date Picker in your React and Tailwind
              workspace.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Install Dependencies
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component utilizes <code>framer-motion</code> for popover
              animations and <code>lucide-react</code> for intuitive icons.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>npm install framer-motion lucide-react</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a new file in your project and copy-paste the complete
              source code above.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/ui/DatePicker.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Render
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the component and pass the appropriate state binders.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>
                import {"{ DatePicker }"} from "../components/ui/DatePicker";
              </code>
            </pre>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Props Table */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Properties API
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse text-slate-600 dark:text-slate-400">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                      <th className="py-2 pr-4">Prop Name</th>
                      <th className="py-2 px-4">Type</th>
                      <th className="py-2 px-4">Default</th>
                      <th className="py-2 pl-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        mode
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        "single" | "range"
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        "single"
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Determines whether to pick a single date or a range of
                        dates.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        value
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        Date | Range | null
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        undefined
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Controlled selected date. Single expects{" "}
                        <code>Date</code>, range expects{" "}
                        <code>{`{ from: Date, to: Date }`}</code>.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        onChange
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        function
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        undefined
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Callback executed when a date or range is selected.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        placeholder
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        "Select date..."
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Text string displayed inside the input when value is
                        empty.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        disabled
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">boolean</td>
                      <td className="py-2.5 px-4 font-mono text-xs">false</td>
                      <td className="py-2.5 pl-4 text-xs">
                        Disables opening the datepicker and picking dates.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        minDate
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">Date</td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        undefined
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Earliest pickable date. Any earlier days are visually
                        styled and disabled from clicks.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        maxDate
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">Date</td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        undefined
                      </td>
                      <td className="py-2.5 pl-4 text-xs">
                        Latest pickable date. Any later days are visually styled
                        and disabled from clicks.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        showPresets
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs">boolean</td>
                      <td className="py-2.5 px-4 font-mono text-xs">false</td>
                      <td className="py-2.5 pl-4 text-xs">
                        In range mode, adds a quick-selection presets panel
                        (Today, Yesterday, Last 7 Days, etc.).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Premium Features
              </h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1.5 text-sm">
                <li>
                  <strong>Range Selecting Hover Highlights</strong>: When
                  picking a range, hovering days dynamically updates visual
                  highlighting, allowing immediate spatial understanding before
                  selecting the end date.
                </li>
                <li>
                  <strong>Fast month & year selectors</strong>: Click the Month
                  or Year in the header view to flip into high-speed grid
                  selectors to jump multiple months/years in two taps instead of
                  hitting chevron buttons repeatedly.
                </li>
                <li>
                  <strong>Automatic Click-Away Closure</strong>: Listens to
                  outside mouse clicks to shut the date picker menu natively and
                  immediately, preserving user flow.
                </li>
                <li>
                  <strong>Zero Large External Dependencies</strong>: Pure
                  Vanilla JS date logic prevents bloat, avoiding extra libraries
                  like Moment.js or date-fns.
                </li>
                <li>
                  <strong>Tailwind & Dark Mode Ready</strong>: Perfectly
                  responsive design using subtle transitions and dynamic dark
                  mode color overrides.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
