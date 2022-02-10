import { links } from '@matnbaz/common';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiTelegram,
  SiTwitter,
} from 'react-icons/si';
import { MatnbazLogo } from '../Icons/MatnbazLogo';
import { IconButton } from './IconButton';

export type FooterProps = unknown;

export const Footer = (props: FooterProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full mt-full py-6 px-3 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center space-x-4 rtl:space-x-reverse">
            <Link href="/">
              <a>
                <div className="flex space-x-2 rtl:space-x-reverse items-center">
                  <MatnbazLogo className="w-8 h-8 dark:text-white text-gray-900" />
                  <h2 className="text-2xl font-extrabold ltr:mt-0.5 ltr:-mb-0.5">
                    {t('site-name')}
                  </h2>
                </div>
              </a>
            </Link>

            <div
              className="h-6 dark:bg-gray-400 bg-gray-500 hidden md:block"
              style={{ width: '1px' }}
            />

            <div className="space-x-3 rtl:space-x-reverse flex items-center">
              <div>
                <Link href="/about">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm">
                    {t('footer.about')}
                  </a>
                </Link>
              </div>

              <div>
                <Link href="/support">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm">
                    {t('footer.support')}
                  </a>
                </Link>
              </div>

              <div>
                <Link href="/faq">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm">
                    {t('footer.faq')}
                  </a>
                </Link>
              </div>

              <div>
                <a
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                  href={links.githubRepo}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('footer.source-code')}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <IconButton href={links.github} target="_blank" rel="noreferrer">
              <SiGithub className="w-4 h-4" />
            </IconButton>
            <IconButton href={links.telegram} target="_blank" rel="noreferrer">
              <SiTelegram className="w-4 h-4" />
            </IconButton>
            <IconButton href={links.discord} target="_blank" rel="noreferrer">
              <SiDiscord className="w-4 h-4" />
            </IconButton>
            <IconButton href={links.twitter} target="_blank" rel="noreferrer">
              <SiTwitter className="w-4 h-4" />
            </IconButton>
            <IconButton href={links.instagram} target="_blank" rel="noreferrer">
              <SiInstagram className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
