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

export const getServerSideProps = async ({ query: { owner, repo }, res }) => {
  if (typeof owner !== 'string' || typeof repo !== 'string')
    return { redirect: '/' };

  const apolloClient = initializeApollo();

  await apolloClient.query<
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

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      repoSlug: repo,
      ownerSlug: owner,
    },
  };
};
