import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { SiDiscord, SiGithub, SiTelegram } from 'react-icons/si';
import { OpenSource } from '../Icons/OpenSource';
import { AiOutlineMenu } from 'react-icons/ai';
import Divider from './Divider';
interface INavbarProps {
  className?: string;
}

const links: { name: string; to: string }[] = [
  { name: 'کاوش', to: '/explore' },
  { name: 'درباره پروژه', to: '/about' },
  { name: 'کمک به ایران فاس', to: '/help' },
];

const Navbar = ({ className }: INavbarProps) => {
  const { setTheme, theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div
      className={`z-20 fixed w-full bg-gray-100/30 dark:bg-gray-800/70 backdrop-blur-sm  ${
        className || ''
      }`}
    >
      <div className="flex flex-col w-full max-w-[92rem] mx-auto py-6 px-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/">
              <a className="flex space-x-4 space-x-reverse items-center">
                <OpenSource className="w-10 h-10 dark:text-white text-gray-900" />

                <h2 className="text-2xl font-bold">IRAN FOSS</h2>
              </a>
            </Link>
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {links.map((link) => (
                <div>
                  <Link href={link.to}>
                    <a>{link.name}</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="hidden md:block">
              <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href="https://github.com/iranfoss"
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub className="w-5 h-5" />
              </IconButton>

              <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href="https://t.me/iran_foss"
                target="_blank"
                rel="noreferrer"
              >
                <SiTelegram className="w-5 h-5" />
              </IconButton>

              <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href="https://discord.gg/5eGecDjFpj"
                target="_blank"
                rel="noreferrer"
              >
                <SiDiscord className="w-5 h-5" />
              </IconButton>
            </div>

            <div
              className="h-6 dark:bg-gray-400 bg-gray-500 hidden md:block"
              style={{ width: '1px' }}
            />

            {mounted && (
              <div className="flex space-x-2 space-x-reverse items-center">
                <IconButton
                  className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-800"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' && <BsFillMoonFill className="w-5 h-5" />}
                  {theme === 'light' && <BsFillSunFill className="w-5 h-5" />}
                </IconButton>
                <button
                  className="block md:hidden"
                  onClick={() => {
                    setMenuOpen((previousMenuOpen) => !previousMenuOpen);
                  }}
                >
                  <AiOutlineMenu className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={classNames(
            menuOpen ? 'block' : 'hidden',
            'space-y-6 md:hidden'
          )}
        >
          {links.map((link, index) => (
            <>
              <div>
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </div>
              {/* The last element can't have a divider so we check if it's not the last iteration */}
              {index < links.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  rel?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
}
const IconButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<IconButtonProps>) => {
  const Component = props.href ? 'a' : 'button';
  return (
    <Component
      {...props}
      className={classNames(
        className,
        'whitespace-nowrap inline-flex items-center justify-center px-2 py-2 rounded-full focus:ring focus:outline-none'
      )}
    >
      {children}
    </Component>
  );
};
