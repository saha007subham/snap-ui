export const starRatingUsageCode = `import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";

export default function StarRatingDemo() {
  const [rating, setRating] = useState(3.5);

  return (
    <div className="flex flex-col gap-8 w-full max-w-sm">
      {/* Default Interactive Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Standard Rating
        </label>
        <StarRating defaultValue={3} />
      </div>

      {/* Half Stars Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Supports Half Stars (allowHalf)
        </label>
        <StarRating 
          allowHalf 
          value={rating} 
          onChange={setRating} 
          showTooltip 
        />
        <div className="text-xs text-slate-500">Selected rating: {rating}</div>
      </div>

      {/* Customized Size & Colors */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Custom Colors and Sizes
        </label>
        <div className="flex flex-wrap gap-4 items-center">
          <StarRating size="sm" color="emerald" defaultValue={4} />
          <StarRating size="lg" color="rose" defaultValue={5} />
        </div>
      </div>

      {/* Read Only with Tooltips */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Read-Only with Custom Tooltips
        </label>
        <StarRating 
          readOnly 
          allowHalf 
          defaultValue={4.5} 
          showTooltip 
          tooltips={["Very Bad", "Bad", "Good", "Excellent", "Spectacular"]} 
        />
      </div>
    </div>
  );
}
`;
