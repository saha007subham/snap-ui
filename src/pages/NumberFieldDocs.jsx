import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { NumberField } from "@/components/ui/NumberField";
import { numberFieldUsageCode } from "@/components/code/numberFieldUsageCode";
import { numberFieldCodeString } from "@/components/code/numberFieldCode";

function NumberFieldUsagePreview() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        {/* Default NumberField */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium leading-none text-slate-900 dark:text-white select-none">
            Quantity
          </label>
          <NumberField defaultValue={1} min={0} max={10} />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Min: 0, Max: 10
          </p>
        </div>

        {/* Disabled NumberField */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 select-none">
            Disabled Quantity
          </label>
          <NumberField defaultValue={5} disabled />
        </div>
      </div>
    </div>
  );
}

export function NumberFieldDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <NumberFieldUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock
          code={numberFieldUsageCode}
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
          code={numberFieldCodeString}
          language="jsx"
          filename="NumberField.jsx"
        />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Number Field Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A numeric input component with stepper buttons for incrementing and
            decrementing values.
          </p>
          <div className="inline-flex gap-3">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
              Requires React and Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 text-sm rounded-full border border-blue-200 dark:border-blue-500/20 font-medium">
              Requires lucide-react
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
              Copy and paste the code below to use the NumberField component in
              your project.
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
              the NumberField.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the NumberField component */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              NumberField Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these steps to use the NumberField component in your
              project.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Install Dependencies
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              This component requires Tailwind CSS and lucide-react for the plus
              and minus icons.
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
              Create a file in your project and paste the NumberField component
              code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/ui/NumberField.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Use the Component
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the NumberField component into your file and use it.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>
                import {"{ NumberField }"} from "../components/ui/NumberField";
              </code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Notes
              </h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li>
                  Inherits all native input attributes like{" "}
                  <code>disabled</code>, <code>onChange</code>, <code>min</code>
                  , <code>max</code>, <code>step</code>, etc.
                </li>
                <li>
                  Fully accessible as it uses standard HTML input semantics
                  under the hood.
                </li>
                <li>
                  Uses <code>forwardRef</code> to easily integrate with
                  libraries like React Hook Form.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
