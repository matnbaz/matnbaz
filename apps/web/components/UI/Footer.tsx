import { SOCIAL_MEDIA } from '@iranfoss/common';
import Link from 'next/link';
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiOpensourceinitiative,
  SiTelegram,
} from 'react-icons/si';
import { IconButton } from './IconButton';

export type FooterProps = unknown;

export const Footer = (props: FooterProps) => {
  return (
    <div className="w-full mt-full py-6 px-3 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center space-x-4 space-x-reverse">
            <Link href="/">
              <a>
                <div className="flex space-x-4 space-x-reverse items-center font-mono">
                  <SiOpensourceinitiative className="w-8 h-8 dark:text-white text-gray-900" />
                  <h2 dir="ltr" className="text-xl uppercase">
                    Iran FOSS
                  </h2>
                </div>
              </a>
            </Link>

            <div
              className="h-6 dark:bg-gray-400 bg-gray-500 hidden md:block"
              style={{ width: '1px' }}
            />

            <div className="space-x-3 space-x-reverse flex items-center">
              <Link href="/about">
                <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm">
                  درباره
                </a>
              </Link>
              <a
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                href={'https://github.com/iranfoss/iranfoss'}
                target="_blank"
                rel="noreferrer"
              >
                سورس کد ایران فاس
              </a>
              <a
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                href={SOCIAL_MEDIA.discord}
                target="_blank"
                rel="noreferrer"
              >
                انجمن دیسکورد
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <IconButton
              href={SOCIAL_MEDIA.github}
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub className="w-5 h-5" />
            </IconButton>
            <IconButton
              href={SOCIAL_MEDIA.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <SiTelegram className="w-5 h-5" />
            </IconButton>
            <IconButton
              href={SOCIAL_MEDIA.discord}
              target="_blank"
              rel="noreferrer"
            >
              <SiDiscord className="w-5 h-5" />
            </IconButton>
            <IconButton
              href={SOCIAL_MEDIA.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <SiInstagram className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
