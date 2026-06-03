import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { Accordion } from "@/components/ui/Accordion";
import { accordionUsageCode } from "@/components/code/accordionUsageCode";
import { accordionCodeString } from "@/components/code/accordionCode";

function AccordionUsagePreview() {
  const [selectedValue, setSelectedValue] = useState("item-1");

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-10 w-full max-w-lg">
        
        {/* 1. Default (Single open, collapsible) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Single Accordion (Default FAQ Style)
            </label>
            {selectedValue && (
              <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                Active: {selectedValue}
              </span>
            )}
          </div>
          <Accordion
            type="single"
            collapsible
            value={selectedValue}
            onValueChange={setSelectedValue}
            className="w-full"
          >
            <Accordion.Item value="item-1">
              <Accordion.Trigger>What is a Design System?</Accordion.Trigger>
              <Accordion.Content>
                A design system is a comprehensive guide containing component patterns, style guidelines, and design tokens to help build cohesive software interfaces.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>Why is consistency important?</Accordion.Trigger>
              <Accordion.Content>
                Consistency ensures users don't have to relearn interfaces, reducing cognitive load and accelerating workflows across different sections of a product.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
              <Accordion.Trigger>How do I configure animations?</Accordion.Trigger>
              <Accordion.Content>
                Animations are powered by Framer Motion. You can customize the transitions directly in the Accordion.Content component.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* 2. Multiple Open */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Multiple Items Open (type="multiple")
          </label>
          <Accordion type="multiple" defaultValue={["item-a"]} className="w-full">
            <Accordion.Item value="item-a">
              <Accordion.Trigger>Section A: Overview</Accordion.Trigger>
              <Accordion.Content>
                This section can remain open alongside other sections. Useful for multi-step configuration panels or settings.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-b">
              <Accordion.Trigger>Section B: Details</Accordion.Trigger>
              <Accordion.Content>
                Opening this section will not close Section A. Users can inspect multiple details simultaneously.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* 3. Visual Styling Variants (Card Style & Soft Block Style) */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Bordered Card Style (Customized Layout)
          </label>
          <Accordion type="single" collapsible className="space-y-3 divide-y-0">
            <Accordion.Item
              value="card-1"
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl px-4 overflow-hidden"
            >
              <Accordion.Trigger className="hover:no-underline font-bold text-slate-800 dark:text-slate-200 py-3">
                First Card Panel
              </Accordion.Trigger>
              <Accordion.Content className="pb-3 text-slate-500 dark:text-slate-400">
                Customized by wrapping each Accordion.Item with independent border, rounding, and background classes to render distinct block cards instead of standard list lines.
              </Accordion.Content>
            </Accordion.Item>
            
            <Accordion.Item
              value="card-2"
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl px-4 overflow-hidden"
            >
              <Accordion.Trigger className="hover:no-underline font-bold text-slate-800 dark:text-slate-200 py-3">
                Second Card Panel
              </Accordion.Trigger>
              <Accordion.Content className="pb-3 text-slate-500 dark:text-slate-400">
                You can easily add shadow, hover states, or hover ring borders to design items that match your dashboard structure.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* 4. Disabled Items */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Disabled Section
          </label>
          <Accordion type="single" collapsible className="w-full">
            <Accordion.Item value="normal">
              <Accordion.Trigger>Active Trigger</Accordion.Trigger>
              <Accordion.Content>
                This trigger can be focused, hovered, and activated normally.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="disabled-item" disabled>
              <Accordion.Trigger>Disabled Trigger (Locked)</Accordion.Trigger>
              <Accordion.Content>
                This content will not be visible since the trigger is completely disabled.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

      </div>
    </div>
  );
}

export function AccordionDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <AccordionUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={accordionUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={accordionCodeString} language="jsx" filename="Accordion.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Accordion Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A vertically stacked set of interactive headings that each reveal a section of content. Adheres fully to the WAI-ARIA compound architecture.
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
              Copy and paste the code below to use the Accordion component in your project.
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
              Copy the source code below into your components folder to install the Accordion.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Accordion Component — Usage Guide
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
              Create a new component file `Accordion.jsx` in your project and insert the source code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>/components/ui/Accordion.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Compose
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the Accordion compound namespace into your workspace.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>import {"{ Accordion }"} from "@/components/ui/Accordion";</code>
            </pre>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2 text-sm">
                <li>
                  <strong>State Management:</strong> Can be used both as a controlled component (passing <code>value</code> and <code>onValueChange</code>) or uncontrolled (passing <code>defaultValue</code>).
                </li>
                <li>
                  <strong>Multiple items:</strong> Set <code>type="multiple"</code> to allow multiple sections to be open at the same time. In multiple mode, the active value will be an array of strings.
                </li>
                <li>
                  <strong>Keyboard Accessibility:</strong> Uses standard button tags for triggers so focus management is handled natively by the browser. Pressing <code>ArrowDown</code> and <code>ArrowUp</code> cycles focus within the Accordion container, and <code>Home</code> / <code>End</code> jumps to boundaries.
                </li>
                <li>
                  <strong>Aria Guidelines:</strong> Automatically binds triggers to panels using <code>aria-controls</code> and <code>aria-labelledby</code> via dynamic React <code>useId</code> hashes.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
