export const checkboxCardUsageCode = `import { CheckboxCard } from "@/components/ui/CheckboxCard";

export default function CheckboxCardDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <CheckboxCard 
        title="Standard Plan" 
        description="$10/month. Includes basic features."
        name="plan"
        value="standard"
      />
      <CheckboxCard 
        title="Pro Plan" 
        description="$20/month. Includes advanced features and priority support."
        name="plan"
        value="pro"
        defaultChecked
      />
      <CheckboxCard 
        title="Enterprise Plan" 
        description="Contact sales for custom pricing."
        disabled
      />
    </div>
  );
}
`;
