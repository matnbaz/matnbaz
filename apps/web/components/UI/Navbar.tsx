import { useTheme } from 'next-themes';
import Link from 'next/link';
import { HiMoon, HiSun } from 'react-icons/hi';
import { OpenSource } from '../Icons/OpenSource';

interface INavbarProps {
  className?: string;
}

const Navbar = ({ className }: INavbarProps) => {
  const { setTheme, theme } = useTheme();
  return (
    <div
      className={`w-full bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-sm z-20 fixed ${
        className || ''
      }`}
    >
      <div className="flex max-w-[92rem] justify-between items-center py-6 px-8 mx-auto space-x-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link href="/">
            <a className="flex space-x-4 space-x-reverse items-center">
              <OpenSource className="w-10 h-10 dark:text-white text-gray-900" />

              <h2 className="text-2xl font-bold">IRAN FOSS</h2>
            </a>
          </Link>
          <div>
            <Link href="/explore">
              <a>کاوش</a>
            </Link>
          </div>
          <div>
            <Link href="/about">
              <a>درباره پروژه</a>
            </Link>
          </div>
          <div>
            <a
              target="_blank"
              href="https://discord.gg/5eGecDjFpj"
              rel="noreferrer"
            >
              انجمن دیسکورد
            </a>
          </div>
        </div>

        <a
          href="#"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="whitespace-nowrap inline-flex items-center justify-center px-2 py-2 rounded-full focus:ring focus:outline-none"
        >
          {theme === 'dark' && <HiMoon className="w-6 h-6" />}
          {theme === 'light' && <HiSun className="w-6 h-6" />}
        </a>
      </div>
    </div>
  );
};
export default Navbar;
