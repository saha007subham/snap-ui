export const radioButtonUsageCode = `import { RadioButton } from "@/components/ui/RadioButton";

export default function RadioButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Default */}
      <div className="flex items-center space-x-2">
        <RadioButton id="radio-1" name="demo-radio" defaultChecked />
        <label
          htmlFor="radio-1"
          className="text-sm font-medium leading-none text-slate-900 dark:text-white cursor-pointer"
        >
          Option 1
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioButton id="radio-2" name="demo-radio" />
        <label
          htmlFor="radio-2"
          className="text-sm font-medium leading-none text-slate-900 dark:text-white cursor-pointer"
        >
          Option 2
        </label>
      </div>

      {/* Disabled */}
      <div className="flex items-center space-x-2">
        <RadioButton id="radio-disabled" disabled />
        <label
          htmlFor="radio-disabled"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed"
        >
          Disabled radio
        </label>
      </div>

      {/* Checked & Disabled */}
      <div className="flex items-center space-x-2">
        <RadioButton id="radio-checked-disabled" disabled defaultChecked />
        <label
          htmlFor="radio-checked-disabled"
          className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500 cursor-not-allowed"
        >
          Checked and Disabled
        </label>
      </div>
    </div>
  );
}
`;
