export const inputUsageCode = `import { Input } from "@/components/ui/Input";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Email
        </label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <label htmlFor="disabled" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Disabled
        </label>
        <Input disabled type="text" id="disabled" placeholder="Disabled input" />
      </div>

      <div className="space-y-2">
        <label htmlFor="picture" className="text-sm font-medium leading-none text-slate-900 dark:text-white">
          Picture
        </label>
        <Input id="picture" type="file" className="cursor-pointer" />
      </div>
    </div>
  );
}
`;
