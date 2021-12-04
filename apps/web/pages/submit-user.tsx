import { useCallback, useMemo, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import Button from '../components/UI/Button/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input/Input';
import { useSendSubmissionMutation } from '../lib/graphql-types';

const SubmitUser = () => {
  const [submit, { data, loading, error }] = useSendSubmissionMutation();
  const [username, setUsername] = useState('');

  const sendSubmissionInfo = useCallback(async () => {
    try {
      const { data, errors } = await submit({
        variables: { content: `Username submission: ${username}` },
      });
      if (data) setUsername('');
    } catch (e) {
      //
    }
  }, [username, submit]);

  const isValidated = useMemo(() => username.length > 3, [username]);

  return (
    <MainLayout>
      <Card padded border="none" className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold">ثبت کاربر</h1>
        <p className="mt-5">
          در صورتی که کاربری / گروهی ایرانی را در گیت‌هاب می شناسید که هنوز توسط
          سایت پیدا نشده، نام کاربری ایشان را در فرم زیر وارد کنید تا توسط ما
          بررسی شود.
        </p>

        <div className="space-y-3 mt-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isValidated) sendSubmissionInfo();
            }}
            className="flex items-center space-x-2 space-x-reverse w-full"
          >
            <Input.Text
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              dir="ltr"
              placeholder="GitHub username"
            />
            <Button.Primary disabled={!isValidated} type="submit">
              ثبت
            </Button.Primary>
          </form>
          {data && (
            <div className="mt-4 text-sm text-green-600">
              درخواست شما با آیدی {data.sendSubmission.id} ثبت شد. خیلی ممنون!
            </div>
          )}
          {error && (
            <div className="mt-4 text-sm text-red-600">
              متاسفانه مشکلی در ارسال فرم پیش آمد. لطفا دوباره تلاش کنید.
            </div>
          )}
        </div>
      </Card>
    </MainLayout>
  );
};

export default SubmitUser;
