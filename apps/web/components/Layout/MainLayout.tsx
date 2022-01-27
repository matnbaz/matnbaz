import classNames from 'classnames';
import { PromotionBanner } from '../Banner/PromotionBanner';
import { Footer } from '../UI/Footer';
import { Navbar } from '../UI/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  maxWidth?: boolean;
  withoutFooter?: boolean;
  withoutPadding?: boolean;
  withFooterPromo?: boolean;
}

const DISMISS_SUPPORT_BANNER = 'DISMISS_SUPPORT_BANNER';
const TIME_BEFORE_BANNER_APPEARS = 800000;

export const MainLayout = ({
  children,
  maxWidth = true,
  withoutFooter = false,
  withoutPadding = false,
  withFooterPromo = false,
}: MainLayoutProps) => {
  // const [showBanner, setShowBanner] = useState(false);
  // const [timeoutTimer, setTimeoutTimer] = useState<Timer>();

  // useEffect(() => {
  //   if (localStorage.getItem(DISMISS_SUPPORT_BANNER) || timeoutTimer) return;

  //   const timer = new Timer(
  //     () => setShowBanner(true),
  //     TIME_BEFORE_BANNER_APPEARS
  //   );
  //   setTimeoutTimer(timer);
  //   const onVisibilityChange = () =>
  //     timer.isPaused() ? timer.resume() : timer.pause();

  //   document.addEventListener('visibilitychange', onVisibilityChange);
  //   return () => {
  //     timer.pause();
  //     document.removeEventListener('visibilitychange', onVisibilityChange);
  //   };
  // }, []);

  // const dismissBanner = useCallback(() => {
  //   localStorage.setItem(DISMISS_SUPPORT_BANNER, 'true');
  //   setShowBanner(false);
  // }, []);

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

      {/* <div className="fixed inset-x-0 bottom-0 z-20">
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
      </div> */}

      <div>
        {!withoutFooter && (
          <>
            {withFooterPromo && (
              <PromotionBanner className="max-w-6xl mx-auto rounded-t-3xl overflow-hidden" />
            )}
            <Footer />
          </>
        )}
        {/* {showBanner && <Banner icon={HiX} theme="red" className="invisible" />} */}
      </div>
    </div>
  );
};
