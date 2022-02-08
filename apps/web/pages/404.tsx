import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { MainLayout } from '../components/Layout/MainLayout';
import { Button } from '../components/UI/Button/Button';
import { Divider } from '../components/UI/Divider';
import nextI18nextConfig from '../next-i18next.config';

const Error404Page: NextPage = () => {
  const { t } = useTranslation('404');
  return (
    <MainLayout>
      <NextSeo title={t('page-title')} />

      <div className="flex flex-col items-center justify-center h-80">
        <h1 className="text-5xl font-bold">{t('page-title')}</h1>
        <span className="text-lg text-center text-secondary mt-4">
          {t('page-description')}
        </span>
        <Divider className="my-6" />
        <Button.Primary href="/">{t('go-home')}</Button.Primary>
      </div>
    </MainLayout>
  );
};

export default Error404Page;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', '404'],
        nextI18nextConfig
      )),
    },
  };
}
