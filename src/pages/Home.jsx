import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* Logo / Product Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          SnapUI
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-slate-600 mb-4">
          Build interfaces in a snap.
        </p>

        {/* Subtext */}
        <p className="text-slate-500 mb-8">
          Copy, customize, and ship beautiful React components instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={() => (window.location.href = "/components")}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Explore All Components
          </button>

          {/* Secondary CTA */}
          <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-100 transition cursor-pointer">
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
