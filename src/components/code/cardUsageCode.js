export const cardUsageCode = `import { Card } from "@/components/ui/Card";

export default function Example() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        This is a simple card description.
      </Card.Body>
      <Card.Footer>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm cursor-pointer">
          Action
        </button>
      </Card.Footer>
    </Card>
  );
}
`;
