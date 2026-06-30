export const autocompleteSearchUsageCode = `import { useState } from "react";
import { AutocompleteSearch } from "@/components/ui/AutocompleteSearch";

export default function Example() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "China",
    "Brazil",
  ];

  const searchItems = [
    { id: 1, label: "React components", category: "Documentation" },
    { id: 2, label: "Tailwind utility layout", category: "Documentation" },
    { id: 3, label: "Vite build configuration", category: "Tools" },
    { id: 4, label: "ESlint linting rules", category: "Tools" },
    { id: 5, label: "Framer Motion transitions", category: "Libraries" },
  ];

  const handleAsyncSearch = (val) => {
    setQuery3(val);
    if (!val) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Basic Autocomplete */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Basic Autocomplete (Countries)
        </label>
        <AutocompleteSearch
          suggestions={countries}
          placeholder="Type a country (e.g. United)..."
          value={query1}
          onChange={setQuery1}
          onSelect={(val) => console.log("Selected:", val)}
        />
      </div>

      {/* Categorized / Grouped Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Categorized Suggestions (Docs & Tools)
        </label>
        <AutocompleteSearch
          suggestions={searchItems}
          placeholder="Search documentation, tools..."
          value={query2}
          onChange={setQuery2}
        />
      </div>

      {/* Async Loading State */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          Async Loading State (Simulated)
        </label>
        <AutocompleteSearch
          suggestions={countries}
          isLoading={isLoading}
          placeholder="Search with async spinner..."
          value={query3}
          onChange={handleAsyncSearch}
        />
      </div>
    </div>
  );
}
`;
