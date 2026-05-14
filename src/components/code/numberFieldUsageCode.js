export const numberFieldUsageCode = `import { NumberField } from "@/components/ui/NumberField";

export default function NumberFieldDemo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* Default */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Quantity
        </label>
        <NumberField defaultValue={1} min={0} max={10} />
      </div>

      {/* Disabled */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium leading-none text-slate-500 dark:text-slate-500">
          Disabled Quantity
        </label>
        <NumberField defaultValue={5} disabled />
      </div>
    </div>
  );
}
`;
