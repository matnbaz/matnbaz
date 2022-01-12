import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { Question } from 'next-seo/lib/jsonld/faqPage';
import { join } from 'path';
import MainLayout from '../components/Layout/MainLayout';

interface FaqPageProps {
  faqHtml: string;
  faq: Question[];
}

const FaqPage: NextPage<FaqPageProps> = ({ faq, faqHtml }) => {
  return (
    <MainLayout>
      <NextSeo
        title="پرسش‌های متداول"
        description="در این صفحه پرسش‌هایی که به‌صورت متداول از ما پرسیده شده را مشاهده می‌کنید."
      />

      <FAQPageJsonLd mainEntity={faq} />

      <div
        className="prose dark:prose-invert prose-h1:mt-10 max-w-4xl mx-auto mb-5"
        dangerouslySetInnerHTML={{ __html: faqHtml }}
      />
    </MainLayout>
  );
};

export default FaqPage;

export const getStaticProps: GetStaticProps<FaqPageProps> = () => {
  const faqMarkdown = readFileSync(join(process.cwd(), 'FAQ.md'));
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
    props: { faq, faqHtml },
  };
};
