import classNames from 'classnames';
import { HiHeart } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

export interface BannerProps {
  text?: string;
  mobile?: string;
  url?: string;
  cta?: string;
  icon?: IconType;
  theme?: 'primary' | 'red';
  onDismiss?: () => unknown;
  className?: string;
}

const bannerThemes = {
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
};

export const Banner = ({
  text,
  mobile,
  cta = 'اطلاعات بیشتر',
  url,
  icon: Icon,
  theme = 'primary',
  onDismiss,
  className,
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
                <HiHeart className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="mr-3 font-medium text-white truncate">
                <span className="md:hidden">{mobile || text}</span>
                <span className="hidden md:inline">{text}</span>
              </p>
            </div>
            {url && (
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href={url}
                  className={classNames(
                    'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium',
                    bannerThemes[theme].button
                  )}
                >
                  {cta}
                </a>
              </div>
            )}
            <div className="order-2 flex-shrink-0 sm:order-3 sm:mr-3">
              <button
                onClick={() => onDismiss && onDismiss()}
                type="button"
                className={classNames(
                  '-ml-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-ml-2',
                  bannerThemes[theme].dismiss
                )}
              >
                <span className="sr-only">رد کردن</span>
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
