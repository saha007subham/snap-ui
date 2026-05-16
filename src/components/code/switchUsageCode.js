export const switchUsageCode = `import { Switch } from "@/components/ui/Switch";

export default function SwitchExample() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center space-x-3">
        <Switch id="airplane-mode" />
        <label
          htmlFor="airplane-mode"
          className="text-sm font-medium leading-none text-slate-900 dark:text-white cursor-pointer select-none"
        >
          Airplane Mode
        </label>
      </div>

      <div className="flex items-center space-x-3">
        <Switch id="disabled-switch" disabled />
        <label
          htmlFor="disabled-switch"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed select-none"
        >
          Disabled
        </label>
      </div>
      
      <div className="flex items-center space-x-3">
        <Switch id="checked-disabled-switch" disabled defaultChecked />
        <label
          htmlFor="checked-disabled-switch"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed select-none"
        >
          Checked and Disabled
        </label>
      </div>
    </div>
  );
}
`;
