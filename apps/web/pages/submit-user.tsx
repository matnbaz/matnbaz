import SubmitUserForm from '../components/Form/SubmitUserForm';
import MainLayout from '../components/Layout/MainLayout';
import Card from '../components/UI/Card';

const SubmitUser = () => {
  return (
    <MainLayout>
      <Card padded border="none" className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold">ثبت کاربر</h1>
        <SubmitUserForm />
      </Card>
    </MainLayout>
  );
};

export default SubmitUser;
