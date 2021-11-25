import RepositoryPreviewList from '../../../components/Repository/RepositoryPreviewList';
import MainLayout from '../../../components/Layouts/MainLayout';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetOwnerDocument,
  GetOwnerQueryResult,
  GetOwnerQueryVariables,
  PlatformType,
  useGetOwnerQuery,
} from '../../../lib/graphql-types';
import { GetServerSideProps } from 'next';

interface OwnerPageProps {
  ownerSlug: string;
}

const OwnerPage = ({ ownerSlug }) => {
  const {
    data: { ownerByPlatform: owner },
  } = useGetOwnerQuery({
    variables: { owner: ownerSlug, platform: PlatformType.GitHub },
  });
  return (
    <MainLayout>
      <pre>{owner.login} repos</pre>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:col-span-5 lg:col-span-6 auto-rows-min">
        <RepositoryPreviewList
          repositories={owner.repositories.edges.map((edge) => ({
            ...edge,
            node: { ...edge.node, owner },
          }))}
        />
      </div>
    </MainLayout>
  );
};

export default OwnerPage;

export const getServerSideProps: GetServerSideProps<OwnerPageProps> = async ({
  query: { owner },
  res,
}) => {
  if (typeof owner !== 'string')
    return {
      redirect: { permanent: false, destination: '/' },
      props: { ownerSlug: '' },
    };

  const apolloClient = initializeApollo();

  const {
    data: { data },
  } = await apolloClient.query<GetOwnerQueryResult, GetOwnerQueryVariables>({
    query: GetOwnerDocument,
    variables: {
      owner,
      platform: PlatformType.GitHub,
    },
  });

  if (!data)
    return {
      redirect: { permanent: false, destination: '/' },
      props: { ownerSlug: owner },
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      ownerSlug: owner,
    },
  };
};
