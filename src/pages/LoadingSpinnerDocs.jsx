import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { loadingSpinnerUsageCode } from "@/components/code/loadingSpinnerUsageCode";
import { loadingSpinnerCodeString } from "@/components/code/loadingSpinnerCode";

function LoadingSpinnerUsagePreview() {
  const [activeVariant, setActiveVariant] = useState("circle");
  const [activeSize, setActiveSize] = useState("md");
  const [activeColor, setActiveColor] = useState("primary");
  const [activeSpeed, setActiveSpeed] = useState("normal");

  const variants = ["circle", "dots", "bars", "ping", "pulse"];
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const colors = ["primary", "slate", "indigo", "emerald", "rose", "amber"];
  const speeds = ["slow", "normal", "fast"];

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-10 w-full max-w-xl">
        
        {/* 1. Dynamic Interactive Playground */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-4">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Playground</span>
            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-500">
              {activeVariant} / {activeSize} / {activeColor} / {activeSpeed}
            </span>
          </div>

          {/* Render Area */}
          <div className="flex items-center justify-center py-10 min-h-[140px]">
            <LoadingSpinner
              variant={activeVariant}
              size={activeSize}
              color={activeColor}
              speed={activeSpeed}
              label={activeSize === "lg" || activeSize === "xl" ? "Loading contents..." : undefined}
            />
          </div>

          {/* Controllers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-900">
            {/* Variant Selector */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400">Variant</span>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer transition font-medium ${
                      activeVariant === v
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Selector */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400">Size</span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(s)}
                    className={`text-xs px-2.5 py-1 rounded cursor-pointer transition font-medium ${
                      activeSize === s
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Selector */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400">Color</span>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className={`text-xs px-2 py-1 rounded cursor-pointer transition font-medium ${
                      activeColor === c
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Selector */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400">Speed</span>
              <div className="flex flex-wrap gap-1.5">
                {speeds.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setActiveSpeed(sp)}
                    className={`text-xs px-2.5 py-1 rounded cursor-pointer transition font-medium ${
                      activeSpeed === sp
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Embedded inside Buttons */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Inline Button Integration
          </label>
          <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
            <Button disabled className="flex items-center gap-2">
              <LoadingSpinner size="sm" color="white" />
              Saving Settings...
            </Button>
            
            <Button variant="secondary" disabled className="flex items-center gap-2">
              <LoadingSpinner size="sm" color="primary" />
              Processing Request...
            </Button>
          </div>
        </div>

        {/* 3. Text Label Position Layouts */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Label Layout Positions
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[100px]">
              <LoadingSpinner
                variant="circle"
                size="sm"
                label="Loading items below"
                labelPosition="bottom"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[100px]">
              <LoadingSpinner
                variant="circle"
                size="sm"
                label="Processing horizontally..."
                labelPosition="right"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function LoadingSpinnerDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <LoadingSpinnerUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={loadingSpinnerUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={loadingSpinnerCodeString} language="jsx" filename="LoadingSpinner.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Loading Spinner
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A beautiful set of animated layout status structures indicating pending transitions or background async updates.
          </p>
          <div className="inline-flex gap-3">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires React and Tailwind CSS
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
              Copy and paste the code below to use the LoadingSpinner component in your project.
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
              Copy the source code below into your components folder to install the LoadingSpinner.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Loading Spinner Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these simple steps to integrate this component in your project.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a new component file `LoadingSpinner.jsx` in your project and insert the source code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>/components/ui/LoadingSpinner.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Use
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the LoadingSpinner component in your workspace file.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>import {"{ LoadingSpinner }"} from "@/components/ui/LoadingSpinner";</code>
            </pre>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2 text-sm">
                <li>
                  <strong>Multiple styles:</strong> Support five specific variants: <code>circle</code> (rotating ring), <code>dots</code> (bouncing triple dot capsule), <code>bars</code> (pulsing waveform bars), <code>ping</code> (concentric pulsing circles), and <code>pulse</code> (breathing opacity pulse).
                </li>
                <li>
                  <strong>Sizing & Color grids:</strong> Integrates sizes from <code>xs</code> (14px) up to <code>xl</code> (64px). Built-in theme mappings match standard design palette structures.
                </li>
                <li>
                  <strong>Accessibility mapping:</strong> Employs <code>role="status"</code> and <code>aria-live="polite"</code> internally to report changes to screen-readers, including default fallback <code>sr-only</code> texts.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
