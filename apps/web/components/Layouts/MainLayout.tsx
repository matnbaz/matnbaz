import Navbar from '../UI/Header';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Navbar className="h-20" />
      <div className="pt-20 max-w-[92rem] mx-auto">{children}</div>
    </>
  );
};

export default MainLayout;
