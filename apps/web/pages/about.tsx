import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { join } from 'path';
import { MainLayout } from '../components/Layout/MainLayout';

interface AboutProps {
  about: string;
}

const About: NextPage<AboutProps> = ({ about }) => {
  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="درباره"
        description="درباره انگیزه ما از ساخت متن باز، نحوه کار آن، چشم انداز و آینده پروژه بخوانید."
      />
      <div
        className="prose dark:prose-invert prose-h1:mt-10 max-w-4xl mx-auto mb-5"
        dangerouslySetInnerHTML={{ __html: about }}
      />
    </MainLayout>
  );
};

export default About;

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const aboutMarkdown = readFileSync(join(process.cwd(), 'README.md'));
  const renderedMarkdown = marked.parse(aboutMarkdown.toString());

  return {
    props: {
      about: renderedMarkdown,
    },
  };
};
