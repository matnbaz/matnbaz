import { links, persianNumbers } from '@matnbaz/common';
import classNames from 'classnames';
import { NextPage } from 'next';
import { LogoJsonLd, NextSeo, SocialProfileJsonLd } from 'next-seo';
import Image from 'next/image';
import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MainLayout } from '../components/Layout/MainLayout';
import { FeaturedRepositoriesFromGithub } from '../components/Repository/FeaturedRepositoriesFromGithub';
import { RepositoryPreviewFromGithub } from '../components/Repository/RepositoryPreviewFromGithub';
import { Button } from '../components/UI/Button/Button';
import { useMetadataQuery } from '../lib/graphql-types';

const sponsorshipUrl = `${links.githubRepo}/blob/main/SPONSORSHIP.md`;
// mailto:alirezazamani2922@gmail.com?subject=%D8%A7%D8%B3%D9%BE%D8%A7%D9%86%D8%B3%D8%B1%20%D9%85%D8%AA%D9%86%E2%80%8C%D8%A8%D8%A7%D8%B2&body=%D8%A8%D8%A7%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D9%84%D8%A7%D9%85%D8%8C%0D%0A%D8%B4%D8%B1%DA%A9%D8%AA%20%D9%85%D8%A7%20(%D9%86%D8%A7%D9%85%20%D8%B4%D8%B1%DA%A9%D8%AA)%20%D9%85%D8%A7%DB%8C%D9%84%20%D8%A8%D9%87%20%D8%AD%D9%85%D8%A7%DB%8C%D8%AA%20%D8%A7%D8%B2%20%D8%B7%D8%B1%DB%8C%D9%82%20%D8%A7%D8%B3%D9%BE%D8%A7%D9%86%D8%B3%D8%B1%20%D8%B4%D8%AF%D9%86%20%D8%A7%D8%B3%D8%AA.%0D%0A%0D%0A%D9%84%D8%B7%D9%81%D8%A7%20%D8%B4%D8%B1%D8%A7%DB%8C%D8%B7%20%D8%A7%D8%B3%D9%BE%D8%A7%D9%86%D8%B3%D8%B1%DB%8C%20%D8%B1%D8%A7%20%D8%A7%D8%B1%D8%B3%D8%A7%D9%84%20%DA%A9%D9%86%DB%8C%D8%AF.%0D%0A%D8%A8%D8%A7%20%D8%AA%D8%B4%DA%A9%D8%B1.

