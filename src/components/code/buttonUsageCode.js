export const buttonUsageCode = `import { Button } from "@/components/ui/Button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Variants */}
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      
      {/* Sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Disabled */}
      <div className="flex flex-wrap items-center gap-4">
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
`;
