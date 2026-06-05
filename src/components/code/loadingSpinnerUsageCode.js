export const loadingSpinnerUsageCode = `import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";

export default function LoadingSpinnerDemo() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-sm">
      {/* Default Circle Spinner */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Default Loader
        </label>
        <LoadingSpinner />
      </div>

      {/* Different Variants */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Variants (Circle, Dots, Bars, Ping, Pulse)
        </label>
        <div className="flex items-center gap-6">
          <LoadingSpinner variant="circle" />
          <LoadingSpinner variant="dots" />
          <LoadingSpinner variant="bars" />
          <LoadingSpinner variant="ping" />
          <LoadingSpinner variant="pulse" />
        </div>
      </div>

      {/* Size and Color presets */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Sizing & Colors
        </label>
        <div className="flex items-center gap-4">
          <LoadingSpinner variant="circle" size="xs" color="rose" />
          <LoadingSpinner variant="circle" size="sm" color="amber" />
          <LoadingSpinner variant="circle" size="md" color="emerald" />
          <LoadingSpinner variant="circle" size="lg" color="indigo" />
          <LoadingSpinner variant="circle" size="xl" color="primary" />
        </div>
      </div>

      {/* Loading Spinners in Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Spinner inside Button
        </label>
        <div className="flex gap-4">
          <Button disabled>
            <LoadingSpinner size="sm" color="white" label="Loading..." labelPosition="right" />
          </Button>
          
          <Button variant="secondary" disabled>
            <LoadingSpinner size="sm" color="primary" label="Sending request" labelPosition="right" />
          </Button>
        </div>
      </div>
    </div>
  );
}
`;
