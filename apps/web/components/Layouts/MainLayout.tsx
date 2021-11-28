import classNames from 'classnames';
import Navbar from '../UI/Navbar';

interface IMainLayoutProps {
  children: React.ReactNode;
  maxWidth?: boolean;
}

const MainLayout = ({ children, maxWidth = true }: IMainLayoutProps) => {
  return (
    <>
      <Navbar className="min-h-[5rem]" />
      <div className={classNames(maxWidth && 'max-w-[92rem]', 'pt-24 mx-auto')}>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
