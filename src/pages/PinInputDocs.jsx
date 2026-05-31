import { useState, useRef } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { PinInput } from "@/components/ui/PinInput";
import { Button } from "@/components/ui/Button";
import { pinCodeString } from "@/components/code/pinInputCode";
import { pinUsageCode } from "@/components/code/pinInputUsageCode";

function InteractivePlayground() {
  const [length, setLength] = useState(4);
  const [type, setType] = useState("numeric");
  const [variant, setVariant] = useState("outline");
  const [size, setSize] = useState("lg");
  const [gap, setGap] = useState(3);
  const [mask, setMask] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  
  const [inputValue, setInputValue] = useState("");
  const pinInputRef = useRef(null);

  const handleReset = () => {
    setInputValue("");
    setError(false);
    setSuccess(false);
    pinInputRef.current?.clear();
  };

  const handleRandomFill = () => {
    let chars = "1234567890";
    if (type === "alphabetic") chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (type === "alphanumeric") chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    let randomVal = "";
    for (let i = 0; i < length; i++) {
      randomVal += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setInputValue(randomVal);
    setError(false);
    setSuccess(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner w-full">
      {/* Visual Demo Section */}
      <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-[300px] bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="space-y-6 flex flex-col items-center text-center">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Live Preview</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive sandbox showing real-time configuration updates
            </p>
          </div>

          <div className="py-4">
            <PinInput
              ref={pinInputRef}
              length={length}
              type={type}
              variant={variant}
              size={size}
              gap={gap}
              mask={mask}
              disabled={disabled}
              error={error}
              success={success}
              placeholder={placeholder}
              value={inputValue}
              onChange={setInputValue}
              onComplete={(val) => {
                console.log("PIN Completed:", val);
                // Auto trigger success pulse for nice effect
                setSuccess(true);
                setError(false);
              }}
            />
          </div>

          {/* Diagnostic Console */}
          <div className="w-full max-w-sm rounded-lg bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 text-left font-mono text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5 text-slate-400">
              <span>Property</span>
              <span>Value</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Value (Combined):</span>
              <span className="text-blue-500 dark:text-blue-400 font-bold">{inputValue || '""'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Complete:</span>
              <span className={inputValue.length === length ? "text-emerald-500" : "text-amber-500"}>
                {inputValue.length === length ? "true" : "false"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Progress:</span>
              <span>{inputValue.length} / {length}</span>
            </div>
          </div>

          {/* Quick Sandbox Action Buttons */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset}>
              Reset State
            </Button>
            <Button size="sm" variant="secondary" onClick={handleRandomFill}>
              Auto-Fill Pin
            </Button>
          </div>
        </div>
      </div>

      {/* Control Panel Section */}
      <div className="flex flex-col space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          Playground Options
        </h3>

        {/* Pin Length */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pin Length ({length})
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[4, 5, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setLength(num);
                  handleReset();
                }}
                className={`py-1.5 px-3 text-xs font-medium rounded-md border transition cursor-pointer ${
                  length === num
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Input Validation Type */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Validation Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["numeric", "alphabetic", "alphanumeric"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setType(mode);
                  handleReset();
                }}
                className={`py-1.5 px-1 text-[10px] sm:text-xs font-medium rounded-md border capitalize transition cursor-pointer ${
                  type === mode
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Variants */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Design Variant
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["outline", "filled", "underlined", "glass"].map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`py-1.5 px-3 text-xs font-medium rounded-md border capitalize transition cursor-pointer ${
                  variant === v
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Sizing Scale */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Size Scale
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["sm", "md", "lg", "xl"].map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`py-1.5 px-3 text-xs font-medium rounded-md border uppercase transition cursor-pointer ${
                  size === sz
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Gaps */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Box Spacing (Gap)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((g) => (
              <button
                key={g}
                onClick={() => setGap(g)}
                className={`py-1.5 px-3 text-xs font-medium rounded-md border transition cursor-pointer ${
                  gap === g
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* State Switches */}
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            State & Effects
          </label>
          
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={mask}
                onChange={(e) => setMask(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              Mask Characters (●)
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              Disabled State
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={error}
                onChange={(e) => {
                  setError(e.target.checked);
                  if (e.target.checked) setSuccess(false);
                }}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-rose-500 focus:ring-rose-500 cursor-pointer"
              />
              Error / Shake Effect
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={success}
                onChange={(e) => {
                  setSuccess(e.target.checked);
                  if (e.target.checked) setError(false);
                }}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
              />
              Success Outline Effect
            </label>
          </div>
        </div>

        {/* Custom Placeholders */}
        <div className="space-y-2">
          <label htmlFor="playground-placeholder" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Custom Placeholder Character
          </label>
          <input
            id="playground-placeholder"
            type="text"
            maxLength={1}
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="e.g. ○ or -"
            className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-slate-400 dark:focus:border-slate-700"
          />
        </div>

      </div>
    </div>
  );
}

function ShowcasesSection() {
  const [val1, setVal1] = useState("");
  const [error1, setError1] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [verifying1, setVerifying1] = useState(false);

  const handleOTPComplete = (value) => {
    setVerifying1(true);
    setError1(false);
    setSuccess1(false);

    // Simulated network delay
    setTimeout(() => {
      setVerifying1(false);
      if (value === "123456") {
        setSuccess1(true);
      } else {
        setError1(true);
      }
    }, 1500);
  };

  const handleOTPReset = () => {
    setVal1("");
    setError1(false);
    setSuccess1(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      
      {/* Showcase 1: OTP Box */}
      <div className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">OTP Code Verification</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configured for 6 numeric inputs with auto-submission triggers.
          </p>
        </div>

        <div className="space-y-4">
          <PinInput
            length={6}
            type="numeric"
            value={val1}
            onChange={setVal1}
            onComplete={handleOTPComplete}
            disabled={verifying1}
            error={error1}
            success={success1}
            variant="outline"
            size="lg"
            gap="3"
            placeholder="○"
          />

          <div className="flex items-center justify-between min-h-[24px]">
            {verifying1 && <p className="text-xs text-blue-500 dark:text-blue-400 animate-pulse">Verifying pin...</p>}
            {success1 && <p className="text-xs text-emerald-500 font-medium">✨ Access Granted. Correct code verified!</p>}
            {error1 && (
              <p className="text-xs text-rose-500 font-medium">
                ❌ Verification failed. Code must be <span className="font-mono bg-rose-50 dark:bg-rose-500/10 px-1 py-0.5 rounded">123456</span>
              </p>
            )}
            {!verifying1 && !success1 && !error1 && (
              <p className="text-xs text-slate-400">
                Hint: Type <span className="font-mono font-bold text-slate-500">123456</span> to succeed.
              </p>
            )}

            {(success1 || error1) && (
              <button onClick={handleOTPReset} className="text-xs text-blue-500 hover:underline font-medium cursor-pointer">
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Showcase 2: Secret Password Code */}
      <div className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Security PIN Mode</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Uses masking to hide values with custom password dots.
          </p>
        </div>

        <div className="space-y-4">
          <PinInput
            length={4}
            type="numeric"
            mask="★"
            variant="filled"
            size="xl"
            gap="4"
          />
          <p className="text-xs text-slate-400">
            Perfect for credit card passwords, security gates, or lock screens.
          </p>
        </div>
      </div>

      {/* Showcase 3: Underlined Product Key */}
      <div className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Underlined Registration Key</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            8-digit alphanumeric fields utilizing the minimalist underlined style.
          </p>
        </div>

        <div className="space-y-4">
          <PinInput
            length={8}
            type="alphanumeric"
            variant="underlined"
            size="md"
            gap="2"
            placeholder="-"
          />
          <p className="text-xs text-slate-400">
            Supports numbers and letters (case insensitive input mapping).
          </p>
        </div>
      </div>

      {/* Showcase 4: Glassmorphic Panel Theme */}
      <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 relative overflow-hidden">
        {/* Neon Glow Circle */}
        <div className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[40px] -bottom-10 -right-10 pointer-events-none" />
        
        <div className="space-y-1 z-10">
          <h3 className="font-bold text-white text-base">Glassmorphism Portal</h3>
          <p className="text-xs text-slate-400">
            Beautiful styling variant for high-fidelity dashboards and dark pages.
          </p>
        </div>

        <div className="space-y-4 z-10">
          <PinInput
            length={4}
            type="numeric"
            variant="glass"
            size="xl"
            gap="4"
            placeholder="•"
            inputClassName="text-white border-white/20 hover:border-white/40 focus:border-blue-400"
          />
          <p className="text-xs text-slate-400">
            Backdrop filter blurred boxes optimized for premium backgrounds.
          </p>
        </div>
      </div>

    </div>
  );
}

export function PinInputDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <InteractivePlayground />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={pinUsageCode} language="jsx" filename="Example.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={pinCodeString} language="jsx" filename="PinInput.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Header Title Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded">
              Form Component
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pin Input Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium, high-accessibility input system specifically tailored for verification PINs, passwords, and multi-digit OTP keys. Fully interactive, supports smart pasting and smooth responsive animations.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 text-sm rounded-full border border-amber-200 dark:border-amber-500/20 font-medium">
            Requires Framer Motion and Tailwind CSS.
          </div>
        </section>

        {/* Sandbox Playground */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Playground
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Select values from the options sidebar to dynamically style and configure your custom Pin Input.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Visual Showcases */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Use-Case Showcases
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Browse common preset implementations designed for diverse product requirements.
            </p>
          </div>
          <ShowcasesSection />
        </section>

        {/* Installation and Source Code */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Create the component file below in your components directory to implement the PinInput.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Detailed Usage Guide */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Guide & Features
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Understanding keyboard interactions, assistive accessibility, and programmatic controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
            {/* Features Checklist */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Core Features
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Controlled Syncing:</strong> Seamless support for uncontrolled setups or two-way bound state fields using <code>value</code> and <code>onChange</code>.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Clipboard Pasting:</strong> Pasting a numeric code anywhere in the input container auto-distributes content among valid input slots.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Keyboard Controls:</strong> Left / Right arrow navigation lets users scrub and correct typos easily.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Backward Backspace:</strong> Standard OTP flow where backspacing on an empty box jumps back to clear the previous digit.
                </li>
              </ul>
            </div>

            {/* Accessibility features */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                A11y & Programmatic Control
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Ref Handles:</strong> Exposes clean utility commands like <code>pinInputRef.current.clear()</code> and <code>pinInputRef.current.focus()</code> to build external controllers.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Responsive Typing:</strong> Uses numeric <code>inputMode</code> on mobile platforms to trigger optimal number pads automatically.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Aria Descriptions:</strong> Clean layout hierarchies and input labels render perfectly with screen readers.
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
