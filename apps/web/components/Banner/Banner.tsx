import classNames from 'classnames';
import { HiX } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

enum BannerTheme {
  primary = 'primary',
  red = 'red',
  instagram = 'instagram',
  telegram = 'telegram',
  twitter = 'twitter',
  discord = 'discord',
  github = 'github',
}

const bannerThemes: Record<
  BannerTheme,
  { bg: string; iconContainer: string; button: string; dismiss: string }
> = {
  primary: {
    bg: 'bg-primary-600',
    iconContainer: 'bg-primary-800',
    button: 'text-primary-600 bg-white hover:bg-primary-50',
    dismiss: 'hover:bg-primary-500',
  },

  red: {
    bg: 'bg-red-600',
    iconContainer: 'bg-red-800',
    button: 'text-red-600 bg-white hover:bg-red-50',
    dismiss: 'hover:bg-red-500',
  },

  instagram: {
    bg: 'bg-[#E4405F]',
    iconContainer: 'bg-[#CF1D3F]',
    button: 'text-[#E4405F] bg-white hover:bg-[#FBE1E6]',
    dismiss: 'hover:bg-[#E4405F]',
  },

  telegram: {
    bg: 'bg-[#26A5E4]',
    iconContainer: 'bg-[#1784BB]',
    button: 'text-[#1784BB] bg-white hover:bg-[#C9E9F8]',
    dismiss: 'hover:bg-[#26A5E4]',
  },

  twitter: {
    bg: 'bg-[#1DA1F2]',
    iconContainer: 'bg-[#063E61]',
    button: 'text-[#0C82CB] bg-white hover:bg-[#CBE9FC]',
    dismiss: 'hover:bg-[#1DA1F2]',
  },

  discord: {
    bg: 'bg-[#5865F2]',
    iconContainer: 'bg-[#0C1796]',
    button: 'text-[#2435EE] bg-white hover:bg-[#EFF1FE]',
    dismiss: 'hover:bg-[#5865F2]',
  },

  github: {
    bg: 'bg-[#000000]',
    iconContainer: 'bg-[#181717]',
    button: 'text-[#181717] bg-white hover:bg-[#767171]',
    dismiss: 'hover:bg-[#000000]',
  },
};

export interface BannerProps {
  text?: string;
  mobile?: string;
  url?: string;
  openOnNewTab?: boolean;
  cta?: string;
  icon?: IconType;
  theme?: keyof typeof BannerTheme;
  onDismiss?: () => unknown;
  className?: string;
}

export const Banner = ({
  text,
  mobile,
  cta = 'اطلاعات بیشتر',
  url,
  icon: Icon,
  theme = 'primary',
  onDismiss,
  className,
  openOnNewTab = false,
}: BannerProps) => {
  return (
    <div className={className}>
      <div className={bannerThemes[theme].bg}>
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span
                className={classNames(
                  'flex p-2 rounded-lg',
                  bannerThemes[theme].iconContainer
                )}
              >
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="mr-3 font-medium text-white truncate">
                <span className="md:hidden">{mobile || text}</span>
                <span className="hidden md:inline">{text}</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              {url && (
                <a
                  href={url}
                  target={openOnNewTab && '_blank'}
                  className={classNames(
                    'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium',
                    bannerThemes[theme].button
                  )}
                >
                  {cta}
                </a>
              )}
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:mr-3">
              <button
                onClick={() => onDismiss && onDismiss()}
                type="button"
                className={classNames(
                  '-ml-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-ml-2',
                  bannerThemes[theme].dismiss,
                  !onDismiss && 'invisible sm:hidden'
                )}
              >
                <span className="sr-only">رد کردن</span>
                <HiX className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
