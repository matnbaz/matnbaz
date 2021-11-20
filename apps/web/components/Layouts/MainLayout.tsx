import Header from '../UI/Header';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header className="h-20" />
      <div className="pt-24 w-full">{children}</div>
    </>
  );
};

export default MainLayout;
