import { persianNumbers } from '@matnbaz/common';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { RepositoryPreviewList } from '../../../components/Repository/RepositoryPreviewList';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetSelectionDocument,
  GetSelectionQueryResult,
  GetSelectionQueryVariables,
  useGetSelectionQuery,
} from '../../../lib/graphql-types';

interface SelectionPageProps {
  issue: number;
}

const SelectionPage: NextPage<SelectionPageProps> = ({ issue }) => {
  const {
    data: { selectionByIssue: selection },
    fetchMore,
    loading,
    networkStatus,
    called,
  } = useGetSelectionQuery({
    variables: { issue },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <MainLayout>
      <NextSeo
        title={selection.id}
        description={selection.description}
        openGraph={{
          images: [
            {
              url: `https://server.matnbaz.net/repository-selections/${selection.id}.jpg`,
            },
          ],
        }}
      />
      <div className="max-w-3xl mx-auto">
        <Link href="/selections">
          <a className="inline-flex items-center text-sm text-secondary space-x-2 space-x-reverse">
            <MdChevronRight />
            <span>مشاهده همه سری‌ها</span>
          </a>
        </Link>
        <div className="mt-4 space-y-10">
          <div className="">
            <h1 className="mt-4 text-center text-2xl sm:text-4xl font-bold truncate">
              {selection.title}
            </h1>
            <div className="text-secondary font-medium text-center mt-2">
              {persianNumbers(selection.featuredAt.formatted)}
            </div>
            <p className="mt-2 text-center text-secondary text-lg">
              {selection.description}
            </p>
          </div>

          <div className="grid gap-6 pb-6">
            <RepositoryPreviewList
              networkStatus={networkStatus}
              called={called}
              loading={loading}
              repositories={selection.repositories}
              // adsFrequency={7}
              // adsTemplate={() => (
              //   <PromotionBanner className="rounded-xl overflow-hidden" />
              // )}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SelectionPage;

export const getServerSideProps: GetServerSideProps<SelectionPageProps> =
  async ({ query: { issue }, res }) => {
    if (typeof issue !== 'string')
      return {
        notFound: true,
      };

    const numeralIssue = +issue;
    if (isNaN(numeralIssue)) return { notFound: true };

    const apolloClient = initializeApollo();

    const {
      data: { selectionByIssue: selection },
    } = await apolloClient.query<
      GetSelectionQueryResult['data'],
      GetSelectionQueryVariables
    >({
      query: GetSelectionDocument,
      variables: {
        issue: numeralIssue,
      },
    });

    if (!selection)
      return {
        notFound: true,
      };

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        issue: numeralIssue,
      },
    };
  };
