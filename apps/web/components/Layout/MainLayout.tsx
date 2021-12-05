import classNames from 'classnames';
import { Footer } from '../UI/Footer';
import Navbar from '../UI/Navbar';

interface IMainLayoutProps {
  children: React.ReactNode;
  maxWidth?: boolean;
  withoutFooter?: boolean;
  withoutPadding?: boolean;
}

export const MainLayout = ({
  children,
  maxWidth = true,
  withoutFooter = false,
  withoutPadding = false,
}: IMainLayoutProps) => {
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
      {!withoutFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
