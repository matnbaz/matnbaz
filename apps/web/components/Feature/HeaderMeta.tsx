import Head from 'next/head';
import { useMemo } from 'react';

export interface IHeaderMetaTags {
  title?: string;
  description?: string;
  image?: string;
}

interface IHeaderMetaProps extends IHeaderMetaTags {
  titlePrefix?: string;
  reversePrefix?: boolean;
  withBanner?: boolean;
  banner?: string;
  bannerWidth?: number;
  bannerHeight?: number;
}

const HeaderMeta = ({
  title,
  titlePrefix = 'متن‌باز',
  reversePrefix = false,
  description,
  image,
  banner = 'https://matnbaz.net/banner.jpg',
  withBanner = false,
  bannerWidth = 1280,
  bannerHeight = 640,
}: IHeaderMetaProps) => {
  const fullTitle = useMemo(
    () =>
      reversePrefix ? `${titlePrefix} – ${title}` : `${title} – ${titlePrefix}`,
    [reversePrefix, title, titlePrefix]
  );
  return (
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
          <meta name="og:image" content={banner} />
          <meta name="twitter:image:src" content={banner} />
          <meta name="og:image:width" content={bannerWidth.toString()} />
          <meta name="og:image:height" content={bannerHeight.toString()} />
        </>
      ) : (
        image && <meta name="og:image" content={image} />
      )}
    </Head>
  );
};

export default HeaderMeta;
