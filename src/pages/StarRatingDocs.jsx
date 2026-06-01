import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { StarRating } from "@/components/ui/StarRating";
import { starRatingUsageCode } from "@/components/code/starRatingUsageCode";
import { starRatingCodeString } from "@/components/code/starRatingCode";

function StarRatingUsagePreview() {
  const [ratingVal, setRatingVal] = useState(3.5);
  const [controlledVal, setControlledVal] = useState(4.0);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-10 w-full max-w-lg">
        
        {/* 1. Default Interactive Rating */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Default Rating
          </label>
          <div className="flex flex-col gap-1">
            <StarRating defaultValue={3} />
            <span className="text-xs text-slate-400">Click to rate, click again to clear (if allowClear is enabled).</span>
          </div>
        </div>

        {/* 2. Half Stars Rating */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Half Stars Support (allowHalf)
            </label>
            <span className="text-sm font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
              {ratingVal} / 5
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <StarRating
              allowHalf
              value={ratingVal}
              onChange={setRatingVal}
              showTooltip
            />
            <span className="text-xs text-slate-400">Supports selecting 0.5 step boundaries by hovering/clicking left or right halves of a star.</span>
          </div>
        </div>

        {/* 3. Sizes */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Predefined Sizes
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <StarRating size="sm" defaultValue={4} />
                <span className="text-xs text-slate-400 font-mono">sm (20px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <StarRating size="md" defaultValue={3} />
                <span className="text-xs text-slate-400 font-mono">md (28px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <StarRating size="lg" defaultValue={4} />
                <span className="text-xs text-slate-400 font-mono">lg (36px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <StarRating size="xl" defaultValue={5} />
                <span className="text-xs text-slate-400 font-mono">xl (44px)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Colors */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Custom Colors
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mb-1">Emerald</span>
              <StarRating color="emerald" defaultValue={4.5} allowHalf />
            </div>
            <div className="flex flex-col gap-1 p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mb-1">Rose</span>
              <StarRating color="rose" defaultValue={4} />
            </div>
            <div className="flex flex-col gap-1 p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mb-1">Indigo</span>
              <StarRating color="indigo" defaultValue={3.5} allowHalf />
            </div>
            <div className="flex flex-col gap-1 p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mb-1">Yellow</span>
              <StarRating color="yellow" defaultValue={5} />
            </div>
          </div>
        </div>

        {/* 5. Controlled Example */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Controlled State with Action Button
            </label>
            <button
              onClick={() => setControlledVal(0)}
              className="text-xs font-semibold px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded transition cursor-pointer"
            >
              Reset Rating
            </button>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <StarRating
              value={controlledVal}
              onChange={setControlledVal}
              showTooltip
              tooltips={["Terrible", "Poor", "Average", "Great", "Excellent"]}
            />
            <div className="text-xs font-medium text-slate-500">
              Current: <span className="font-semibold text-slate-900 dark:text-white">{controlledVal}</span>
            </div>
          </div>
        </div>

        {/* 6. Read Only Display */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Read-Only Display (Testimonials / Reviews)
          </label>
          <div className="p-4 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">4.8</span>
              <StarRating readOnly allowHalf defaultValue={4.8} size="sm" />
              <span className="text-xs text-slate-400">(1,248 reviews)</span>
            </div>
            <p className="text-xs text-slate-500 italic">
              "The design is incredible! Transitioning from other component libraries was seamless and the performance is top notch."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export function StarRatingDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <StarRatingUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={starRatingUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={starRatingCodeString} language="jsx" filename="StarRating.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white animate-fade-in">
            Star Rating
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A highly functional rating component with full support for integer ratings, half ratings, custom colors, size variants, keyboard navigation, and micro-animations.
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
              Copy and paste the code below to use the StarRating component in your project.
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
              Copy the source code below into your components folder to install the StarRating.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Star Rating Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these simple steps to integrate this component.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a new component file `StarRating.jsx` in your project and insert the source code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>/components/ui/StarRating.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Use
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the StarRating component into your workspace.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>import {"{ StarRating }"} from "@/components/ui/StarRating";</code>
            </pre>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2 text-sm">
                <li>
                  <strong>Half Stars:</strong> Enabled using the <code>allowHalf</code> prop. Hovering or clicking over the left vs right side of each star selects decimal step ratings (0.5).
                </li>
                <li>
                  <strong>Keyboard Accessibility:</strong> Press <code>Tab</code> to focus, use <code>ArrowRight</code> or <code>ArrowUp</code> to increment rating, and <code>ArrowLeft</code> or <code>ArrowDown</code> to decrement rating. Use <code>Home</code> / <code>End</code> to jump to boundary limits, and <code>Space</code> / <code>Enter</code> to lock values.
                </li>
                <li>
                  <strong>Clearable Selection:</strong> By default, clicking the current rating resets the rating value back to 0. Disable this with <code>allowClear={"{false}"}</code>.
                </li>
                <li>
                  <strong>Micro-animations:</strong> Uses <code>Framer Motion</code> springs to execute subtle bounce animations on selecting stars.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
