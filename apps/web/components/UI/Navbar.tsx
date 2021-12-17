import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { SiOpensourceinitiative } from 'react-icons/si';
import RepositorySearchInput from '../Repository/RepositorySearchInput';
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
  const { setTheme, resolvedTheme } = useTheme();
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
        atFirst &&
          'md:bg-transparent dark:md:bg-transparent md:backdrop-blur-none',
        'z-20 fixed w-full transition-colors backdrop-blur-sm bg-white/50 dark:bg-gray-900/50',
        className
      )}
    >
      <div className="flex flex-col w-full max-w-full md:max-w-[92rem] mx-auto py-3 md:py-6 px-2 md:px-8  space-y-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-8 space-x-reverse ml-4 md:ml-0">
            <Link href="/">
              <a className="flex space-x-3 space-x-reverse items-center">
                <SiOpensourceinitiative className="w-10 h-10 dark:text-white text-gray-900" />

                <h2 className="hidden md:block text-3xl font-mono">Matnbaz</h2>
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

          <div className="flex items-center space-x-4 space-x-reverse w-full md:w-auto">
            <div className="w-full md:w-auto">
              <RepositorySearchInput />
            </div>
            {mounted && (
              <div className="flex space-x-2 space-x-reverse items-center">
                <IconButton
                  className="dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-800"
                  onClick={() =>
                    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                  }
                >
                  {resolvedTheme === 'light' ? (
                    <BsFillSunFill className="w-5 h-5" />
                  ) : (
                    <BsFillMoonFill className="w-5 h-5" />
                  )}
                </IconButton>
                <IconButton
                  className="block md:hidden dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-800"
                  onClick={() => {
                    setMenuOpen((previousMenuOpen) => !previousMenuOpen);
                  }}
                >
                  {menuOpen ? (
                    <CgClose className="w-5 h-5" />
                  ) : (
                    <AiOutlineMenu className="w-5 h-5" />
                  )}
                </IconButton>
              </div>
            )}
          </div>
        </div>

        <div
          className={classNames(
            menuOpen ? 'block' : 'hidden',
            'md:hidden border-b border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700'
          )}
        >
          {links.map((link, index) => (
            <Fragment key={link.name}>
              <div className="py-4">
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
