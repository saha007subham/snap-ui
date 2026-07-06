import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { progressBarUsageCode } from "@/components/code/progressBarUsageCode";
import { progressBarCodeString } from "@/components/code/progressBarCode";

function ProgressBarUsagePreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-10 shadow-inner dark:border-slate-800 dark:bg-slate-900/50">
      <div className="w-full max-w-2xl space-y-6">
        <ProgressBar
          label="Upload progress"
          value={68}
          showValue
          variant="default"
        />
        <ProgressBar
          label="Deployment"
          value={100}
          showValue
          variant="success"
        />
        <ProgressBar label="Syncing" indeterminate variant="warning" />
        <ProgressBar
          label="Storage"
          value={35}
          showValue
          variant="danger"
          size="lg"
        />
      </div>
    </div>
  );
}

export function ProgressBarDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <ProgressBarUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock
          code={progressBarUsageCode}
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
          code={progressBarCodeString}
          language="jsx"
          filename="ProgressBar.jsx"
        />
      ),
    },
  ];

  return (
    <div className="w-full bg-transparent transition-colors">
      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Progress Bar Component
          </h1>
          <p className="max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            A simple, accessible progress indicator for uploads, loading states,
            and task completion.
          </p>
          <div className="inline-flex gap-3">
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
              Requires React and Tailwind CSS
            </span>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Usage
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy and paste the example below to use the Progress Bar
              component.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy the source code below into your components folder to install
              the Progress Bar.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>
      </div>
    </div>
  );
}
