import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { Card } from "@/components/ui/Card";
import { cardUsageCode } from "@/components/code/cardUsageCode";
import { cardCodeString } from "@/components/code/cardCode";

function CardUsagePreview() {
  return (
    <div className="flex items-center justify-center bg-slate-50 p-12 rounded-xl border border-slate-200 shadow-inner">
      <Card className="w-full max-w-sm">
        <Card.Header>Card Title</Card.Header>
        <Card.Body>This is a simple card description.</Card.Body>
        <Card.Footer>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm">
            Action
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export function CardDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <CardUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={cardUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={cardCodeString} language="jsx" filename="Card.jsx" />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Card Component
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            A flexible card component built with React and Tailwind CSS using a
            compound component pattern. Use these SnapUI card components to
            break your dashboards, profile pages, or admin interfaces up into
            smaller cards and wells for things like charts, tables, or forms.
            These components are designed and built by the SnapUI team, and
            include a variety of different styles and layouts.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-sm rounded-full border border-amber-200 font-medium">
            Requires React and Tailwind CSS to work properly.
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6 ">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Usage
            </h2>
            <p className="text-slate-500">
              Copy and paste the code below to use the Card component in your
              project.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Installation/Source Code Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Installation
            </h2>
            <p className="text-slate-500">
              Copy the source code below into your components folder to install
              the Card.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Steps to use the Card component */}
        <section className="space-y-8">
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Card Component — Usage Guide
            </h2>
            <p className="text-slate-500">
              Follow these steps to use the Card component in your project.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900">
              1. Install Tailwind CSS
            </h3>
            <p className="text-slate-500">
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

          {/* Step 2 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900">
              2. Copy the Source Code
            </h3>
            <p className="text-slate-500">
              Create a file in your project and paste the Card component code.
            </p>

            <pre className="bg-slate-900 text-slate-200 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>/components/Card.jsx</code>
            </pre>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-900">
              3. Import and Use the Component
            </h3>
            <p className="text-slate-500">
              Import the Card component into your file and use it as shown
              below.
            </p>

            <pre className="bg-slate-900 text-slate-200 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Card }"} from "../components/Card";</code>
            </pre>

            <p className="text-sm text-slate-400">
              If your project supports <span className="font-medium">@</span>{" "}
              alias, you can use:
            </p>

            <pre className="bg-slate-900 text-slate-200 text-sm px-3 py-2 rounded-md overflow-x-auto">
              <code>import {"{ Card }"} from "@/components/Card";</code>
            </pre>
          </div>

          <div className="space-y-4">
            {/* Notes */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900">Notes</h3>

              <ul className="list-disc pl-5 text-slate-500 space-y-1 text-sm">
                <li>Requires React + Tailwind CSS</li>
                <li>
                  Fully customizable via <code>className</code>
                </li>
                <li>Built using the compound component pattern</li>
              </ul>
            </div>

            {/* Tip */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900">Tip</h3>

              <p className="text-sm text-slate-500">
                Since this is a copy-paste component, you can freely modify it
                to fit your project—no restrictions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
