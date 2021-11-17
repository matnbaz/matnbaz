import Button from '../components/UI/Button';

export function Index() {
  return (
    <div className="p-5 block space-x-2 space-x-reverse">
      <Button size="sm">تست</Button>
      <Button size="md">تست</Button>
      <Button size="lg" variant="secondary">
        تست
      </Button>
      <Button size="xl" href="/google.com">
        تست
      </Button>
    </div>
  );
}

export default Index;
