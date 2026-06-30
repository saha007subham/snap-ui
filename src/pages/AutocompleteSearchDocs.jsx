import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { AutocompleteSearch } from "@/components/ui/AutocompleteSearch";
import { autocompleteSearchUsageCode } from "@/components/code/autocompleteSearchUsageCode";
import { autocompleteSearchCodeString } from "@/components/code/autocompleteSearchCode";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "China",
  "Brazil",
];

const docItems = [
  { id: 1, label: "React components integration", category: "Documentation" },
  { id: 2, label: "Tailwind CSS responsive design", category: "Documentation" },
  { id: 3, label: "Framer Motion transitions guide", category: "Documentation" },
  { id: 4, label: "Vite dev server speed configuration", category: "Tools" },
  { id: 5, label: "ESLint syntax checking rules", category: "Tools" },
  { id: 6, label: "npm package lock resolution", category: "Tools" },
  { id: 7, label: "Redux Toolkit state management", category: "Libraries" },
  { id: 8, label: "Zustand micro state manager", category: "Libraries" },
];

function AutocompleteSearchUsagePreview() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncSearch = (val) => {
    setVal3(val);
    if (!val) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 850);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full min-h-[500px]">
      <div className="flex flex-col gap-10 w-full max-w-md">
        
        {/* 1. Basic Autocomplete */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label htmlFor="basic-search" className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Basic Autocomplete (Countries)
            </label>
            <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">Flat list</span>
          </div>
          <AutocompleteSearch
            id="basic-search"
            suggestions={countries}
            placeholder="Type a country name (e.g. India, United)..."
            value={val1}
            onChange={(v) => setVal1(v)}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value: <span className="font-mono bg-slate-200 dark:bg-slate-850 px-1 rounded">{val1 || "empty"}</span>
          </p>
        </div>

        {/* 2. Categorized / Grouped Search */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label htmlFor="categorized-search" className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Categorized Suggestions (Docs & Tools)
            </label>
            <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">Categorized</span>
          </div>
          <AutocompleteSearch
            id="categorized-search"
            suggestions={docItems}
            placeholder="Search documentation, tools, libraries..."
            value={val2}
            onChange={(v) => setVal2(v)}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected value: <span className="font-mono bg-slate-200 dark:bg-slate-850 px-1 rounded">{val2 || "empty"}</span>
          </p>
        </div>

        {/* 3. Async Loading State */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label htmlFor="async-search" className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Async Loading (Simulated 850ms latency)
            </label>
            <span className="text-[10px] text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded font-medium">Spinner</span>
          </div>
          <AutocompleteSearch
            id="async-search"
            suggestions={countries}
            isLoading={isLoading}
            placeholder="Type query to trigger async loading spinner..."
            value={val3}
            onChange={handleAsyncSearch}
          />
        </div>

        {/* 4. Disabled state */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label htmlFor="disabled-search" className="text-xs font-semibold text-slate-400 dark:text-slate-500 select-none">
              Disabled Search Input
            </label>
          </div>
          <AutocompleteSearch
            id="disabled-search"
            disabled
            placeholder="Search is currently disabled..."
            value={val4}
            onChange={(v) => setVal4(v)}
          />
        </div>

      </div>
    </div>
  );
}

export function AutocompleteSearchDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <AutocompleteSearchUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={autocompleteSearchUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={autocompleteSearchCodeString} language="jsx" filename="AutocompleteSearch.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Autocomplete Search Bar
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl">
            A premium, feature-rich search bar that suggests matches in real-time as users type. Perfect for global navigations, documentation sites, and lookup panels.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-500/20 font-medium">
              framer-motion
            </span>
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires Tailwind CSS & Lucide React
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
              Test the dynamic states, loading spinners, and recent search logs below. Try typing "Uni", selecting an item, then clearing and focusing on the input again to view your recent searches!
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
              Copy the source code below into your components directory.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps and API docs */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Autocomplete Search Component — Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Steps to import and implement this component into your workspace.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Add Dependencies
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component uses <code>framer-motion</code> for smooth entry transitions and <code>lucide-react</code> for standard search, time-history, and clear buttons.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>npm install framer-motion lucide-react</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. API Options (Props)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm text-left">
                <thead>
                  <tr className="text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 pr-4">Prop</th>
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4">Default</th>
                    <th className="py-2.5 pl-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">suggestions</td>
                    <td className="py-3 px-4 font-mono text-xs">Array</td>
                    <td className="py-3 px-4 font-mono text-xs">[]</td>
                    <td className="py-3 pl-4">List of search options. Can be strings, or objects with <code>label</code> and optional <code>category</code>.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                    <td className="py-3 px-4 font-mono text-xs">String</td>
                    <td className="py-3 px-4 font-mono text-xs">"Search..."</td>
                    <td className="py-3 pl-4">Placeholder text inside the search field.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono text-xs">String</td>
                    <td className="py-3 px-4 font-mono text-xs">""</td>
                    <td className="py-3 pl-4">Controlled search input query value.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">onChange</td>
                    <td className="py-3 px-4 font-mono text-xs">Function</td>
                    <td className="py-3 px-4 font-mono text-xs">-</td>
                    <td className="py-3 pl-4">Event handler triggered on typing or input cleanups. Passes the new text.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">onSelect</td>
                    <td className="py-3 px-4 font-mono text-xs">Function</td>
                    <td className="py-3 px-4 font-mono text-xs">-</td>
                    <td className="py-3 pl-4">Triggered when selecting a dropdown item. Returns either string or raw item object.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">isLoading</td>
                    <td className="py-3 px-4 font-mono text-xs">Boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">false</td>
                    <td className="py-3 pl-4">Shows an animated spinner inside the search input.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">enableRecentSearches</td>
                    <td className="py-3 px-4 font-mono text-xs">Boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">true</td>
                    <td className="py-3 pl-4">Stores successful selections in local storage and exhibits them when focused.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold font-mono text-blue-600 dark:text-blue-400">maxSuggestions</td>
                    <td className="py-3 px-4 font-mono text-xs">Number</td>
                    <td className="py-3 px-4 font-mono text-xs">8</td>
                    <td className="py-3 pl-4">Maximum number of suggestions displayed at once in the dropdown list.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Features</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li><strong>Keyboard Accessibility</strong>: ArrowDown and ArrowUp to navigate, Enter to select, and Escape to dismiss.</li>
                <li><strong>Dynamic Text Highlighting</strong>: Text elements matching the search input query are automatically wrapped in a highlighted blue component.</li>
                <li><strong>Groups / Categories</strong>: Automatically parses options with category keys and displays them sorted by category header sections.</li>
                <li><strong>Search History Logs</strong>: Integrates persistent localStorage memory for showing the last 5 queries with separate and clear-all controls.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
