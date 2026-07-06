export const progressBarUsageCode = `import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Example() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <ProgressBar label="Upload" value={68} showValue variant="default" />
      <ProgressBar label="Success" value={100} showValue variant="success" />
      <ProgressBar label="Loading" indeterminate variant="warning" />
      <ProgressBar label="Danger" value={35} showValue variant="danger" size="lg" />
    </div>
  );
}
`;
