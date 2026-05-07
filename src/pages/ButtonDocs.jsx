import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { Button } from "@/components/ui/Button";
import { buttonUsageCode } from "@/components/code/buttonUsageCode";
import { buttonCodeString } from "@/components/code/buttonCode";
import { Mail } from "lucide-react";

function ButtonUsagePreview() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner gap-8 w-full">
      <div className="flex flex-col gap-6 w-full max-w-md">
        
        {/* Variants */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Variants</span>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Sizes</span>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* With Icon & Disabled */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">States & Icons</span>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
            <Button variant="secondary" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export function ButtonDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <ButtonUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={buttonUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={buttonCodeString} language="jsx" filename="Button.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Button Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Displays a button or a component that looks like a button. Includes support for multiple variants, sizes, and states to fit seamlessly into any design.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
            Requires React and Tailwind CSS to work properly.
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Usage
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy and paste the code below to use the Button component in your
              project.
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
              Copy the source code below into your components folder to install
              the Button.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the Button component */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Button Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these steps to use the Button component in your project.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Install Tailwind CSS
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component requires Tailwind CSS.
            </p>
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              https://tailwindcss.com/docs/installation
            </a>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a file in your project and paste the Button component code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/Button.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Use the Component
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the Button component into your file and use it.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Button }"} from "../components/Button";</code>
            </pre>
            <p className="text-sm text-slate-400 mt-2">
              If your project supports <span className="font-medium">@</span>{" "}
              alias, you can use:
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Button }"} from "@/components/Button";</code>
            </pre>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Props</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li><code>variant</code>: primary, secondary, outline, ghost, danger</li>
                <li><code>size</code>: sm, md, lg, icon</li>
                <li>Inherits all native button attributes like <code>disabled</code>, <code>onClick</code>, etc.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
