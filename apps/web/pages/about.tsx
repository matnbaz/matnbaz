import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import MainLayout from '../components/Layout/MainLayout';

interface AboutProps {
  about: string;
}

export const aboutMetaTags = {
  title: 'متن‌باز – درباره',
  description:
    'درباره انگیزه ما از ساخت متن باز، نحوه کار آن، چشم انداز و آینده پروژه بخوانید.',
  image: '',
};

const About: NextPage<AboutProps> = ({ about }) => {
  return (
    <MainLayout>
      <Head>
        <title>{aboutMetaTags.title}</title>
        <meta name="description" content={aboutMetaTags.description} />
        <meta name="og:title" content={aboutMetaTags.title} />
        <meta name="og:description" content={aboutMetaTags.description} />
        <meta name="og:image" content={aboutMetaTags.image} />
      </Head>

      <div
        className="prose dark:prose-light max-w-4xl mx-auto my-5"
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
