import Head from 'next/head';
import { useMemo } from 'react';

export interface IHeaderMetaTags {
  title?: string;
  description?: string;
  image?: string;
}

interface IHeaderMetaProps extends IHeaderMetaTags {
  titlePrefix?: string;
  children: React.ReactNode;
}

const HeaderMeta = ({
  title,
  titlePrefix = 'متن باز – ',
  description,
  image,
  children,
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
        {image && <meta name="og:image" content={image} />}
      </Head>
      {children}
    </>
  );
};

export default HeaderMeta;
