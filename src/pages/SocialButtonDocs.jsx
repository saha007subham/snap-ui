import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { SocialButton, SocialButtonGroup } from "@/components/ui/SocialButton";
import { socialButtonUsageCode } from "@/components/code/socialButtonUsageCode";
import { socialButtonCodeString } from "@/components/code/socialButtonCode";

function SocialButtonUsagePreview() {
  // Playground State
  const [provider, setProvider] = useState("google");
  const [variant, setVariant] = useState("brand");
  const [size, setSize] = useState("md");
  const [shape, setShape] = useState("rounded");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Group Demo State
  const [groupLayout, setGroupLayout] = useState("grid");
  const [dividerText, setDividerText] = useState("Or sign in with");

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      {/* Playground Left Panel - Live Render */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80 min-h-[300px] gap-8">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest self-start">
          Interactive Live Preview
        </div>

        <div className="flex-1 flex items-center justify-center w-full">
          <SocialButton
            provider={provider}
            variant={variant}
            size={size}
            shape={shape}
            mode={mode}
            loading={loading}
            disabled={disabled}
            animate={animate}
            onClick={() => alert(`Clicked ${provider} button!`)}
          />
        </div>

        {/* Live Generated Code Snippet */}
        <div className="w-full bg-slate-900 dark:bg-black/40 text-slate-200 rounded-md p-3 text-xs font-mono overflow-x-auto border border-slate-800">
          <code>
            {`<SocialButton\n  provider="${provider}"\n  variant="${variant}"\n  size="${size}"\n  shape="${shape}"\n  mode="${mode}"${loading ? "\n  loading" : ""}${disabled ? "\n  disabled" : ""}${!animate ? "\n  animate={false}" : ""}\n/>`}
          </code>
        </div>
      </div>

      {/* Playground Right Panel - Controls */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Playground Controls
        </h3>

        {/* Provider */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Provider Platform
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="google">Google</option>
            <option value="github">GitHub</option>
            <option value="x">X / Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="apple">Apple</option>
            <option value="discord">Discord</option>
            <option value="linkedin">LinkedIn</option>
            <option value="slack">Slack</option>
            <option value="spotify">Spotify</option>
            <option value="microsoft">Microsoft</option>
          </select>
        </div>

        {/* Variant */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Visual Variant
          </label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="w-full text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="brand">Brand (Authentic)</option>
            <option value="brand-outline">Brand Outline</option>
            <option value="brand-solid">Brand Solid Background</option>
            <option value="solid">Theme Solid</option>
            <option value="outline">Theme Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>

        {/* Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Size
          </label>
          <div className="flex gap-2">
            {["sm", "md", "lg"].map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`flex-1 text-xs py-1.5 rounded-md border font-medium uppercase transition ${
                  size === sz
                    ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950"
                    : "bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Shape */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Shape
          </label>
          <div className="flex gap-2">
            {["rounded", "pill", "square"].map((sh) => (
              <button
                key={sh}
                onClick={() => setShape(sh)}
                className={`flex-1 text-xs py-1.5 rounded-md border font-medium capitalize transition ${
                  shape === sh
                    ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950"
                    : "bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {sh}
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Button Mode
          </label>
          <div className="flex gap-2">
            {["login", "share", "icon"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 text-xs py-1.5 rounded-md border font-medium capitalize transition ${
                  mode === m
                    ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950"
                    : "bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
          {/* Loading */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-900 border-slate-300 dark:border-slate-800"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Loading state
            </span>
          </label>

          {/* Disabled */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-900 border-slate-300 dark:border-slate-800"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Disabled state
            </span>
          </label>

          {/* Micro Animations */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={animate}
              onChange={(e) => setAnimate(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-900 border-slate-300 dark:border-slate-800"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Micro-animations (scale/hover)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export function SocialButtonDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Interactive Playground",
      content: <SocialButtonUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock
          code={socialButtonUsageCode}
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
          code={socialButtonCodeString}
          language="jsx"
          filename="SocialButton.jsx"
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
            Social Button
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Fully customizable auth & share buttons matching the brand design
            languages of top platforms like Google, GitHub, Apple, and Spotify.
            Comes equipped with dark mode adaptivity, dividers, and premium
            micro-animations.
          </p>
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 text-sm rounded-full border border-blue-200 dark:border-blue-500/20 font-medium">
            Requires Framer Motion, Tailwind CSS, and React.
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Playground & Examples
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Customize the component options in real-time or view usage
              snippets to get started.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Pre-packaged Group Demos */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Social Button Group Examples
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Utilize the{" "}
              <code className="text-sm px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">
                SocialButtonGroup
              </code>{" "}
              wrapper to easily arrange options and introduce clean separators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800/80">
            {/* Grid Auth Layout */}
            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Grid Auth Layout with Divider
              </span>
              <SocialButtonGroup
                layout="grid"
                cols={2}
                gap="sm"
                divider="Secure Login"
              >
                <SocialButton provider="google" variant="brand" />
                <SocialButton provider="github" variant="brand" />
                <SocialButton provider="apple" variant="brand" />
                <SocialButton provider="microsoft" variant="brand" />
              </SocialButtonGroup>
            </div>

            {/* List share layout */}
            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Share Action Columns
              </span>
              <SocialButtonGroup layout="col" gap="sm">
                <SocialButton provider="x" variant="brand" mode="share" />
                <SocialButton
                  provider="linkedin"
                  variant="brand-solid"
                  mode="share"
                />
                <SocialButton
                  provider="spotify"
                  variant="brand-solid"
                  mode="share"
                />
              </SocialButtonGroup>
            </div>
          </div>
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

        {/* Steps Guide */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Integration Walkthrough
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Setup is simple and doesn't require importing external icon
              libraries.
            </p>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                1. Verify Class Merge Utility
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This component uses the shared classnames utility{" "}
                <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                  cn
                </code>{" "}
                for cleaner tailwind merging:
              </p>
              <pre className="bg-slate-900 text-slate-200 text-xs px-3 py-2 rounded-md overflow-x-auto w-full max-w-xl">
                <code>{`// utils/cn.js\nimport { clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs));\n}`}</code>
              </pre>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                2. Paste Component Source
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Create a file{" "}
                <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                  SocialButton.jsx
                </code>{" "}
                inside your components folder and insert the source code tab
                code.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                3. Import & Use
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Import either the button or the group anywhere in your app:
              </p>
              <pre className="bg-slate-900 text-slate-200 text-xs px-3 py-2 rounded-md overflow-x-auto w-full max-w-xl">
                <code>{`import { SocialButton, SocialButtonGroup } from "@/components/ui/SocialButton";\n\nexport default function Page() {\n  return (\n    <SocialButtonGroup layout="grid" cols={2} gap="sm" divider="Continue with">\n      <SocialButton provider="google" onClick={doGoogleAuth} />\n      <SocialButton provider="github" onClick={doGitHubAuth} />\n    </SocialButtonGroup>\n  );\n}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Props Reference */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Props Reference
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Details on custom configuration props available for both
              components.
            </p>
          </div>

          {/* SocialButton Props */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              SocialButton Props
            </h3>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    <th className="px-4 py-3">Prop</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Default</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      provider
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"google"</td>
                    <td className="px-4 py-3">
                      One of:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        google
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        github
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        x / twitter
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        facebook
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        apple
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        discord
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        linkedin
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        slack
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        spotify
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        microsoft
                      </code>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      variant
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"brand"</td>
                    <td className="px-4 py-3">
                      Visual style. One of:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        brand
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        brand-outline
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        brand-solid
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        solid
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        outline
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-red-500">
                        ghost
                      </code>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      size
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"md"</td>
                    <td className="px-4 py-3">
                      Height of button. One of:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        sm
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        md
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        lg
                      </code>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      shape
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"rounded"</td>
                    <td className="px-4 py-3">
                      Button border radius:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        rounded
                      </code>{" "}
                      (md),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        pill
                      </code>{" "}
                      (circular),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        square
                      </code>{" "}
                      (sharp corners).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      mode
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"login"</td>
                    <td className="px-4 py-3">
                      Pre-written label configurations:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        login
                      </code>{" "}
                      ("Continue with [Name]"),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        share
                      </code>{" "}
                      ("Share on [Name]"),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        icon
                      </code>{" "}
                      (icon-only, hides text).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      loading
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">boolean</td>
                    <td className="px-4 py-3 font-mono">false</td>
                    <td className="px-4 py-3">
                      Swaps the brand icon with a spin loader and disables
                      clicks.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      animate
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">boolean</td>
                    <td className="px-4 py-3 font-mono">true</td>
                    <td className="px-4 py-3">
                      Enables responsive tap & hover micro-animations with
                      Framer Motion.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SocialButtonGroup Props */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              SocialButtonGroup Props
            </h3>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    <th className="px-4 py-3">Prop</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Default</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      layout
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"row"</td>
                    <td className="px-4 py-3">
                      Flex directions. One of:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        row
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        col
                      </code>
                      ,{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        grid
                      </code>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      cols
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">number</td>
                    <td className="px-4 py-3 font-mono">2</td>
                    <td className="px-4 py-3">
                      Number of columns for grid layouts. Accepts:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        1
                      </code>{" "}
                      to{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        4
                      </code>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      gap
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">string</td>
                    <td className="px-4 py-3 font-mono">"md"</td>
                    <td className="px-4 py-3">
                      Space between buttons:{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        sm
                      </code>{" "}
                      (8px),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        md
                      </code>{" "}
                      (16px),{" "}
                      <code className="text-xs bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">
                        lg
                      </code>{" "}
                      (24px).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      divider
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">
                      boolean | string
                    </td>
                    <td className="px-4 py-3 font-mono">false</td>
                    <td className="px-4 py-3">
                      Inserts a decorative separator above buttons. If string is
                      passed, it overrides the default "Or connect with" text.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
