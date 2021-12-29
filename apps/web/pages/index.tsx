import { socialMedia } from '@matnbaz/common';
import { HiChevronLeft } from 'react-icons/hi';
import { SiDiscord } from 'react-icons/si';
import { CollectionPreview } from '../components/Collection/CollectionPreview';
import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import MainLayout from '../components/Layout/MainLayout';
import { RepositoryPreviewFromGithub } from '../components/Repository/RepositoryPreviewFromGithub';
import Button from '../components/UI/Button/Button';
import { useMetadataQuery } from '../lib/graphql-types';

export const indexMetaTags: IHeaderMetaTags = {
  title: 'تمام پروژه های متن باز ایرانی در یک جا',
  description:
    'متن باز سعی دارد تمام پروژه های متن باز (Open Source) ایرانی را در یک محل جمع کرده و پیدا کردن آن ها را برای دیگر ایرانیان آسان تر کند.',
};

const Index = () => {
  return (
    <MainLayout maxWidth={false} withoutPadding>
      <HeaderMeta {...indexMetaTags} withBanner />
      <main>
        <div className="overflow-hidden mb-12 sm:mb-24">
          <div className="m-auto h-screen px-4 sm:max-w-4xl sm:px-6 sm:text-center lg:px-0 lg:text-right flex items-center">
            <div className="">
              <a
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
              </a>
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                تمام پروژه‌های متن‌باز{' '}
                <span className="text-primary-500">ایرانی</span>{' '}
                <span className="">در یک جا</span>
              </h1>
              <p className="mt-3 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                با استفاده از بخش کاوش‌گر سایت می‌توانید پروژه‌های متن‌باز
                (open-source) ایرانی را کشف کنید. اگر شما هم کار متن‌باز
                کرده‌اید، به احتمال زیاد اسم خود را پیدا خواهید کرد!
              </p>
              <div className="mt-10 sm:mt-12">
                <div className="mt-3 sm:mt-0 sm:mr-3 space-x-3 space-x-reverse">
                  <Button.Primary href="/explore" size="lg">
                    برو به کاوش‌گر
                  </Button.Primary>
                  <Button.Outline href="/about" size="lg">
                    درباره پروژه
                  </Button.Outline>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="m-auto max-w-7xl lg:relative my-12">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <IranVector />
            </div>
          </div> */}
          <SiteStats />

          <div className="m-auto max-w-7xl mt-12 sm:mt-24 px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-2">
                <h2 className="inline-flex items-center text-2xl tracking-tight font-bold sm:text-4xl xl:text-4xl">
                  کاوش‌گر
                </h2>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  با استفاده انواع فیلتر‌های مختلف پکیج‌ها، کتابخانه‌ها و
                  پروژه‌های متن‌باز ایرانی / فارسی را کشف کنید.
                </p>
                <div className="mt-4">
                  <Button.Primary href="/explore" size="lg">
                    برو به کاوش‌گر
                  </Button.Primary>
                </div>
              </div>

              <div className="sm:col-start-1">
                <div className="relative overflow-x-hidden">
                  <RepositoryPreviewFromGithub
                    variation="summary"
                    padded
                    disabled
                    className="absolute my-4 inset-0 mx-auto order-3 max-w-[12rem] bg-white dark:bg-gray-900 translate-x-20 sm:translate-x-40 scale-75"
                    fullName="rastikerdar/vazir-font"
                  />
                  <RepositoryPreviewFromGithub
                    variation="summary"
                    padded
                    disabled
                    className="absolute my-4 inset-0 mx-auto order-1 max-w-[12rem] bg-white dark:bg-gray-900 -translate-x-20 sm:-translate-x-40 scale-75"
                    fullName="persepolisdm/persepolis"
                  />
                  <div className="py-8">
                    <RepositoryPreviewFromGithub
                      variation="summary"
                      padded
                      disabled
                      className="relative order-2 mx-auto max-w-[12rem] bg-white dark:bg-gray-900"
                      fullName="saadeghi/daisyui"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto max-w-7xl mt-12 sm:mt-24 px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-1">
                <h2 className="inline-flex items-center text-2xl tracking-tight font-bold sm:text-4xl xl:text-4xl">
                  کالکشن‌ها
                  <span className="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-600 dark:text-primary-100">
                    جدید
                  </span>
                </h2>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  با استفاده از کالکشن‌ها، پکیج‌ها و پروژه‌های مورد نظر را
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
                  <CollectionPreview
                    disabled
                    className="order-5 flex-shrink-0 translate-x-8 scale-90"
                    collection={{
                      name: 'Vue.js',
                      slug: 'vuejs',
                      image: `https://simpleicons.org/icons/vuedotjs.svg`,
                      color: { hexString: '#4FC08D' },
                    }}
                  />
                  <CollectionPreview
                    disabled
                    className="order-1 flex-shrink-0 -translate-x-8 scale-90"
                    collection={{
                      name: 'Laravel',
                      slug: 'laravel',
                      image: `https://simpleicons.org/icons/laravel.svg`,
                      color: { hexString: '#FF2D20' },
                    }}
                  />
                  <CollectionPreview
                    disabled
                    className="order-4 flex-shrink-0 translate-x-4"
                    collection={{
                      name: 'Flutter',
                      slug: 'flutter',
                      image: `https://simpleicons.org/icons/flutter.svg`,
                      color: { hexString: '#02569B' },
                    }}
                  />
                  <CollectionPreview
                    disabled
                    className="order-2 flex-shrink-0 -translate-x-4"
                    collection={{
                      name: 'React',
                      slug: 'react',
                      image: `https://simpleicons.org/icons/react.svg`,
                      color: { hexString: '#61DAFB' },
                    }}
                  />
                  <CollectionPreview
                    disabled
                    className="order-3 flex-shrink-0 scale-110"
                    collection={{
                      name: 'JavaScript',
                      slug: 'javascript',
                      image: `https://simpleicons.org/icons/javascript.svg`,
                      color: { hexString: '#F7DF1E' },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto max-w-7xl mt-12 sm:mt-24 px-6">
            <div className="grid sm:grid-cols-2 items-center gap-12 sm:grid-flow-row-dense">
              <div className="sm:col-start-2">
                <h2 className="text-2xl tracking-tight font-bold sm:text-4xl xl:text-4xl">
                  سورس‌کد متن‌باز
                </h2>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  سورس کد متن‌باز را می‌توانید در این مخزن گیت‌هاب مشاهده کنید.
                  <br />
                  با ستاره دادن می‌توانید به پیشرفت و بیشتر شناخته‌شدن پروژه کمک
                  کنید.
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a target="_blank" href="https://github.com/matnbaz/matnbaz">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="mt-2"
                      alt="دادن ستاره در گیت‌هاب"
                      src="https://img.shields.io/github/stars/matnbaz/matnbaz?style=social"
                    />
                  </a>
                </p>
              </div>

              <div className="sm:col-start-1">
                <RepositoryPreviewFromGithub
                  padded
                  fullName="matnbaz/matnbaz"
                />
              </div>
            </div>
          </div>
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
    <div className="sm:border-y border-gray-200 dark:border-gray-700 mt-12 sm:mt-24 space-y-4">
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
                    data.metadata.totalReposCount.toLocaleString('fa')
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
                    data.metadata.totalOwnersCount.toLocaleString('fa')
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
                    data.metadata.totalTopicsCount.toLocaleString('fa')
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
