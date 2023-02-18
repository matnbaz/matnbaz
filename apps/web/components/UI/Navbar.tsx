import { Popover, Transition } from '@headlessui/react';
import { links as matnbazLinks } from 'common';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { HiChevronDown, HiOfficeBuilding, HiUsers } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { MatnbazLogo } from '../Icons/MatnbazLogo';
import { IconButton } from './IconButton';
import { LocaleSelector } from './LocaleSelector';
export interface NavbarProps {
  className?: string;
}

interface BasicLink {
  name: string;
  type: 'link';
  languagesScope?: string[];
  pinging?: boolean;
  href: string;
  external?: boolean;
}

interface Flyout {
  name: string;
  type: 'flyout';
  languagesScope?: string[];
  pinging?: boolean;
  size: 'small' | 'normal';
  flyout: {
    links: Array<
      BasicLink & {
        description?: string;
        isNew?: boolean;
        icon?: IconType;
      }
    >;
    footerLinks?: Array<
      BasicLink & {
        description?: string;
        isNew?: boolean;
      }
    >;
  };
}

const shouldPing = (key: string) => {
  if (typeof localStorage === 'undefined') return false;
  return !localStorage.getItem(`PING_DISMISSED:${key}`);
};

const dismissPing = (key: string) => {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.setItem(`PING_DISMISSED:${key}`, 'true');
};

