import Button from '../components/UI/Button';
import { useTheme } from 'next-themes';
import Card from '../components/UI/Card';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import RepositoryPreview from '../components/Repository/RepositoryPreview';
export function Index() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-8 py-3 grid grid-cols-2 gap-2">
      <RepositoryPreview />
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle
      </Button>
    </div>
  );
}

export default Index;
