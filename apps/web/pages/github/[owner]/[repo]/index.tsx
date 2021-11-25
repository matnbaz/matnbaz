import { GetServerSideProps } from 'next';
import MainLayout from '../../../../components/Layouts/MainLayout';
import { initializeApollo } from '../../../../lib/apollo';
import {
  GetRepositoryDocument,
  GetRepositoryQueryResult,
  GetRepositoryQueryVariables,
  PlatformType,
  useGetRepositoryQuery,
} from '../../../../lib/graphql-types';

interface RepositoryPageProps {
  repoSlug: string;
  ownerSlug: string;
}
const RepositoryPage = ({ ownerSlug, repoSlug }: RepositoryPageProps) => {
  const {
    data: { repositoryByPlatform: repository },
  } = useGetRepositoryQuery({
    variables: {
      owner: ownerSlug,
      repo: repoSlug,
      platform: PlatformType.GitHub,
    },
  });

  return (
    <MainLayout>
      <pre>
        {repository.fullName} - {repository.stargazersCount} stars
      </pre>
    </MainLayout>
  );
};

export default RepositoryPage;

export const getServerSideProps: GetServerSideProps<RepositoryPageProps> =
  async ({ query: { owner, repo }, res }) => {
    if (typeof owner !== 'string' || typeof repo !== 'string')
      return {
        redirect: { permanent: false, destination: '/' },
        props: { ownerSlug: '', repoSlug: '' },
      };

    const apolloClient = initializeApollo();

    const {
      data: { data },
    } = await apolloClient.query<
      GetRepositoryQueryResult,
      GetRepositoryQueryVariables
    >({
      query: GetRepositoryDocument,
      variables: {
        owner,
        repo,
        platform: PlatformType.GitHub,
      },
    });

    if (!data)
      return {
        redirect: { permanent: false, destination: '/' },
        props: { ownerSlug: '', repoSlug: '' },
      };

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        repoSlug: repo,
        ownerSlug: owner,
      },
    };
  };
