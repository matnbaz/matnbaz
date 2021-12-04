import classNames from 'classnames';
import { Footer } from '../UI/Footer';
import Navbar from '../UI/Navbar';

interface IMainLayoutProps {
  children: React.ReactNode;
  maxWidth?: boolean;
}

export const MainLayout = ({ children, maxWidth = true }: IMainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar className="min-h-[5rem]" />
      <div
        className={classNames(
          maxWidth && 'max-w-[92rem]',
          'pt-24 mx-auto w-full'
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
