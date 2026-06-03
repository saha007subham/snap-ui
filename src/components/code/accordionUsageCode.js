export const accordionUsageCode = `import { Accordion } from "@/components/ui/Accordion";

export default function AccordionDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It uses Framer Motion to smoothly animate height transitions.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Trigger>Can it open multiple items?</Accordion.Trigger>
          <Accordion.Content>
            Yes. Simply change the type attribute to "multiple" on the root component.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
`;
