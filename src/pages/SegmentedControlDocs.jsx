import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { segmentedControlUsageCode } from "@/components/code/segmentedControlUsageCode";
import { segmentedControlCodeString } from "@/components/code/segmentedControlCode";

function SegmentedControlUsagePreview() {
  const [activeTab, setActiveTab] = useState("preview");
  const [themeMode, setThemeMode] = useState("dark");
  const [sizeVal, setSizeVal] = useState("md");

  const viewOptions = [
    { label: "Preview", value: "preview" },
    { label: "Source Code", value: "code" },
    { label: "Live Output", value: "live" },
  ];

  const themeOptions = [
    {
      label: "Light Mode",
      value: "light",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      )
    },
    {
      label: "Dark Mode",
      value: "dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )
    },
  ];

  const optionsWithDisabled = [
    { label: "Active 1", value: "act1" },
    { label: "Disabled Tag", value: "disabled-tag", disabled: true },
    { label: "Active 2", value: "act2" },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-10 w-full max-w-lg">
        
        {/* 1. Default Segmented Control */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Standard Segmented Control
          </label>
          <div className="flex flex-col gap-2 items-start">
            <SegmentedControl
              options={viewOptions}
              value={activeTab}
              onChange={setActiveTab}
            />
            <span className="text-xs text-slate-400">
              Active Value: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeTab}</span>
            </span>
          </div>
        </div>

        {/* 2. With Icons */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            With Icons
          </label>
          <div className="flex flex-col gap-2 items-start">
            <SegmentedControl
              options={themeOptions}
              value={themeMode}
              onChange={setThemeMode}
            />
            <span className="text-xs text-slate-400">
              Active Mode: <span className="font-semibold text-slate-700 dark:text-slate-200">{themeMode}</span>
            </span>
          </div>
        </div>

        {/* 3. Sizes */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Sizes (sm, md, lg)
          </label>
          <div className="flex flex-col gap-4 items-start">
            <SegmentedControl
              size="sm"
              options={viewOptions}
              value={sizeVal}
              onChange={setSizeVal}
            />
            <SegmentedControl
              size="md"
              options={viewOptions}
              value={sizeVal}
              onChange={setSizeVal}
            />
            <SegmentedControl
              size="lg"
              options={viewOptions}
              value={sizeVal}
              onChange={setSizeVal}
            />
          </div>
        </div>

        {/* 4. Full Width Layout */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Full Width block layout
          </label>
          <div className="w-full">
            <SegmentedControl
              fullWidth
              options={viewOptions}
              defaultValue="preview"
            />
          </div>
        </div>

        {/* 5. Disabled Options */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Disabled States
          </label>
          <div className="flex flex-col gap-4 items-start w-full">
            {/* Partially Disabled */}
            <div className="space-y-1 w-full">
              <span className="text-xs text-slate-400">Individual Option Disabled</span>
              <SegmentedControl
                fullWidth
                options={optionsWithDisabled}
                defaultValue="act1"
              />
            </div>
            {/* Entirely Disabled */}
            <div className="space-y-1 w-full">
              <span className="text-xs text-slate-400">Entire Control Disabled</span>
              <SegmentedControl
                fullWidth
                disabled
                options={viewOptions}
                defaultValue="preview"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function SegmentedControlDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <SegmentedControlUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={segmentedControlUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={segmentedControlCodeString} language="jsx" filename="SegmentedControl.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Segmented Control
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium toggle controller representing a set of mutually exclusive options. Features a spring layout animation that glides smoothly behind active tabs.
          </p>
          <div className="inline-flex gap-3">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires React, Tailwind CSS, and Framer Motion
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
              Copy and paste the code below to use the SegmentedControl component in your project.
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
              Copy the source code below into your components folder to install the SegmentedControl.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Segmented Control Component — Usage Guide
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
              Create a new component file `SegmentedControl.jsx` in your project and insert the source code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>/components/ui/SegmentedControl.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Use
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the SegmentedControl component in your workspace file.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>import {"{ SegmentedControl }"} from "@/components/ui/SegmentedControl";</code>
            </pre>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2 text-sm">
                <li>
                  <strong>Smooth Transitions:</strong> Uses <code>layoutId</code> from Framer Motion so the active selection capsule moves dynamically between segments without custom width or left offset code.
                </li>
                <li>
                  <strong>Keyboard Accessibility:</strong> Set up using roving focus. Users can press <code>Tab</code> to enter the component, then navigate with <code>ArrowLeft</code> / <code>ArrowRight</code> or <code>ArrowUp</code> / <code>ArrowDown</code> arrow keys to select adjacent options automatically.
                </li>
                <li>
                  <strong>Sizing & layout presets:</strong> Includes small, medium, and large sizing modes. Passing <code>fullWidth</code> stretches the control as a block to fill the container layout.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
