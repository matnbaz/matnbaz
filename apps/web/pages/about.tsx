import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { join } from 'path';
import { MainLayout } from '../components/Layout/MainLayout';
import nextI18nextConfig from '../next-i18next.config';

interface AboutProps {
  about: string;
}

const About: NextPage<AboutProps> = ({ about }) => {
  const { t } = useTranslation('about');

  return (
    <MainLayout>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <div
        className="prose dark:prose-invert prose-h1:mt-10 max-w-4xl mx-auto mb-5"
        dangerouslySetInnerHTML={{ __html: about }}
      />
    </MainLayout>
  );
};

export default About;

export const getStaticProps: GetStaticProps<AboutProps> = async ({
  locale,
}) => {
  const aboutMarkdown = readFileSync(
    join(process.cwd(), `markdown/${locale}/ABOUT.md`)
  );
  const renderedMarkdown = marked.parse(aboutMarkdown.toString());

  return {
    props: {
      about: renderedMarkdown,
      ...(await serverSideTranslations(
        locale,
        ['common', 'about'],
        nextI18nextConfig
      )),
    },
  };
};
