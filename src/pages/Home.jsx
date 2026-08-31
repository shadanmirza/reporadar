import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

export default function Home() {
  return (
    <div className="p-8 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">UI Components Test</h1>
      
      <div className="flex gap-2 flex-wrap">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </div>

      <Card>
        <h3 className="font-bold mb-2">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-400">This is a card component.</p>
      </Card>

      <Input placeholder="Type something..." label="Search" />

      <div className="flex gap-2">
        <Badge variant="blue">React</Badge>
        <Badge variant="green">JavaScript</Badge>
        <Badge variant="purple">TypeScript</Badge>
      </div>
    </div>
  );
}