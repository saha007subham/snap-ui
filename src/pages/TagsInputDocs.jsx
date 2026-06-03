import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { TagsInput } from "@/components/ui/TagsInput";
import { tagsInputUsageCode } from "@/components/code/tagsInputUsageCode";
import { tagsInputCodeString } from "@/components/code/tagsInputCode";

function TagsInputUsagePreview() {
  const [standardTags, setStandardTags] = useState(["react", "tailwind", "framework"]);
  const [emailTags, setEmailTags] = useState(["hello@google.com"]);
  const [controlledTags, setControlledTags] = useState(["design", "ux"]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-10 w-full max-w-lg">
        
        {/* 1. Default Tags Input */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Standard Tags Input
          </label>
          <div className="flex flex-col gap-2">
            <TagsInput
              value={standardTags}
              onChange={setStandardTags}
              placeholder="Press Enter or Comma to add tags..."
            />
            <span className="text-xs text-slate-400">
              Type keywords and press Enter or Comma. Duplicates are rejected by default.
            </span>
          </div>
        </div>

        {/* 2. Custom Validation Tags Input (Email) */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            With Custom Validation (Emails Only)
          </label>
          <div className="flex flex-col gap-2">
            <TagsInput
              value={emailTags}
              onChange={setEmailTags}
              validateTag={validateEmail}
              placeholder="Type an email and press Enter..."
            />
            <span className="text-xs text-slate-400">
              Invalid email formats will throw a localized validation error.
            </span>
          </div>
        </div>

        {/* 3. Max Tags Limit */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Max Tags Constraint (Limit: 5)
          </label>
          <div className="flex flex-col gap-2">
            <TagsInput
              maxTags={5}
              defaultValue={["javascript", "typescript"]}
              placeholder="Maximum of 5 tags..."
            />
            <span className="text-xs text-slate-400">
              An error message appears when trying to exceed the 5-tag threshold.
            </span>
          </div>
        </div>

        {/* 4. Controlled State with Clear All Action */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
              Controlled State & Programmatic Controls
            </label>
            <button
              onClick={() => setControlledTags([])}
              className="text-xs font-semibold px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded transition cursor-pointer"
            >
              Clear All Tags
            </button>
          </div>
          <div className="space-y-2">
            <TagsInput
              value={controlledTags}
              onChange={setControlledTags}
              placeholder="Add more tags..."
            />
            <div className="text-xs text-slate-500 font-mono">
              Current Array: {JSON.stringify(controlledTags)}
            </div>
          </div>
        </div>

        {/* 5. Read Only Display */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-white select-none">
            Read-Only Display
          </label>
          <div className="flex flex-col gap-2">
            <TagsInput
              readOnly
              defaultValue={["read-only", "no-remove", "static-badges"]}
            />
            <span className="text-xs text-slate-400">
              Useful for displaying tags attached to articles, projects, or portfolios without allowing modifications.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export function TagsInputDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <TagsInputUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={tagsInputUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={tagsInputCodeString} language="jsx" filename="TagsInput.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Tags Input
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A component that renders interactive tag badges inside a styled text field. Ideal for user profiles, settings, category selection, and keyword organization.
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
              Copy and paste the code below to use the TagsInput component in your project.
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
              Copy the source code below into your components folder to install the TagsInput.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tags Input Component — Usage Guide
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
              Create a new component file `TagsInput.jsx` in your project and insert the source code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>/components/ui/TagsInput.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Use
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the TagsInput component in your workspace file.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto font-mono">
              <code>import {"{ TagsInput }"} from "@/components/ui/TagsInput";</code>
            </pre>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-2 text-sm">
                <li>
                  <strong>Delimiter mapping:</strong> You can pass custom keys (e.g. <code>delimiter={"{['Enter', ' ']}"}</code>) to add tags on Space or other specific key triggers.
                </li>
                <li>
                  <strong>Automatic addition:</strong> By default, if the input is blurred while having an uncommitted text fragment, it auto-commits the text as a tag badge. Disable this with <code>addOnBlur={"{false}"}</code>.
                </li>
                <li>
                  <strong>Keyboard Accessibility:</strong> Fully navigates backward and forward using <code>ArrowLeft</code> and <code>ArrowRight</code> when the typing cursor is empty. Pressing <code>Backspace</code> or <code>Delete</code> on a highlighted tag badge removes it immediately.
                </li>
                <li>
                  <strong>Animations:</strong> Relies on <code>Framer Motion</code> to perform scale-in/scale-out transitions when tags are added or cleared.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
