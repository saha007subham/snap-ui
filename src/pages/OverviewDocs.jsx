import { useNavigate } from "react-router-dom";
import {
  MousePointer2,
  LayoutTemplate,
  TextCursorInput,
  CheckSquare,
  Settings2,
  Hash,
  CheckCircle2,
  Component,
  Moon,
  Sliders,
} from "lucide-react";

export function OverviewDocs() {
  const navigate = useNavigate();

  const components = [
    {
      name: "Button",
      description: "Interactive button element.",
      path: "/components/button",
      icon: MousePointer2,
    },
    {
      name: "Card",
      description: "Flexible container for content.",
      path: "/components/card",
      icon: LayoutTemplate,
    },
    {
      name: "Input",
      description: "Basic text input field.",
      path: "/components/input",
      icon: TextCursorInput,
    },
    {
      name: "Checkbox",
      description: "Toggleable check control.",
      path: "/components/checkbox",
      icon: CheckSquare,
    },
    {
      name: "RadioButton",
      description: "Single selection control.",
      path: "/components/radiobutton",
      icon: Settings2,
    },
    {
      name: "NumberField",
      description: "Numeric input with steppers.",
      path: "/components/numberfield",
      icon: Hash,
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Existing Components Section */}
        <div className="space-y-16">
          <section className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Components Overview
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
              Welcome to the SnapUI component documentation. Select a component
              below to see its usage, source code, and examples. All components
              are designed to be copied directly into your project.
            </p>
          </section>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((comp) => {
              const Icon = comp.icon;
              return (
                <div
                  key={comp.name}
                  onClick={() => navigate(comp.path)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {comp.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {comp.description}
                  </p>
                </div>
              );
            })}
          </section>
        </div>

        {/* 1. Why SnapUI Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
              Why SnapUI
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Own your UI. <br /> Don't just consume it.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              SnapUI is built on a copy-paste architecture. Instead of
              installing heavy npm packages and fighting with complex override
              APIs, you copy the exact component you need directly into your
              codebase. You get complete customization, zero vendor lock-in, and
              the ultimate developer experience.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              The SnapUI Advantage
            </h3>
            <ul className="space-y-4">
              {[
                "Copy-paste architecture",
                "Tailwind CSS powered",
                "Accessible patterns",
                "Dark mode ready",
                "Responsive by default",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. Quick Start Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quick Start
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Get up and running in seconds. Just drop the component into your
              project and import it.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-900 shadow-xl dark:border-slate-800 dark:bg-[#0c1120] overflow-hidden max-w-3xl">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-800/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs font-mono text-slate-400">
                Example.jsx
              </span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300">
                <code>
                  <span className="text-purple-400">import</span> {"{"}{" "}
                  <span className="text-cyan-400">Card</span> {"}"}{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">"@/components/ui/Card"</span>
                  ;
                  <br />
                  <br />
                  <span className="text-purple-400">
                    export default function
                  </span>{" "}
                  <span className="text-blue-400">App</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-cyan-400">Card</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-cyan-400">Card.Header</span>&gt;Hello
                  World&lt;/<span className="text-cyan-400">Card.Header</span>
                  &gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-cyan-400">Card.Body</span>&gt;SnapUI is
                  amazing!&lt;/<span className="text-cyan-400">Card.Body</span>
                  &gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                  <span className="text-cyan-400">Card</span>&gt;
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 3. Stats / Highlights Section */}
        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Component className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              20+
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Beautiful Components
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-4 inline-flex rounded-lg bg-purple-50 p-3 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <Moon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              100%
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Dark Mode Ready
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Sliders className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              Fully
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Customizable
            </p>
          </div>
        </section>

        {/* 4. Footer Section */}
        <footer className="mt-16 border-t border-slate-200 pt-8 pb-8 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Built with React + Tailwind CSS
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Built by Subham Saha
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
