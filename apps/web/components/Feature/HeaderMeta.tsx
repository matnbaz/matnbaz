import Head from 'next/head';
import { useMemo } from 'react';

export interface IHeaderMetaTags {
  title?: string;
  description?: string;
  image?: string;
  withBanner?: boolean;
}

interface IHeaderMetaProps extends IHeaderMetaTags {
  titlePrefix?: string;
  children: React.ReactNode;
}

const HeaderMeta = ({
  title,
  titlePrefix = 'متن‌باز – ',
  description,
  image,
  children,
  withBanner = false,
}: IHeaderMetaProps) => {
  const fullTitle = useMemo(() => titlePrefix + title, [title, titlePrefix]);
  return (
    <>
      <Head>
        <meta name="og:site_name" content="متن‌باز" />
        <meta name="og:type" content="object" />
        <meta name="twitter:site" content="@matnbaz_net" />
        <meta name="twitter:card" content="summary_large_image" />

        {title && (
          <>
            <title>{fullTitle}</title>
            <meta name="og:title" content={fullTitle} />
            <meta name="twitter:title" content={fullTitle} />
          </>
        )}
        {description && (
          <>
            <meta name="og:description" content={description} />
            <meta name="twitter:description" content={description} />
            <meta name="description" content={description} />
          </>
        )}
        {withBanner ? (
          <>
            <meta name="og:image" content="https://matnbaz.net/banner.jpg" />
            <meta
              name="og:image:alt"
              content="متن‌باز – تمام پروژه‌های متن‌باز ایرانی در یک جا"
            />
            <meta
              name="twitter:image:src"
              content="https://matnbaz.net/banner.jpg"
            />
            <meta name="og:image:width" content="1280" />
            <meta name="og:image:height" content="640" />
          </>
        ) : (
          image && <meta name="og:image" content={image} />
        )}
      </Head>
      {children}
    </>
  );
};

export default HeaderMeta;
