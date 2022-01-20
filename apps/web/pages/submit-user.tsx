import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { SubmitUserForm } from '../components/Form/SubmitUserForm';
import { MainLayout } from '../components/Layout/MainLayout';
import { PageHeader } from '../components/Layout/PageHeader';
import { Card } from '../components/UI/Card';

const SubmitUser: NextPage = () => {
  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="ثبت کاربر"
        description="در اینجا می توانید کاربران و گروه های ایرانی که می شناسید اما توسط سایت پیدا نشده را معرفی کنید."
      />
      <PageHeader title="ثبت کاربر" />
      <Card border="none" className="max-w-lg mx-auto">
        <SubmitUserForm />
      </Card>
    </MainLayout>
  );
};

export default SubmitUser;
