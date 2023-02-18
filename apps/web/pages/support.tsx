import { readFileSync } from "fs";
import { marked, Renderer } from "marked";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { join } from "path";
import { MainLayout } from "../components/Layout/MainLayout";
import nextI18nextConfig from "../next-i18next.config";

export interface SupportPageProps {
  supportText: string;
}

const SupportPage: NextPage<SupportPageProps> = ({ supportText }) => {
  const { t } = useTranslation("support");

  return (
    <MainLayout>
      <NextSeo title={t("page-title")} description={t("page-description")} />
      <div
        className="prose dark:prose-invert prose-h1:mt-10 max-w-4xl mx-auto mb-5"
        dangerouslySetInnerHTML={{ __html: supportText }}
      />
    </MainLayout>
  );
};

export default SupportPage;

export const getStaticProps: GetStaticProps<SupportPageProps> = async ({
  locale,
}) => {
  const renderer = new Renderer();
  const ogLinkRender = renderer.link.bind(renderer);
  renderer.link = (href, ...rest) =>
    ogLinkRender(href, ...rest).replace(
      /^<a/,
      '<a target="_blank" rel="noopener"'
    );

  const supportMarkdown = readFileSync(
    join(
      process.cwd().replace(/apps(\/|\\)web/, ""),
      `/markdown/${locale}/SUPPORT.md`
    )
  );
  const renderedMarkdown = marked.parse(supportMarkdown.toString(), {
    renderer,
  });

  return {
    props: {
      supportText: renderedMarkdown,
      ...(await serverSideTranslations(
        locale,
        ["common", "support"],
        nextI18nextConfig
      )),
    },
  };
};
