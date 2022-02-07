import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { Question } from 'next-seo/lib/jsonld/faqPage';
import { join } from 'path';
import { MainLayout } from '../components/Layout/MainLayout';
import nextI18nextConfig from '../next-i18next.config';

interface FaqPageProps {
  faqHtml: string;
  faq: Question[];
}

const FaqPage: NextPage<FaqPageProps> = ({ faq, faqHtml }) => {
  const { t } = useTranslation('faq');

  return (
    <MainLayout withFooterPromo>
      <NextSeo title={t('page-title')} description={t('page-description')} />

      <FAQPageJsonLd mainEntity={faq} />

      <div
        className="prose dark:prose-invert prose-h1:mt-10 max-w-4xl mx-auto mb-5"
        dangerouslySetInnerHTML={{ __html: faqHtml }}
      />
    </MainLayout>
  );
};

export default FaqPage;

export const getStaticProps: GetStaticProps<FaqPageProps> = async ({
  locale,
}) => {
  const faqMarkdown = readFileSync(
    join(process.cwd(), `markdown/${locale}/FAQ.md`)
  );
  const faqHtml = marked.parse(faqMarkdown.toString());
  const faq = faqMarkdown
    .toString()
    .split('<!-- question-separator -->')
    .map((faq) => {
      const splitPerLine = faq.split('#')[1].split('\n');
      return {
        questionName: splitPerLine[0],
        acceptedAnswerText: JSON.stringify(
          marked.parse(splitPerLine.slice(1, splitPerLine.length).join('\n'))
        ).slice(1, -1),
      };
    });

  return {
    props: {
      faq,
      faqHtml,
      ...(await serverSideTranslations(
        locale,
        ['common', 'faq'],
        nextI18nextConfig
      )),
    },
  };
};
