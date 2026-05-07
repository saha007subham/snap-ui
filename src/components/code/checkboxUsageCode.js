export const checkboxUsageCode = `import { CheckBox } from "@/components/ui/CheckBox";

export default function CheckBoxDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Default */}
      <div className="flex items-center space-x-2">
        <CheckBox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none text-slate-900 dark:text-white cursor-pointer"
        >
          Accept terms and conditions
        </label>
      </div>

      {/* Disabled */}
      <div className="flex items-center space-x-2">
        <CheckBox id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed"
        >
          Disabled checkbox
        </label>
      </div>

      {/* Checked & Disabled */}
      <div className="flex items-center space-x-2">
        <CheckBox id="checked-disabled" disabled defaultChecked />
        <label
          htmlFor="checked-disabled"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed"
        >
          Checked and Disabled
        </label>
      </div>
    </div>
  );
}
`;
