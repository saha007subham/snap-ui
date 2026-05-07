import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { Input } from "@/components/ui/Input";
import { inputUsageCode } from "@/components/code/inputUsageCode";
import { inputCodeString } from "@/components/code/inputCode";

function InputUsagePreview() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        
        {/* Default Input */}
        <div className="space-y-2">
          <label htmlFor="email-preview" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
            Email
          </label>
          <Input type="email" id="email-preview" placeholder="Enter your email" />
        </div>

        {/* Disabled Input */}
        <div className="space-y-2">
          <label htmlFor="disabled-preview" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
            Disabled
          </label>
          <Input disabled type="text" id="disabled-preview" placeholder="Disabled input" />
        </div>

        {/* File Input */}
        <div className="space-y-2">
          <label htmlFor="picture-preview" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
            Picture
          </label>
          <Input id="picture-preview" type="file" className="cursor-pointer" />
        </div>

      </div>
    </div>
  );
}

export function InputDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <InputUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={inputUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={inputCodeString} language="jsx" filename="Input.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Input Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Displays a form input field or a component that looks like an input field. Beautifully styled by default, supporting various input types and states.
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
              Copy and paste the code below to use the Input component in your project.
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
              Copy the source code below into your components folder to install the Input.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the Input component */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Input Component — Usage Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these steps to use the Input component in your project.
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
              Create a file in your project and paste the Input component code.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/Input.jsx</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              3. Import and Use the Component
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Import the Input component into your file and use it.
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Input }"} from "../components/Input";</code>
            </pre>
            <p className="text-sm text-slate-400 mt-2">
              If your project supports <span className="font-medium">@</span> alias, you can use:
            </p>
            <pre className="bg-slate-900 dark:bg-black text-slate-200 dark:text-slate-300 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Input }"} from "@/components/Input";</code>
            </pre>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notes</h3>
              <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1 text-sm">
                <li>Inherits all native input attributes like <code>disabled</code>, <code>type</code>, <code>placeholder</code>, etc.</li>
                <li>Supports <code>type="file"</code> seamlessly.</li>
                <li>Uses <code>forwardRef</code> so you can easily integrate it with libraries like React Hook Form.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
