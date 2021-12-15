import Head from 'next/head';
import SubmitUserForm from '../components/Form/SubmitUserForm';
import MainLayout from '../components/Layout/MainLayout';
import Card from '../components/UI/Card';

export const submitUserMetaTags = {
  title: 'متن باز – ثبت کاربر',
  description:
    'در اینجا می توانید کاربران و گروه های ایرانی که می شناسید اما توسط سایت پیدا نشده را معرفی کنید.',
  image: '',
};

const SubmitUser = () => {
  return (
    <MainLayout>
      <Head>
        <title>{submitUserMetaTags.title}</title>
        <meta name="description" content={submitUserMetaTags.description} />
        <meta name="og:title" content={submitUserMetaTags.title} />
        <meta name="og:description" content={submitUserMetaTags.description} />
        <meta name="og:image" content={submitUserMetaTags.image} />
      </Head>

      <Card padded border="none" className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold">ثبت کاربر</h1>
        <SubmitUserForm />
      </Card>
    </MainLayout>
  );
};

export default SubmitUser;
