import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Card", path: "/components/card" },
  { label: "Button", path: "/components/button" },
  { label: "Input", path: "/components/input" },
];

export function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="h-full bg-white px-4 py-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Components</h2>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition font-medium
                ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                } cursor-pointer`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
