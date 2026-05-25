import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { passwordInputUsageCode } from "@/components/code/passwordInputUsageCode";
import { passwordInputCodeString } from "@/components/code/passwordInputCode";
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InteractivePlayground() {
  const [password, setPassword] = useState("");
  const [showStrength, setShowStrength] = useState(true);
  const [showRequirements, setShowRequirements] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [customStyle, setCustomStyle] = useState("default");

  const styleClasses = {
    default: "",
    glow: "focus-visible:ring-emerald-500 focus-visible:ring-2 dark:focus-visible:ring-emerald-400 border-emerald-200 dark:border-emerald-900 bg-emerald-50/5 dark:bg-emerald-950/5",
    amber: "focus-visible:ring-amber-500 border-amber-200 focus-visible:ring-2 dark:focus-visible:ring-amber-500",
    gradient: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400 border-indigo-200 dark:border-indigo-900"
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      {/* Visual Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-950 rounded-lg border border-slate-200/60 dark:border-slate-800/60 shadow-sm relative overflow-hidden min-h-[300px]">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-950 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
        
        <div className="relative z-10 w-full max-w-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Playground Password Input
            </label>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Type inside to experience real-time validations and animations.
            </p>
          </div>
          
          <PasswordInput
            id="playground-password"
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength={showStrength}
            showRequirements={showRequirements}
            disabled={disabled}
            className={styleClasses[customStyle]}
          />
          
          <div className="pt-2 text-right">
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
              Length: {password.length} characters
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 bg-slate-100/50 dark:bg-slate-900/30 p-6 rounded-lg border border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-6">
        <h3 className="font-semibold text-slate-950 dark:text-slate-50 text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          Interactive Props
        </h3>

        {/* Props Checkboxes */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showStrength}
              onChange={(e) => setShowStrength(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-violet-600 focus:ring-violet-500 dark:bg-slate-950 dark:checked:bg-violet-600"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                showStrength
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Displays password strength bar
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRequirements}
              onChange={(e) => setShowRequirements(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-violet-600 focus:ring-violet-500 dark:bg-slate-950 dark:checked:bg-violet-600"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                showRequirements
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Shows validation criteria checklist
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-violet-600 focus:ring-violet-500 dark:bg-slate-950 dark:checked:bg-violet-600"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                disabled
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Disables the input state
              </span>
            </div>
          </label>
        </div>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Custom Style Variations */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Style Variants
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "default", name: "Default" },
              { id: "glow", name: "Emerald" },
              { id: "amber", name: "Amber" },
              { id: "gradient", name: "Gradient" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setCustomStyle(v.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium border text-center transition cursor-pointer",
                  customStyle === v.id
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RealWorldFormShowcase() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Quick strength validator for form submission block
  const isFormValid =
    email.includes("@") &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner flex justify-center w-full">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-md space-y-6">
        <div className="space-y-1.5 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 mb-2">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
            Create an Account
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set up your credentials with our smart validation indicator.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-slate-800 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <PasswordInput
              placeholder="Enter a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showStrength
              showRequirements
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={cn(
              "w-full h-10 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer",
              isFormValid
                ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:-translate-y-[1px]"
                : "bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed dark:bg-slate-900 dark:border-slate-800/80 dark:text-slate-600"
            )}
          >
            Sign Up Now
          </button>
        </form>

        {submitted && (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-lg text-emerald-700 dark:text-emerald-400 animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div className="flex-1 text-xs">
              <span className="font-semibold block">Registration success!</span>
              Your password has passed our rigorous criteria check.
            </div>
          </div>
        )}

        {!submitted && !isFormValid && password.length > 0 && (
          <div className="flex items-start gap-2.5 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-lg text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight">
              Please fulfill all strength requirements above to enable submission.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PasswordInputDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Playground",
      content: <InteractivePlayground />,
    },
    {
      id: "form-preview",
      label: "Real-World Form",
      content: <RealWorldFormShowcase />,
    },
    {
      id: "code",
      label: "Code Example",
      content: (
        <CodeBlock code={passwordInputUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={passwordInputCodeString} language="jsx" filename="PasswordInput.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-850">
              Interactive
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Secure Validation
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            Password Input
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium password input component featuring integrated visibility toggles, standard entropy-based strength indicators, and dynamic requirements verification checkmarks.
          </p>
          <div className="inline-block px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-850 dark:text-violet-400 text-sm rounded-full border border-violet-200 dark:border-violet-500/20 font-medium">
            Requires Framer Motion & Lucide Icons for fully-featured experience.
          </div>
        </section>

        {/* Interactive Playgrounds Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Showcase
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Test dynamic behaviors using the props checklist or inspect our real-world form implementation.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Source Code Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation & Source Code
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy the source code directly into your local components directory to add this component to your library.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Integration Details / Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Usage & Properties Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Understand properties and API structure to customize details of your Password Input.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-900 dark:text-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left">Property</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Default</th>
                  <th className="px-4 py-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">showStrength</td>
                  <td className="px-4 py-3 text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3">Displays a 4-bar colored strength rating when typing.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">showRequirements</td>
                  <td className="px-4 py-3 text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3">Displays a checklist of security conditions with dynamic icons.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">requirements</td>
                  <td className="px-4 py-3 text-xs">Requirement[]</td>
                  <td className="px-4 py-3 font-mono text-xs">DEFAULT_RULES</td>
                  <td className="px-4 py-3">Custom array of validation rules (each requires `id`, `label`, and a `test` function).</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">className</td>
                  <td className="px-4 py-3 text-xs">string</td>
                  <td className="px-4 py-3 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3">Additional classes added directly to the password input field.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">requirementsClassName</td>
                  <td className="px-4 py-3 text-xs">string</td>
                  <td className="px-4 py-3 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3">Additional classes added to the requirements wrapper.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Highlights</h3>
            <ul className="list-disc pl-5 text-slate-500 dark:text-slate-400 space-y-1.5 text-sm">
              <li>
                <strong>Framer Hook Ready:</strong> Integrates ref-forwarding so standard react validation hooks (e.g. <code>react-hook-form</code>) work directly.
              </li>
              <li>
                <strong>Complete Responsiveness:</strong> Designed layout wraps fluidly on smaller screens, keeping elements fully proportioned.
              </li>
              <li>
                <strong>Accessibility First:</strong> Fully keyboard navigatable and includes screen-reader announcements using proper aria attributes.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
