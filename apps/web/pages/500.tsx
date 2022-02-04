import { links } from '@matnbaz/common';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { MainLayout } from '../components/Layout/MainLayout';
import { Button } from '../components/UI/Button/Button';
import { Divider } from '../components/UI/Divider';

const Error500Page: NextPage = () => {
  return (
    <MainLayout>
      <NextSeo title="خطای سرور" />
      <div className="flex flex-col items-center justify-center h-80">
        <h1 className="text-5xl font-bold">خطای سرور</h1>
        <span className="text-lg text-center text-secondary mt-4">
          خطایی از سمت سرور به وجود آمده است. می‌توانید این مشکل را از بخش
          مشکلات گیت‌هاب گزارش کنید.
        </span>
        <Divider className="my-6" />
        <div className="space-x-4 rtl:space-x-reverse">
          <Button.Primary
            target="_blank"
            href={`${links.githubRepo}/issues/new`}
          >
            گزارش خطا
          </Button.Primary>
          <Button.Outline href="/">خانه</Button.Outline>
        </div>
      </div>
    </MainLayout>
  );
};

export default Error500Page;
