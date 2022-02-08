import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { SubmitUserForm } from '../components/Form/SubmitUserForm';
import { MainLayout } from '../components/Layout/MainLayout';
import { PageHeader } from '../components/Layout/PageHeader';
import { Card } from '../components/UI/Card';
import nextI18nextConfig from '../next-i18next.config';

const SubmitUser: NextPage = () => {
  const { t } = useTranslation('submit-user');

  return (
    <MainLayout withFooterPromo>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} />

      <Card border="none" className="max-w-lg mx-auto">
        <SubmitUserForm />
      </Card>
    </MainLayout>
  );
};

export default SubmitUser;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'submit-user'],
        nextI18nextConfig
      )),
    },
  };
}
