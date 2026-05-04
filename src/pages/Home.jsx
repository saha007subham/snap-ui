import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="h-full overflow-y-auto transition-colors flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        {/* Logo / Product Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          SnapUI
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4">
          Build interfaces in a snap.
        </p>

        {/* Subtext */}
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Copy, customize, and ship beautiful React components instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={() => (window.location.href = "/components")}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer font-medium"
          >
            Explore All Components
          </button>

          {/* Secondary CTA */}
          <button className="px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-300 dark:hover:text-white transition cursor-pointer font-medium">
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
