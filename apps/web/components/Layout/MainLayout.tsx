import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { Banner } from '../UI/Banner';
import { Footer } from '../UI/Footer';
import Navbar from '../UI/Navbar';

interface IMainLayoutProps {
  children: React.ReactNode;
  maxWidth?: boolean;
  withoutFooter?: boolean;
  withoutPadding?: boolean;
}

const DISMISS_SUPPORT_BANNER = 'DISMISS_SUPPORT_BANNER';
const TIME_BEFORE_BANNER_APPEARS = 20000;

export const MainLayout = ({
  children,
  maxWidth = true,
  withoutFooter = false,
  withoutPadding = false,
}: IMainLayoutProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [timeoutTimer, setTimeoutTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!localStorage.getItem(DISMISS_SUPPORT_BANNER) && !timeoutTimer) {
      setTimeoutTimer(
        setTimeout(() => setShowBanner(true), TIME_BEFORE_BANNER_APPEARS)
      );
    }
  }, []);

  const dismissBanner = useCallback(() => {
    localStorage.setItem(DISMISS_SUPPORT_BANNER, 'true');
    setShowBanner(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar className="min-h-[5rem]" />
      <div
        className={classNames(
          maxWidth && 'max-w-[92rem]',
          !withoutPadding && 'pt-24 pb-6 px-6',
          'mx-auto w-full'
        )}
      >
        {children}
      </div>

      <div className="fixed inset-x-0 bottom-0">
        <Transition
          show={showBanner}
          enter="transition duration-700 ease-in-out"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition duration-400 ease-in-out"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Banner
            text="کمک (غیر مالی یا مالی) شما برای متن‌باز خیلی ارزش دارد."
            mobile="کمک شما برای متن‌باز خیلی ارزش دارد."
            icon={HiX}
            url="/about#کمک-و-حمایت"
            cta="اطلاعات بیشتر"
            theme="red"
            onDismiss={() => dismissBanner()}
          />
        </Transition>
      </div>

      <div>
        {!withoutFooter && <Footer />}
        {showBanner && <Banner icon={HiX} theme="red" className="invisible" />}
      </div>
    </div>
  );
};

export default MainLayout;
