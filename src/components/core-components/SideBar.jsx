import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/components/overview" },

  // Components (Alphabetically Sorted)
  { label: "Accordion", path: "/components/accordion" },
  { label: "Button", path: "/components/button" },
  { label: "Card", path: "/components/card" },
  { label: "CheckBox", path: "/components/checkbox" },
  { label: "Checkbox Card", path: "/components/checkboxcard" },
  { label: "Colour Picker", path: "/components/colourpicker" },
  { label: "ComboBox", path: "/components/combobox" },
  { label: "Date Picker", path: "/components/datepicker" },
  { label: "File Upload", path: "/components/fileupload" },
  { label: "Input", path: "/components/input" },
  { label: "Password Input", path: "/components/passwordinput" },
  { label: "Pin Input", path: "/components/pininput" },
  { label: "Number Field", path: "/components/numberfield" },
  { label: "Radio Button", path: "/components/radiobutton" },
  { label: "Segmented Control", path: "/components/segmentedcontrol" },
  { label: "Slider", path: "/components/slider" },
  { label: "Star Rating", path: "/components/starrating" },
  { label: "Switch", path: "/components/switch" },
  { label: "Tags Input", path: "/components/tagsinput" },
];

export function SideBar() {
  return (
    <aside className="h-full px-4 py-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Components
      </h2>

      {/* Navigation */}
      <nav className="space-y-1 pb-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full block text-left px-3 py-2 rounded-md text-sm transition font-medium ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              } cursor-pointer`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