const Index: NextPage = () => {
  return (
    <MainLayout maxWidth={false} withoutPadding withFooterPromo>
      <NextSeo
        title="تمام پروژه های اوپن‌سورس ایرانی در یک جا"
        titleTemplate="متن‌باز – %s"
        description="متن باز سعی دارد تمام پروژه های اوپن‌سورس (Open Source) ایرانی را در یک محل جمع کرده و پیدا کردن آن ها را برای دیگر ایرانیان آسان تر کند."
      />

      <SocialProfileJsonLd
        type="Organization"
        name="متن‌باز"
        url="http://matnbaz.net"
        sameAs={[
          'http://twitter.com/matnbaz_net',
          'http://instagram.com/matnbaz_net',
          'http://t.me/matnbaz_net',
        ]}
      />

      <LogoJsonLd
        logo="https://matnbaz.net/social-logo.png"
        url="https://matnbaz.net"
      />

      <main>
        <div className="overflow-hidden mb-12 sm:mb-24">
          <div className="h-screen md:min-h-[40rem] flex flex-col items-center">
            <div className="m-auto px-4 sm:max-w-4xl sm:px-6 sm:text-center lg:px-0 lg:text-right flex items-center">
              <div className="">
                {/* <a
                  href={socialMedia.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center text-white bg-black rounded-full p-1 pl-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span
                    className="px-3 py-0.5 text-xs font-semibold flex items-center space-x- leading-5 tracking-wide rounded-full"
                    style={{ backgroundColor: '#5865F2' }}
                  >
                    <SiDiscord className="ml-2" />
                    انجمن دیسکورد
                  </span>
                  <span className="mr-4 text-sm">
                    به دیسکورد متن‌باز بپیوندید
                  </span>
                  <HiChevronLeft className="mr-2 w-5 h-5" aria-hidden="true" />
                </a> */}
                {/* <a
                  href={links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center text-white bg-black rounded-full p-1 pl-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span
                    className="px-3 py-0.5 text-xs font-semibold flex items-center space-x- leading-5 tracking-wide rounded-full"
                    style={{ backgroundColor: '#26A5E4' }}
                  >
                    <SiTelegram className="ml-2" />
                    <span dir="ltr">@matnbaz_net</span>
                  </span>
                  <span className="mr-4 text-sm">
                    به کانال تلگرام ما بپیوندید
                  </span>
                  <HiChevronLeft className="mr-2 w-5 h-5" aria-hidden="true" />
                </a> */}
                <div className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-5xl lg:mt-6 xl:text-5xl">
                  <h1 className="inline">
                    <span className="text-transparent bg-clip-text ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-400 to-primary-500">
                      متن‌باز
                    </span>
                  </h1>
                  :{' '}
                  <h2 className="inline">
                    تمام پروژه‌های اوپن‌سورس{' '}
                    <span className="text-transparent bg-clip-text ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-green-400 to-red-600">
                      ایرانی
                    </span>{' '}
                    در یک جا
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  با متن‌باز شما می‌توانید پروژه های اوپن‌سورس (Open-Source)
                  مختلف ایرانی را کشف کنید. اگر شما هم کار اوپن‌سورس کرده‌اید،
                  به احتمال زیاد اسم خود را سایت پیدا خواهید کرد!
                </p>
                <div className="mt-8 sm:mt-12">
                  <div className="mt-3 space-x-3 space-x-reverse">
                    <Button.Primary href="#more" size="lg">
                      اطلاعات بیش‌تر
                      <HiChevronDown className="w-5 h-5 mr-2" />
                    </Button.Primary>
                  </div>
                </div>
                {/* <div className="mt-8 sm:mt-16">
                  <div className="mt-3 sm:mt-0 sm:mr-3 space-x-3 space-x-reverse">
                    <div className="flex">
                      <Button.Ghost className="animate-bounce">
                        <HiChevronDown className="w-8 h-8" />
                      </Button.Ghost>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* <div className="max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h3 className="max-w-md text-2xl md:text-3xl font-extrabold text-center lg:max-w-xl">
                    اسپانسر‌های متن‌باز
                  </h3>
                  <a
                    className="mt-1 text-sm text-secondary text-center block"
                    href={sponsorshipUrl}
                  >
                    اطلاعات بیش‌تر
                  </a>
                </div>
                <div className="flow-root self-center mt-8 lg:mt-0">
                  <div className="-mt-4 -mr-8 flex flex-wrap justify-between lg:-mr-4">
                    <SponsorImage
                      name="Empty sponsor"
                      image="/sponsors/empty-light.png"
                      darkImage="/sponsors/empty-dark.png"
                      url={sponsorshipUrl}
                    />
                    <SponsorImage
                      name="Empty sponsor"
                      image="/sponsors/empty-light.png"
                      darkImage="/sponsors/empty-dark.png"
                      url={sponsorshipUrl}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="m-auto max-w-7xl lg:relative my-12">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <IranVector />
            </div>
          </div> */}

          <div id="more" />

          <div className="m-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-2">
                <h3 className="inline-flex items-center text-2xl tracking-tight font-extrabold sm:text-4xl xl:text-4xl">
                  کاوش‌گر
                </h3>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  با استفاده از فیلتر‌های مختلف پکیج‌ها، کتابخانه‌ها و پروژه‌های
                  اوپن‌سورس ایرانی را کشف کنید.
                </p>
                <div className="mt-4">
                  <Button.Primary href="/explore" size="lg">
                    برو به کاوش‌گر
                  </Button.Primary>
                </div>
              </div>

              <div className="sm:col-start-1">
                <div className="relative overflow-x-hidden">
                  <FeaturedRepositoriesFromGithub
                    repoNames={[
                      'rastikerdar/vazir-font',
                      'persepolisdm/persepolis',
                      'saadeghi/daisyui',
                    ]}
                    variation="summary"
                    padded
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto max-w-7xl mt-16 sm:mt-28 px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-1">
                <h3 className="inline-flex items-center text-2xl tracking-tight font-extrabold sm:text-4xl xl:text-4xl">
                  کالکشن‌ها
                  <span className="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-600 dark:text-primary-100">
                    جدید
                  </span>
                </h3>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  کالکشن‌ها به شما کمک می‌کنند مخزن‌های متن‌باز مورد نظر را
                  سریع‌تر و راحت‌تر پیدا کنید.
                </p>
                <div className="mt-4">
                  <Button.Primary href="/collections" size="lg">
                    مشاهده کالکشن‌ها
                  </Button.Primary>
                </div>
              </div>

              <div className="sm:col-start-2">
                <div className="flex justify-center items-center py-6 overflow-x-hidden mx-auto">
                  <CollectionItem
                    color="#7F52FF"
                    className="translate-x-8 order-5 scale-[80%]"
                    name="Kotlin"
                    imageSrc="https://simpleicons.org/icons/kotlin.svg"
                  />
                  <CollectionItem
                    color="#FF2D20"
                    className="-translate-x-8 order-1 scale-[80%]"
                    name="Laravel"
                    imageSrc="https://simpleicons.org/icons/laravel.svg"
                  />
                  <CollectionItem
                    style={{ zIndex: 1 }}
                    color="#3776AB"
                    className="translate-x-4 order-4"
                    name="Python"
                    imageSrc="https://simpleicons.org/icons/python.svg"
                  />
                  <CollectionItem
                    style={{ zIndex: 1 }}
                    color="#61DAFB"
                    className="-translate-x-4 order-2"
                    name="React"
                    imageSrc="https://simpleicons.org/icons/react.svg"
                  />
                  <CollectionItem
                    style={{ zIndex: 2 }}
                    color="#000000"
                    className="order-3 scale-[120%]"
                    name="Rust"
                    imageSrc="https://simpleicons.org/icons/rust.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-28">
            <SiteStats />
          </div>

          <div className="m-auto max-w-7xl mt-16 sm:mt-28 px-6">
            <div className="grid sm:grid-cols-2 gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-1">
                <div>
                  <SectionTitle>سورس‌کد متن‌باز</SectionTitle>
                  <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    سورس‌کد بک‌اند، فرانت‌اند، اپلیکیشن موبایل، فایل‌های لوگو و
                    پست‌های شبکه‌های اجتماعی متن‌باز همگی به صورت اوپن‌سورس در
                    دسترس عموم قرار دارند.
                  </p>
                </div>
                <div className="mt-10">
                  <RepositoryPreviewFromGithub
                    padded
                    sendToPlatform
                    fullName="matnbaz/matnbaz"
                  />
                </div>
              </div>

              <div className="sm:col-start-2">
                <div>
                  <SectionTitle>انجمن متن‌باز</SectionTitle>
                  <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    یکی از اهداف ما ساخت یک انجمن فعال و دوستانه است. در انجمن
                    دیسکورد متن‌باز کاربران می توانند با افراد دیگر آشنا شوند و
                    برای انجام پروژه‌های متن‌باز همکار جمع کنند.
                  </p>
                </div>

                <div className="mt-10">
                  <a href={links.discord} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="mx-auto rounded-md"
                      src="https://discordapp.com/api/guilds/912032955956871188/widget.png?style=banner1"
                      alt="Discord banner"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="m-auto max-w-7xl mt-16 sm:mt-28 px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-2">
                <SectionTitle>
                  در شبکه‌های اجتماعی
                </SectionTitle>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  متن‌باز را در شبکه‌های اجتماعی دنبال کنید تا خبری را از دست
                  ندهید.
                </p>
              </div>

              <div className="sm:col-start-1">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <IconButton
                    href={links.telegram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SiTelegram className="w-8 h-8" />
                  </IconButton>
                  <IconButton
                    href={links.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SiTwitter className="w-8 h-8" />
                  </IconButton>
                  <IconButton
                    href={links.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SiInstagram className="w-8 h-8" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* More main page content here... */}
      </main>
    </MainLayout>
  );
};

export default Index;

const SiteStats = () => {
  const { data } = useMetadataQuery();

  return (
    <div className="sm:border-y border-gray-200 dark:border-gray-700 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 h-1/2" />
        <div className="relative mx-auto px-4 sm:px-0 sm:flex sm:justify-center">
          <div className="hidden sm:block bg-gradient-to-r from-transparent to-white dark:to-gray-900 scale-y-110 w-full"></div>
          <div className="max-w-4xl flex-shrink-0 mx-auto">
            <dl className="sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-gray-200 dark:divide-gray-700 sm:border-x border-gray-200 dark:border-gray-700">
              <div className="flex flex-col p-10 text-center">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-secondary">
                  پروژه
                </dt>
                <dd className="order-1 text-5xl font-extrabold">
                  {data ? (
                    persianNumbers(data.metadata.totalReposCount)
                  ) : (
                    <span className="animate-pulse">۰</span>
                  )}
                </dd>
              </div>
              <div className="flex flex-col p-10 text-center">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-secondary">
                  سازنده
                </dt>
                <dd className="order-1 text-5xl font-extrabold">
                  {data ? (
                    persianNumbers(data.metadata.totalOwnersCount)
                  ) : (
                    <span className="animate-pulse">۰</span>
                  )}
                </dd>
              </div>
              <div className="flex flex-col p-10 text-center">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-secondary">
                  موضوع
                </dt>
                <dd className="order-1 text-5xl font-extrabold">
                  {data ? (
                    persianNumbers(data.metadata.totalTopicsCount)
                  ) : (
                    <span className="animate-pulse">۰</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="hidden sm:block bg-gradient-to-l from-transparent to-white dark:to-gray-900 scale-y-110 w-full"></div>
        </div>
      </div>
    </div>
  );
};

interface SponsorImageProps {
  name: string;
  image: string;
  url: string;
  darkImage?: string;
}

const SponsorImage = ({ url, darkImage, image, name }: SponsorImageProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-4 mr-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:mr-4"
    >
      <div className={darkImage && 'dark:hidden'}>
        <Image width={189} height={48} src={image} alt={name} />
      </div>

      {darkImage && (
        <div className="hidden dark:block">
          <Image width={189} height={48} src={darkImage} alt={name} />
        </div>
      )}
    </a>
  );
};

interface CollectionItemProps {
  name: string;
  imageSrc: string;
  color: string;
  className: string;
  style?: CSSProperties;
}
const CollectionItem = ({
  name,
  imageSrc,
  color,
  className,
  style,
}: CollectionItemProps) => {
  return (
    <div
      style={{ backgroundColor: color, ...style }}
      className={classNames(
        className,
        'text-white w-16 sm:w-24 flex-shrink-0 rounded-lg border-gray-200 dark:border-gray-700 block disabled:pointer-events-none'
      )}
    >
      <div className="h-full px-2.5 py-3 sm:px-5 sm:py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={name}
          src={imageSrc}
          width={128}
          height={128}
          className="brightness-0 invert mx-auto w-10 h-10 sm:w-14 sm:h-14"
        />
        <div className="text-center text-sm sm:text-lg sm:font-bold mt-4">
          <span dir="ltr">{name}</span>{' '}
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
  return (
    <h3
      className={classNames(
        'text-2xl tracking-tight font-extrabold sm:text-4xl xl:text-4xl',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
