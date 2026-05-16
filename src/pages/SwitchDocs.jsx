import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { Switch } from "@/components/ui/Switch";
import { switchUsageCode } from "@/components/code/switchUsageCode";
import { switchCodeString } from "@/components/code/switchCode";

function SwitchUsagePreview() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-6">
        
        {/* Default Switch */}
        <div className="flex items-center space-x-3">
          <Switch id="airplane-preview" />
          <label
            htmlFor="airplane-preview"
            className="text-sm font-medium leading-none text-slate-900 dark:text-white cursor-pointer select-none"
          >
            Airplane Mode
          </label>
        </div>

        {/* Disabled Switch */}
        <div className="flex items-center space-x-3">
          <Switch id="disabled-preview" disabled />
          <label
            htmlFor="disabled-preview"
            className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed select-none"
          >
            Disabled Switch
          </label>
        </div>

        {/* Checked & Disabled Switch */}
        <div className="flex items-center space-x-3">
          <Switch id="checked-disabled-preview" disabled defaultChecked />
          <label
            htmlFor="checked-disabled-preview"
            className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed select-none"
          >
            Checked and Disabled
          </label>
        </div>

      </div>
    </div>
  );
}

export function SwitchDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <SwitchUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={switchUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={switchCodeString} language="jsx" filename="Switch.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Switch Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A control that allows the user to toggle between checked and not checked. Useful for toggling boolean settings or preferences.
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
              Copy and paste the code below to use the Switch component in your project.
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
              Copy the source code below into your components folder to install the Switch.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the Switch component */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Switch Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these steps to use the Switch component in your project.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              1. Copy the Source Code
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Create a file in your project and paste the Switch component code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/Switch.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              2. Import and Use the Component
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the Switch component into your file and use it.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Switch }"} from "../components/Switch";</code>
            </pre>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li>Inherits all native input attributes like <code>disabled</code>, <code>onChange</code>, <code>checked</code>, <code>defaultChecked</code>, etc.</li>
                <li>Fully accessible as it uses standard HTML input semantics under the hood.</li>
                <li>Uses <code>forwardRef</code> to easily integrate with libraries like React Hook Form.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
