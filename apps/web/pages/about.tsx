import { readFileSync } from 'fs';
import { marked } from 'marked';
import { GetStaticProps, NextPage } from 'next';
import { join } from 'path';
import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import MainLayout from '../components/Layout/MainLayout';

interface AboutProps {
  about: string;
}

export const aboutMetaTags: IHeaderMetaTags = {
  title: 'درباره',
  description:
    'درباره انگیزه ما از ساخت متن باز، نحوه کار آن، چشم انداز و آینده پروژه بخوانید.',
};

const About: NextPage<AboutProps> = ({ about }) => {
  return (
    <MainLayout>
      <HeaderMeta {...aboutMetaTags} withBanner />
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
