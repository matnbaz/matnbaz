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
        {title && (
          <>
            <title>{fullTitle}</title>
            <meta name="og:title" content={fullTitle} />
          </>
        )}
        {description && (
          <>
            <meta name="og:description" content={description} />
            <meta name="description" content={description} />
          </>
        )}
        {withBanner ? (
          <>
            <meta name="og:image" content="https://matnbaz.net/banner.jpg" />
            <meta property="og:image:width" content="1280" />
            <meta property="og:image:height" content="640" />
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
