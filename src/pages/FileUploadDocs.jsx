import { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CodeBlock } from "@/components/common/CodeBlock";
import { FileUpload } from "@/components/ui/FileUpload";
import { fileUploadUsageCode } from "@/components/code/fileUploadUsageCode";
import { fileUploadCodeString } from "@/components/code/fileUploadCode";
import { Info, Sparkles, Settings2, Sliders, Layers } from "lucide-react";

function FileUploadUsagePreview() {
  const [selectedVariant, setSelectedVariant] = useState("dropzone");
  const [maxSize, setMaxSize] = useState(5 * 1024 * 1024); // 5MB
  const [maxFiles, setMaxFiles] = useState(3);
  const [accept, setAccept] = useState("image/*, .pdf");
  const [multiple, setMultiple] = useState(true);
  const [simulateUpload, setSimulateUpload] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // Key to reset the FileUpload component and clear selected files when parameters change
  const [uploadKey, setUploadKey] = useState(0);

  const resetUploadComponent = () => {
    setUploadKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
      {/* Settings / Control Panel */}
      <div className="w-full lg:w-80 shrink-0 p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-3">
          <Settings2 className="h-4.5 w-4.5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Interactive Playground
          </h3>
        </div>

        {/* Variant Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Layout Variant
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-900 p-0.5 rounded-md border border-slate-250/50 dark:border-slate-850">
            {["dropzone", "button", "avatar"].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setSelectedVariant(v);
                  if (v === "avatar") {
                    setMultiple(false);
                    setAccept("image/*");
                  }
                  resetUploadComponent();
                }}
                className={`py-1 text-xs font-semibold rounded cursor-pointer capitalize select-none transition-colors ${
                  selectedVariant === v
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Toggles */}
        <div className="space-y-4 pt-1">
          {/* Multiple files selection */}
          {selectedVariant !== "avatar" && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">
                Allow Multiple
              </span>
              <input
                type="checkbox"
                checked={multiple}
                onChange={(e) => {
                  setMultiple(e.target.checked);
                  resetUploadComponent();
                }}
                className="h-4 w-4 text-blue-600 bg-slate-150 border-slate-300 rounded focus:ring-blue-500"
              />
            </div>
          )}

          {/* Simulate Upload Progress */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">
              Mock Progress Animation
            </span>
            <input
              type="checkbox"
              checked={simulateUpload}
              onChange={(e) => {
                setSimulateUpload(e.target.checked);
                resetUploadComponent();
              }}
              className="h-4 w-4 text-blue-600 bg-slate-150 border-slate-300 rounded focus:ring-blue-500"
            />
          </div>

          {/* Disabled status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">
              Disabled
            </span>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => {
                setDisabled(e.target.checked);
              }}
              className="h-4 w-4 text-blue-600 bg-slate-150 border-slate-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-900 my-4" />

        {/* Validation limits */}
        <div className="space-y-4">
          {/* Max Size */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Max File Size
            </label>
            <select
              value={maxSize}
              onChange={(e) => {
                setMaxSize(Number(e.target.value));
                resetUploadComponent();
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value={1024 * 1024}>1 MB</option>
              <option value={2 * 1024 * 1024}>2 MB</option>
              <option value={5 * 1024 * 1024}>5 MB</option>
              <option value={10 * 1024 * 1024}>10 MB</option>
              <option value={Infinity}>No Limit</option>
            </select>
          </div>

          {/* Max File Count */}
          {selectedVariant !== "avatar" && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Max Files Limit
              </label>
              <select
                value={maxFiles}
                disabled={!multiple}
                onChange={(e) => {
                  setMaxFiles(Number(e.target.value));
                  resetUploadComponent();
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 outline-none disabled:opacity-50"
              >
                <option value={1}>1 File</option>
                <option value={3}>3 Files</option>
                <option value={5}>5 Files</option>
                <option value={10}>10 Files</option>
                <option value={Infinity}>No Limit</option>
              </select>
            </div>
          )}

          {/* Accept filter */}
          {selectedVariant !== "avatar" && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Accepted Types (Filter)
              </label>
              <select
                value={accept}
                onChange={(e) => {
                  setAccept(e.target.value);
                  resetUploadComponent();
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="">Any formats</option>
                <option value="image/*">Images Only (image/*)</option>
                <option value=".pdf">PDF Only (.pdf)</option>
                <option value="image/*, .pdf">Images & PDFs (image/*, .pdf)</option>
                <option value=".zip, .rar, .tar.gz">Archives Only (.zip, .rar, etc)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Component Output Display */}
      <div className="flex-1 w-full min-h-[320px] flex flex-col items-center justify-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-6 md:p-8 shadow-sm">
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Live Showcase
            </span>
            <button
              onClick={resetUploadComponent}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-1 rounded font-bold cursor-pointer select-none transition-colors"
            >
              Clear Queue
            </button>
          </div>

          <div className="py-4">
            <FileUpload
              key={uploadKey}
              variant={selectedVariant}
              multiple={multiple}
              accept={accept}
              maxSize={maxSize}
              maxFiles={maxFiles}
              simulateUpload={simulateUpload}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileUploadDocs() {
  const usageTabs = [
    {
      id: "preview",
      label: "Preview",
      content: <FileUploadUsagePreview />,
    },
    {
      id: "code",
      label: "Code",
      content: (
        <CodeBlock code={fileUploadUsageCode} language="jsx" filename="FileUploadDemo.jsx" />
      ),
    },
  ];

  const sourceTabs = [
    {
      id: "code",
      label: "Source Code",
      content: (
        <CodeBlock code={fileUploadCodeString} language="jsx" filename="FileUpload.jsx" />
      ),
    },
  ];

  return (
    <div className="bg-transparent transition-colors w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Title Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            File Upload Component
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            A premium file-drop interface supporting multiple layouts, live simulated upload progress bars, dynamic image thumbnailing, and comprehensive validation guards.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 text-sm rounded-full border border-blue-200 dark:border-blue-500/20 font-medium">
            <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
            Supports Framer Motion & Lucide Icons.
          </div>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Preview & Examples
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Customize files restrictions, size guards, selection behaviors, and view layout variants instantly in our sandbox below.
            </p>
          </div>
          <Tabs tabs={usageTabs} />
        </section>

        {/* Installation Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Installation
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Copy the source code below into your UI folder to install the File Upload component.
            </p>
          </div>
          <Tabs tabs={sourceTabs} />
        </section>

        {/* Usage Guide Steps */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Setup Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Follow these simple steps to integrate file upload handlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-blue-500 font-mono">STEP 1</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ensure Dependencies
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Requires <span className="font-semibold text-slate-650">framer-motion</span> for layout flows and list transitions, and <span className="font-semibold text-slate-650">lucide-react</span> for modern, lightweight icons.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-blue-500 font-mono">STEP 2</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create UI Component
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Save the Source Code in a new file under your ui library. Make sure your relative utility imports are configured correctly.
              </p>
              <pre className="bg-slate-900 text-slate-200 text-[10px] font-mono px-2 py-1.5 rounded-md w-full overflow-x-auto select-all">
                /components/ui/FileUpload.jsx
              </pre>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-blue-500 font-mono">STEP 3</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Event Handler
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Import and handle files in your local component. The callback returns the updated array containing files, previews, sizes, and states.
              </p>
              <pre className="bg-slate-900 text-slate-200 text-[10px] font-mono px-2 py-1.5 rounded-md w-full overflow-x-auto">
                {"onFilesChange={(files) => ...}"}
              </pre>
            </div>
          </div>
        </section>

        {/* API Props Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              API Reference
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              The FileUpload component supports standard configurations.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 font-bold uppercase tracking-wider">
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Default</th>
                  <th className="px-4 py-3 font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-slate-600 dark:text-slate-350">
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">variant</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">"dropzone" | "button" | "avatar"</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">"dropzone"</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Layout aesthetics to render. Dropzone is drag-and-drop, button is compact inline, avatar is a circular crop preview layout.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">multiple</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">boolean</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">false</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Allows uploading more than one file concurrently. Disallowed in avatar mode.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">accept</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">string</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">""</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Comma-separated MIME types or file extension filters (e.g. <code>"image/*, .pdf, .zip"</code>).</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">maxSize</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">number</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">Infinity</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Maximum allowed individual file size in bytes (e.g. <code>5 * 1024 * 1024</code> for 5MB). Rejection triggers size warning.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">maxFiles</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">number</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">Infinity</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Maximum amount of items allowed to sit in the queue.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">simulateUpload</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">boolean</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">true</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Simulates smooth progress animations automatically upon file selection. Ideal for showcasing design status checks.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">disabled</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">boolean</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">false</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Disables file inputs, browser dialogs, drag zone responses, and delete action triggers.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">onFilesChange</td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">{"(files: FileItem[]) => void"}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">undefined</td>
                  <td className="px-4 py-3.5 font-sans leading-relaxed">Fires when files are added, progress updates, or files are removed.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
