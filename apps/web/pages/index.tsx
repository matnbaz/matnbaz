import MainLayout from '../components/Layouts/MainLayout';
import Button from '../components/UI/Button/Button';

const Index = () => {
  return (
    <MainLayout>
      <div className="pt-20">
        <div>
          <h1 className="font-bold text-7xl text-center">
            <span className="text-primary-500">تمام</span> پروژه های متن باز{' '}
            <span className="text-primary-500">ایرانی</span>، در یک جا
          </h1>
        </div>

        <div className="mt-24">
          <div className="flex justify-center space-x-6 space-x-reverse">
            <Button.Primary href="/explore" size="xl">
              برو به کاوش‌گر
            </Button.Primary>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
