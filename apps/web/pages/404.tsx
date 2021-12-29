import HeaderMeta from '../components/Feature/HeaderMeta';
import MainLayout from '../components/Layout/MainLayout';
import Button from '../components/UI/Button/Button';
import Divider from '../components/UI/Divider';

export default function Custom404() {
  return (
    <MainLayout>
      <HeaderMeta title="یافت نشد - متن‌باز" />

      <div className="flex flex-col items-center justify-center h-80">
        <h1 className="text-5xl font-bold">یافت نشد</h1>
        <span className="text-lg text-center text-secondary mt-4">
          صفحه‌ای که دنبال آن هستید وجود ندارد یا پاک شده است.
        </span>
        <Divider className="my-6" />
        <Button.Primary href="/">برو به خانه</Button.Primary>
      </div>
    </MainLayout>
  );
}
