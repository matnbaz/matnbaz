import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { join } from 'path';
import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import MainLayout from '../components/Layout/MainLayout';

// interface FaqPageProps {
//   faqs: { question: string; answer: string }[];
// }

interface FaqPageProps {
  faqs: string;
}

export const faqMetaTags: IHeaderMetaTags = {
  title: 'سوالات متداول',
  description:
    'در این صفحه سوالاتی که به‌صورت متداول از ما پرسیده شده را مشاهده می‌کنید.',
};

const FaqPage: NextPage<FaqPageProps> = ({ faqs }) => {
  return (
    <MainLayout>
      <HeaderMeta {...faqMetaTags} />
      <div
        className="prose dark:prose-invert max-w-4xl mx-auto my-5"
        dangerouslySetInnerHTML={{ __html: faqs }}
      />

      {/* <div className="space-y-10 max-w-4xl mx-auto my-5">
        {faqs.map(({ question, answer }) => (
          <div key={question}>
            <h1 className="text-3xl font-bold">{question}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: answer }}
              className="mt-4 prose dark:prose-invert"
            />
          </div>
        ))}
      </div> */}
    </MainLayout>
  );
};

export default FaqPage;

export const getStaticProps: GetStaticProps<FaqPageProps> = () => {
  const faqMarkdown = readFileSync(join(process.cwd(), 'FAQ.md'));
  const renderedMarkdown = marked.parse(faqMarkdown.toString());

  return {
    props: { faqs: renderedMarkdown },
  };
  //   const faqMarkdown = readFileSync(join(process.cwd(), 'FAQ.md'));
  //   const faqs = faqMarkdown.toString().split('<!-- question-separator -->');

  //   return {
  //     props: {
  //       faqs: faqs.map((faq) => {
  //         const splitPerLine = faq.split('#')[1].split('\n');
  //         return {
  //           question: splitPerLine[0],
  //           answer: marked.parse(
  //             splitPerLine.slice(1, splitPerLine.length).join('\n')
  //           ),
  //         };
  //       }),
  //     },
  //   };
};