type LinkItem = BasicLink | Flyout;

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation('common');
  const { setTheme, resolvedTheme } = useTheme();
  const [atFirst, setAtFirst] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    setAtFirst(currPos.y > -20);
  });

  useEffect(() => setMounted(true), []);
  const { pathname, locale } = useRouter();

  const links = useMemo<LinkItem[]>(() => {
    const _links: LinkItem[] = [
      { type: 'link', name: t('navbar.home'), href: '/' },
      {
        type: 'link',
        name: t('navbar.explore'),
        href: '/explore',
      },
      {
        type: 'link',
        name: t('navbar.collections'),
        href: '/collections',
      },
      {
        type: 'flyout',
        name: t('navbar.statistics'),
        size: 'normal',
        flyout: {
          links: [
            {
              type: 'link',
              icon: HiUsers,
              name: t('navbar.github-users'),
              description: t('navbar.github-users-description'),
              href: '/github/users',
            },
            {
              type: 'link',
              icon: HiOfficeBuilding,
              name: t('navbar.github-organizations'),
              description: t('navbar.github-organizations-description'),
              href: '/github/organizations',
            },
          ],
        },
      },
      {
        type: 'link',
        name: t('navbar.blog'),
        href: '/blog',
      },
      // {
      //   type: 'link',
      //   name: t('navbar.support'),
      //   href: '/support',
      //   pinging: true,
      // },
      {
        type: 'flyout',
        name: t('navbar.more'),
        size: 'small',
        flyout: {
          links: [
            {
              type: 'link',
              name: t('navbar.about'),
              href: '/about',
            },
            {
              type: 'link',
              name: t('navbar.faq'),
              href: '/faq',
            },
            {
              type: 'link',
              name: t('navbar.submit-user'),
              href: '/submit-user',
            },
            {
              type: 'link',
              name: t('navbar.discord-community'),
              href: matnbazLinks.discord,
              external: true,
            },
            {
              type: 'link',
              name: t('navbar.source-code'),
              href: matnbazLinks.github,
              external: true,
            },
            {
              type: 'link',
              name: t('navbar.roadmap'),
              href: matnbazLinks.githubRoadmap,
              external: true,
            },
            {
              type: 'link',
              name: t('navbar.visual-identity'),
              href: matnbazLinks.visualIdentity,
              external: true,
            },
          ],
        },
      },
    ];

    const filterByLocale = (linksToFilter: any[]) =>
      linksToFilter.filter(
        (link) =>
          typeof link.languagesScope === 'undefined' ||
          link.languagesScope.includes(locale)
      );

    return filterByLocale(_links).map((link) =>
      link.type === 'flyout'
        ? {
            ...link,
            flyout: {
              ...link.flyout,
              links: filterByLocale(link.flyout.links),
            },
          }
        : link
    );
  }, [locale, t]);

  return (
    <div
      className={classNames(
        atFirst &&
          'md:bg-transparent dark:md:bg-transparent md:backdrop-blur-none',
        'z-30 fixed w-full transition-colors backdrop-blur-sm bg-white/60 dark:bg-gray-900/60',
        className
      )}
    >
      <div className="flex flex-col w-full max-w-full md:max-w-[92rem] mx-auto py-3 md:py-6 px-2 md:px-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex space-x-8 rtl:space-x-reverse ltr:mr-4 ltr:md:mr-0 rtl:ml-4 rtl:md:ml-0">
            <Link href="/">
              <a className="flex space-x-3 rtl:space-x-reverse">
                <MatnbazLogo className="w-10 h-10 dark:text-white text-gray-900" />

                <h2 className="hidden md:block text-3xl font-extrabold ltr:mt-0.5 ltr:-mb-0.5">
                  {t('site-name')}
                </h2>
              </a>
            </Link>
            <div className="hidden md:flex items-center flex-wrap space-x-4 rtl:space-x-reverse">
              {links.map((link) => (
                <div key={link.name} className="my-2">
                  {link.type === 'link' && (
                    <Link href={link.href}>
                      <a
                        onClick={() => link.pinging && dismissPing(link.href)}
                        className={classNames(
                          pathname === link.href
                            ? 'text-black dark:text-white font-bold'
                            : 'text-secondary',
                          'hover:text-black dark:hover:text-white relative'
                        )}
                        target={link.external ? '_blank' : ''}
                      >
                        {link.pinging && shouldPing(link.href) && (
                          <span className="flex h-2 w-2 absolute top-0 ltr:left-full rtl:right-full">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                        {link.name}
                      </a>
                    </Link>
                  )}
                  {link.type === 'flyout' && (
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'text-black dark:text-white font-bold'
                                : 'text-secondary',
                              'flex group hover:text-black dark:hover:text-white'
                            )}
                          >
                            <span>{link.name}</span>
                            <HiChevronDown
                              className={classNames(
                                open
                                  ? 'text-black dark:text-white font-bold'
                                  : 'text-secondary',
                                'ltr:ml-1 rtl:mr-1 h-5 w-5 group-hover:text-black dark:group-hover:text-white'
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className={classNames(
                                'absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen sm:px-0',
                                link.size === 'normal' && 'max-w-md',
                                link.size === 'small' && 'max-w-[14rem]'
                              )}
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
                                <div
                                  className={classNames(
                                    'relative grid bg-white dark:bg-gray-900',
                                    link.size === 'normal' &&
                                      'gap-6 px-5 py-6 sm:gap-8 sm:p-8',
                                    link.size === 'small' &&
                                      'gap-3 px-2.5 py-3 sm:gap-2'
                                  )}
                                >
                                  {link.flyout.links.map((item) => (
                                    <Link href={item.href} key={item.name}>
                                      <a
                                        className={classNames(
                                          'flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition ease-in-out duration-150',
                                          link.size === 'normal' && '-m-3 p-3',
                                          link.size === 'small' && 'p-2'
                                        )}
                                        target={item.external ? '_blank' : ''}
                                      >
                                        {item.icon && (
                                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white sm:h-12 sm:w-12">
                                            <item.icon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </div>
                                        )}
                                        <div className="ltr:ml-4 rtl:mr-4">
                                          <p
                                            className={classNames(
                                              'text-base',
                                              link.size === 'normal' &&
                                                'font-medium'
                                            )}
                                          >
                                            {item.name}
                                          </p>
                                          {item.description && (
                                            <p className="mt-1 text-sm text-secondary">
                                              {item.description}
                                            </p>
                                          )}
                                        </div>
                                      </a>
                                    </Link>
                                  ))}
                                </div>
                                {link.flyout.footerLinks && (
                                  <div className="p-5 bg-gray-50 dark:bg-gray-800 sm:p-8 space-y-5">
                                    {link.flyout.footerLinks.map((item) => (
                                      <Link href={item.href} key={item.name}>
                                        <a
                                          target={item.external ? '_blank' : ''}
                                          className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ease-in-out duration-150"
                                        >
                                          <span className="flex items-center">
                                            <span className="text-base font-medium">
                                              {item.name}
                                            </span>
                                            {item.isNew && (
                                              <span className="ltr:ml-3 rtl:mr-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-primary-100 text-primary-800">
                                                New
                                              </span>
                                            )}
                                          </span>
                                          <span className="mt-1 block text-sm text-secondary">
                                            {item.description}
                                          </span>
                                        </a>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse md:w-auto">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <LocaleSelector />
              {mounted && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={classNames(
            menuOpen ? 'block' : 'hidden',
            'md:hidden divide-y divide-gray-100 dark:divide-gray-700 max-h-[80vh] overflow-y-auto'
          )}
        >
          {links.map((link, index) => (
            <Fragment key={link.name}>
              {link.type === 'link' && (
                <div className="py-4">
                  <Link href={link.href}>
                    <a target={link.external ? '_blank' : ''}>{link.name}</a>
                  </Link>
                </div>
              )}{' '}
              {link.type === 'flyout' &&
                link.flyout.links.map((link) => (
                  <div className="py-4" key={link.name}>
                    <Link href={link.href}>
                      <a target={link.external ? '_blank' : ''}>{link.name}</a>
                    </Link>
                  </div>
                ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
