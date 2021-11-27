import Navbar from '../UI/Navbar';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Navbar className="h-20" />
      <div className="pt-24 mx-auto">{children}</div>
    </>
  );
};

export default MainLayout;
