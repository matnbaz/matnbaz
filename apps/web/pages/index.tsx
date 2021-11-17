import Button from '../components/UI/Button';
import { useTheme } from 'next-themes';
import Card from '../components/UI/Card';
import { HiStar } from 'react-icons/hi';
export function Index() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-8 py-3 grid grid-cols-3 gap-2">
      {' '}
      <Card>
        <div className="flex space-x-3 space-x-reverse self-end justify-end">
          <div className="flex flex-col space-y-2 h-full items-end">
            <h1 className="text-3xl font-semibold">facebook/react</h1>
            <span className="opacity-70 max-w-sm font-thin" dir="ltr">
              A declarative, efficient, and flexible JavaScript library for
              building user interfaces.
            </span>
          </div>
          <img
            src="https://avatars.githubusercontent.com/u/69631?v=4"
            className="w-28 h-28 rounded-lg"
          />
        </div>
        <HiStar className="w-4 h-4" />
      </Card>{' '}
      <br />
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle
      </Button>
    </div>
  );
}

export default Index;
