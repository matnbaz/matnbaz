import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import SubmitUserForm from '../components/Form/SubmitUserForm';
import MainLayout from '../components/Layout/MainLayout';
import Card from '../components/UI/Card';

export const submitUserMetaTags: IHeaderMetaTags = {
  title: 'ثبت کاربر',
  description:
    'در اینجا می توانید کاربران و گروه های ایرانی که می شناسید اما توسط سایت پیدا نشده را معرفی کنید.',
  image: '',
};

const SubmitUser = () => {
  return (
    <HeaderMeta {...submitUserMetaTags}>
      <MainLayout>
        <Card padded border="none" className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold">ثبت کاربر</h1>
          <SubmitUserForm />
        </Card>
      </MainLayout>
    </HeaderMeta>
  );
};

export default SubmitUser;
