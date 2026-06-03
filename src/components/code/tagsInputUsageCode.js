export const tagsInputUsageCode = `import { useState } from "react";
import { TagsInput } from "@/components/ui/TagsInput";

export default function TagsInputDemo() {
  const [tags, setTags] = useState(["react", "tailwind", "design-system"]);
  
  // Custom email validation
  const validateEmail = (email) => {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Default Tags Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Standard Tags
        </label>
        <TagsInput 
          value={tags} 
          onChange={setTags} 
          placeholder="Press Enter or Comma to add tags..."
        />
      </div>

      {/* Tags Input with Custom Validation */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Email Validation
        </label>
        <TagsInput 
          validateTag={validateEmail}
          placeholder="Type an email address..."
        />
      </div>

      {/* Max Tags Constraint */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Max Tags Limit (Max 5)
        </label>
        <TagsInput 
          maxTags={5} 
          defaultValue={["html", "css"]}
          placeholder="Add up to 5 tags..."
        />
      </div>
    </div>
  );
}
`;
