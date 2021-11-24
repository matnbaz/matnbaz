import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
} from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { SiDiscord, SiGithub, SiTelegram } from 'react-icons/si';
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
            <Link href="/help">
              <a>کمک به ایران فاس</a>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="">
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
            className="h-6 dark:bg-gray-400 bg-gray-500"
            style={{ width: '1px' }}
          />

          <div>
            <IconButton
              className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-800"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' && <BsFillMoonFill className="w-5 h-5" />}
              {theme === 'light' && <BsFillSunFill className="w-5 h-5" />}
            </IconButton>
          </div>
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
