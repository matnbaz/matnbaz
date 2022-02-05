import { links } from '@matnbaz/common';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { MainLayout } from '../components/Layout/MainLayout';
import { Button } from '../components/UI/Button/Button';
import { Divider } from '../components/UI/Divider';
import nextI18nextConfig from '../next-i18next.config';

const Error500Page: NextPage = () => {
  const { t } = useTranslation('500');

  return (
    <MainLayout>
      <NextSeo title={t('page-title')} />
      <div className="flex flex-col items-center justify-center h-80">
        <h1 className="text-5xl font-bold">{t('page-title')}</h1>
        <span className="text-lg text-center text-secondary mt-4">
          {t('page-description')}
        </span>
        <Divider className="my-6" />
        <div className="space-x-4 rtl:space-x-reverse">
          <Button.Primary
            target="_blank"
            href={`${links.githubRepo}/issues/new`}
          >
            {t('report-issue')}
          </Button.Primary>
          <Button.Outline href="/">{t('go-home')}</Button.Outline>
        </div>
      </div>
    </MainLayout>
  );
};

export default Error500Page;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', '500'],
        nextI18nextConfig
      )),
    },
  };
}
