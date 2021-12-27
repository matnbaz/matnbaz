import { socialMedia } from '@matnbaz/common';
import { useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import {
  SiAngular,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiDart,
  SiDiscord,
  SiDjango,
  SiDotnet,
  SiElixir,
  SiFlutter,
  SiGo,
  SiJava,
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiSvelte,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import MainLayout from '../components/Layout/MainLayout';
import RepositoryPreview from '../components/Repository/RepositoryPreview';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loader/RepositoryPreviewSkeletonLoader';
import Button from '../components/UI/Button/Button';
import Card from '../components/UI/Card';
import {
  OwnerType,
  PlatformType,
  useMetadataQuery,
} from '../lib/graphql-types';

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
        <div className="lg:overflow-hidden mb-12 sm:mb-24">
          <div className="m-auto py-24 2xl:py-32 px-4 sm:max-w-4xl sm:px-6 sm:text-center lg:px-0 lg:text-right lg:flex lg:items-center">
            <div className="lg:py-24">
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
                <HiChevronLeft
                  className="mr-2 w-5 h-5 text-secondary"
                  aria-hidden="true"
                />
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

          <div className="my-10">
            <Technologies />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-12 space-y-4">
            <SiteStats />
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

              <div className="sm:col-start-auto">
                <RepositorySection />
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

const RepositorySection = () => {
  const [repo, setRepo] = useState(null);
  useEffect(() => {
    const main = async () => {
      const response = await fetch(
        `https://api.github.com/repos/matnbaz/matnbaz`
      );
      const json = await response.json();
      setRepo(json);
    };

    main();
  }, []);

  return repo ? (
    <RepositoryPreview
      sendToPlatform
      repository={{
        id: repo.id.toString(),
        isNew: false,
        platform: PlatformType.GitHub,
        owner: {
          login: repo.owner.login,
          platformId: repo.owner.id,
          type:
            repo.owner.type === 'Organization'
              ? OwnerType.Organization
              : OwnerType.User,
        },
        descriptionLimited: repo.description,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        stargazersCount: repo.stargazers_count,
        fullName: repo.full_name,
        language: {
          __typename: 'Language',
          name: repo.language,
          color: {
            hexString: '#1e90ff',
          },
        },
      }}
    />
  ) : (
    <RepositoryPreviewSkeletonLoader />
  );
};

const SiteStats = () => {
  const { data } = useMetadataQuery();

  return (
    <div>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                          آمار متن‌باز
                        </h2>
                        <p className="mt-3 text-xl text-secondary sm:mt-4">
                          تمام پروژه ها از پس از تایید صلاحیت خودکار و با توجه به
                          معیار های خاص به متن‌باز اضافه می‌شوند.
                        </p>
                      </div>
                    </div> */}
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 h-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-gray-200 dark:divide-gray-700">
                <div className="flex flex-col p-6 text-center">
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
                <div className="flex flex-col p-6 text-center">
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
                <div className="flex flex-col p-6 text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

const Technologies = () => {
  const technologies: {
    name: string;
    slug: string;
    icon: IconType;
    color: string;
    type: 'language' | 'topic';
  }[] = [
    {
      name: 'JavaScript',
      slug: 'javascript',
      icon: SiJavascript,
      color: '#F7DF1E',
      type: 'language',
    },
    {
      name: 'Python',
      slug: 'python',
      icon: SiPython,
      color: '#3776AB',
      type: 'language',
    },
    {
      name: 'PHP',
      slug: 'php',
      icon: SiPhp,
      color: '#777BB4',
      type: 'language',
    },
    {
      name: 'Java',
      slug: 'java',
      icon: SiJava,
      color: '#007396',
      type: 'language',
    },
    {
      name: 'Go',
      slug: 'go',
      icon: SiGo,
      color: '#00ADD8',
      type: 'language',
    },
    {
      name: 'C',
      slug: 'c',
      icon: SiC,
      color: '#A8B9CC',
      type: 'language',
    },
    {
      name: 'C#',
      slug: 'csharp',
      icon: SiCsharp,
      color: '#239120',
      type: 'language',
    },
    {
      name: 'C++',
      slug: 'cplusplus',
      icon: SiCplusplus,
      color: '#00599C',
      type: 'language',
    },
    {
      name: 'TypeScript',
      slug: 'typescript',
      icon: SiTypescript,
      color: '#3178C6',
      type: 'language',
    },
    {
      name: 'Ruby',
      slug: 'ruby',
      icon: SiRuby,
      color: '#CC342D',
      type: 'language',
    },
    {
      name: 'Rust',
      slug: 'rust',
      icon: SiRust,
      color: '#000000',
      type: 'language',
    },
    {
      name: 'Dart',
      slug: 'dart',
      icon: SiDart,
      color: '#0175C2',
      type: 'language',
    },
    {
      name: 'Kotlin',
      slug: 'kotlin',
      icon: SiKotlin,
      color: '#7F52FF',
      type: 'language',
    },
    {
      name: 'Elixir',
      slug: 'elixir',
      icon: SiElixir,
      color: '#4B275F',
      type: 'language',
    },
    {
      name: 'Laravel',
      slug: 'laravel',
      icon: SiLaravel,
      color: '#FF2D20',
      type: 'topic',
    },
    {
      name: 'Flutter',
      slug: 'flutter',
      icon: SiFlutter,
      color: '#02569B',
      type: 'topic',
    },
    {
      name: 'Node.js',
      slug: 'nodejs',
      icon: SiNodedotjs,
      color: '#339933',
      type: 'topic',
    },
    {
      name: 'React',
      slug: 'react',
      icon: SiReact,
      color: '#61DAFB',
      type: 'topic',
    },
    {
      name: 'Vue.js',
      slug: 'vuejs',
      icon: SiVuedotjs,
      color: '#4FC08D',
      type: 'topic',
    },
    {
      name: 'Ruby on Rails',
      slug: 'ruby-on-rails',
      icon: SiRubyonrails,
      color: '#CC0000',
      type: 'topic',
    },
    {
      name: 'Angular',
      slug: 'angular',
      icon: SiAngular,
      color: '#DD0031',
      type: 'topic',
    },
    {
      name: 'Svelte',
      slug: 'svelte',
      icon: SiSvelte,
      color: '#FF3E00',
      type: 'topic',
    },
    {
      name: 'Django',
      slug: 'django',
      icon: SiDjango,
      color: '#339933',
      type: 'topic',
    },
    {
      name: '.NET',
      slug: 'dotnet',
      icon: SiDotnet,
      color: '#512BD4',
      type: 'topic',
    },
  ];

  return (
    <div className="flex items-center gap-10 flex-wrap justify-center">
      {technologies.map(({ name, slug, icon: Icon, color, type }) => (
        <Card
          key={slug}
          border="none"
          padded
          style={{ backgroundColor: color }}
          className="text-white w-40 hover:scale-110 transition"
          href={
            type === 'language'
              ? `/explore?languages=${slug}`
              : type === 'topic'
              ? `/explore?topics=${slug}`
              : ''
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Icon className="w-14 h-14 mx-auto" />
          <div dir="ltr" className="text-center font-medium mt-4">
            {name}
          </div>
        </Card>
      ))}
    </div>
  );
};
