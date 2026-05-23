import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { ColourPicker } from "@/components/ui/ColourPicker";
import { colourPickerUsageCode } from "@/components/code/colourPickerUsageCode";
import { colourPickerCodeString } from "@/components/code/colourPickerCode";

function ColourPickerUsagePreview() {
  const [color, setColor] = useState("#3b82f6");
  const [autumnColor, setAutumnColor] = useState("#d97706");

  const autumnPresets = [
    "#9a3412", // Rust
    "#c2410c", // Orange
    "#ca8a04", // Mustard
    "#d97706", // Amber
    "#b45309", // Warm brown
    "#78350f"  // Deep chestnut
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full min-h-[450px]">
      
      {/* Interactive Controls Panel */}
      <div className="flex-1 flex flex-col gap-8 max-w-sm w-full mx-auto lg:mx-0">
        
        {/* Default Colour Picker */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none block">
            Default Colour Picker
          </label>
          <ColourPicker
            value={color}
            onChange={(val) => setColor(val)}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value: <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold uppercase">{color}</span>
          </p>
        </div>

        {/* Custom Presets Swatches */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none block">
            Custom Presets (Autumn Palette)
          </label>
          <ColourPicker
            value={autumnColor}
            onChange={(val) => setAutumnColor(val)}
            presets={autumnPresets}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value: <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 font-semibold uppercase">{autumnColor}</span>
          </p>
        </div>

        {/* Disabled State Example */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-400 dark:text-slate-500 select-none block">
            Disabled Colour Picker
          </label>
          <ColourPicker
            value="#64748b"
            onChange={() => {}}
            disabled
          />
        </div>

      </div>

      {/* Aesthetic Live Sandbox Monitor */}
      <div className="flex-1 flex flex-col justify-center items-center bg-slate-900 dark:bg-black/40 border border-slate-800 rounded-lg p-6 text-slate-300 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase select-none">
          Live Sandbox State
        </h3>
        <div className="w-full font-mono text-xs space-y-2 bg-slate-950 p-4 rounded-md border border-slate-900/50 shadow-inner overflow-x-auto text-slate-300">
          <div><span className="text-blue-400">const</span> [color, setColor] = <span className="text-emerald-400">useState</span>(<span className="text-amber-500">"{color}"</span>);</div>
          <div className="mt-2"><span className="text-blue-400">const</span> [autumn, setAutumn] = <span className="text-emerald-400">useState</span>(<span className="text-amber-500">"{autumnColor}"</span>);</div>
        </div>
        <p className="text-xs text-slate-500 text-center select-none">
          Click the color bars to change selections or type custom values inside HEX inputs to observe reactive state conversions.
        </p>
      </div>

    </div>
  );
}

export function ColourPickerDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <ColourPickerUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={colourPickerUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={colourPickerCodeString} language="jsx" filename="ColourPicker.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Colour Picker Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium, high-fidelity color picker featuring curated swatches grid, custom HSL (Hue, Saturation, Lightness) range sliders, real-time validated hex entries, and custom OS fallbacks.
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
              Copy and paste the code below to implement the Colour Picker in your project workspace.
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
              Paste the component code into your local source folder to begin using it.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Guide Checklist */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Colour Picker Component — Setup Steps
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these simple configurations to connect the Colour Picker inside your React environment.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Verify Dependencies
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component uses <code>framer-motion</code> for popover scale-fade transitions and standard <code>lucide-react</code> icons.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>npm install framer-motion lucide-react</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Save the Component File
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a new React code file inside your UI folder.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/ui/ColourPicker.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Instantiate
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Render the picker and bind it to standard controlled states.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ ColourPicker }"} from "../components/ui/ColourPicker";</code>
            </pre>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Props Table */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">API Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse text-slate-600 dark:text-slate-400">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                      <th className="py-2 pr-4">Prop</th>
                      <th className="py-2 px-4">Type</th>
                      <th className="py-2 px-4">Default</th>
                      <th className="py-2 pl-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">value</td>
                      <td className="py-2.5 px-4 font-mono text-xs">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs">"#3b82f6"</td>
                      <td className="py-2.5 pl-4 text-xs">Controlled hex color string (expects format like <code>#FFFFFF</code> or <code>#FFF</code>).</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">onChange</td>
                      <td className="py-2.5 px-4 font-mono text-xs">function</td>
                      <td className="py-2.5 px-4 font-mono text-xs">undefined</td>
                      <td className="py-2.5 pl-4 text-xs">Callback executed when a swatch is clicked or a slider is adjusted, returning a hex string.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">presets</td>
                      <td className="py-2.5 px-4 font-mono text-xs">string[]</td>
                      <td className="py-2.5 px-4 font-mono text-xs">DEFAULT_PRESETS</td>
                      <td className="py-2.5 pl-4 text-xs">List of hex strings to display as clickable color presets in the presets grid tab.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">disabled</td>
                      <td className="py-2.5 px-4 font-mono text-xs">boolean</td>
                      <td className="py-2.5 px-4 font-mono text-xs">false</td>
                      <td className="py-2.5 pl-4 text-xs">Disables opening the popover and copy actions, rendering an opaque trigger.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Premium Features List */}
            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Premium Product Features</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1.5 text-sm">
                <li><strong>Interactive HSL Track Sliders</strong>: Renders HSL range sliders styled with CSS gradients that dynamically update in real-time, showing the visual color range based on current hue, saturation, or lightness.</li>
                <li><strong>Dynamic Hex Parsing & Validation</strong>: Allows manually typing color codes into the Hex code field. If a valid 3-char or 6-char hex code is input, the HSL range sliders immediately synchronize to that color.</li>
                <li><strong>Integrated Copy-to-Clipboard</strong>: Trigger button features an inline copy action, complete with checkmark animation upon successful clipboard copy.</li>
                <li><strong>Zero Large External Dependencies</strong>: Programmed with raw color conversion mathematics, bypassing bulk color manipulation libraries and preserving light builds.</li>
                <li><strong>Dark-Mode Ready Styling</strong>: Fits seamlessly within clean SaaS layouts, offering high contrast and legible typography in dark or light theme default grids.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
