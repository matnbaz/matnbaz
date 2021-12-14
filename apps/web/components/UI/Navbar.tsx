import { SOCIAL_MEDIA } from '@matnbaz/common';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { SiDiscord, SiOpensourceinitiative } from 'react-icons/si';
import Divider from './Divider';
import { IconButton } from './IconButton';
interface INavbarProps {
  className?: string;
}

const links: { name: string; to: string }[] = [
  { name: 'کاوش‌گر', to: '/explore' },
  { name: 'درباره', to: '/about' },
  { name: 'ثبت کاربر', to: '/submit-user' },
];

const Navbar = ({ className }: INavbarProps) => {
  const { setTheme, theme } = useTheme();
  const [atFirst, setAtFirst] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useScrollPosition(({ prevPos, currPos }) => {
    setAtFirst(currPos.y > -20);
  });
  useEffect(() => setMounted(true), []);
  return (
    <div
      className={classNames(
        !atFirst && 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm',
        'z-20 fixed w-full transition-colors',
        className
      )}
    >
      <div className="flex flex-col w-full max-w-[92rem] mx-auto py-6 px-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-8 space-x-reverse">
            <Link href="/">
              <a className="flex space-x-3 space-x-reverse items-center">
                <SiOpensourceinitiative className="w-10 h-10 dark:text-white text-gray-900" />

                <h2 className="text-2xl font-medium font-mono uppercase">
                  Matnbaz
                </h2>
              </a>
            </Link>
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {links.map((link) => (
                <div key={link.name}>
                  <Link href={link.to}>
                    <a>{link.name}</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="hidden md:block">
              {/* <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href="https://github.com/matnbaz"
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub className="w-5 h-5" />
              </IconButton> */}

              {/* <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href="https://t.me/matnbaz_net"
                target="_blank"
                rel="noreferrer"
              >
                <SiTelegram className="w-5 h-5" />
              </IconButton> */}

              <IconButton
                className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900"
                href={SOCIAL_MEDIA.discord}
                target="_blank"
                rel="noreferrer"
              >
                <SiDiscord className="w-5 h-5" />
              </IconButton>
            </div>

            <div
              className="h-6 dark:bg-gray-400 bg-gray-500 opacity-50 hidden md:block"
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
            <Fragment key={link.name}>
              <div>
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </div>
              {/* The last element can't have a divider so we check if it's not the last iteration */}
              {index < links.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
