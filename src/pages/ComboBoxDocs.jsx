import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { ComboBox } from "@/components/ui/ComboBox";
import { comboBoxUsageCode } from "@/components/code/comboBoxUsageCode";
import { comboBoxCodeString } from "@/components/code/comboBoxCode";

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

function ComboBoxUsagePreview() {
  const [value, setValue] = useState(null);
  
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full min-h-[400px]">
      <div className="flex flex-col gap-8 w-full max-w-sm">
        
        {/* Default ComboBox */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-900 dark:text-white select-none">
              Select Framework
            </label>
          </div>
          <ComboBox
            options={frameworks}
            placeholder="Search framework..."
            value={value}
            onChange={(val) => setValue(val)}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value: <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded">{value || "null"}</span>
          </p>
        </div>

        {/* Disabled ComboBox */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-500 select-none">
              Disabled ComboBox
            </label>
          </div>
          <ComboBox 
            options={frameworks}
            placeholder="Disabled..."
            disabled 
          />
        </div>

      </div>
    </div>
  );
}

export function ComboBoxDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <ComboBoxUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={comboBoxUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={comboBoxCodeString} language="jsx" filename="ComboBox.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ComboBox Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A combination of a text input and a listbox, allowing users to filter and select options from a list.
          </p>
          <div className="inline-flex gap-3">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires React, Tailwind CSS, and Lucide React
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
              Copy and paste the code below to use the ComboBox component in your project.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Installation/Source Code Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy the source code below into your components folder to install the ComboBox.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the ComboBox component */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              ComboBox Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these steps to use the ComboBox component in your project.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Install Dependencies
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component requires <code>lucide-react</code> for icons.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>npm install lucide-react</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a file in your project and paste the ComboBox component code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/ComboBox.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Use the Component
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the ComboBox component into your file and use it.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ ComboBox }"} from "../components/ComboBox";</code>
            </pre>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Props</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li><code>options</code>: An array of objects with <code>label</code> and <code>value</code> properties.</li>
                <li><code>value</code>: The currently selected value (controlled).</li>
                <li><code>onChange</code>: Callback fired when an option is selected.</li>
                <li><code>placeholder</code>: Placeholder text for the input.</li>
                <li><code>disabled</code>: Disables the combobox.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Features</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li><strong>Filtering</strong>: Type into the input to filter options.</li>
                <li><strong>Keyboard Navigation</strong>: Use Arrow Up/Down to navigate options, Enter to select, and Escape to close.</li>
                <li><strong>Click Outside</strong>: Clicking outside the combobox closes the dropdown.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
