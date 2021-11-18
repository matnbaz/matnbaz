import Button from '../components/UI/Button';
import { useTheme } from 'next-themes';
import Card from '../components/UI/Card';
import RepositoryPreview from '../components/Repository/RepositoryPreview';
import { gql, useQuery } from '@apollo/client';
import { useGetRepositoriesQuery } from '../graphql-types';

const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          fullName
          description
          stargazerscount
          forksCount
          openIssuesCount
          language {
            name
            color
          }
          owner {
            type
            platformId
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function Index() {
  const { theme, setTheme } = useTheme();
  const { loading, error, data } = useGetRepositoriesQuery();
  if (loading) return <span>TODO HANDLE LOADING</span>;
  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <div>
        <Card>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            toggle
          </Button>
        </Card>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 col-span-4 md:col-span-3">
        {data.repositories.edges.map((data) => (
          <RepositoryPreview key={data.node.fullName} repository={data.node} />
        ))}
      </div>
    </div>
  );
}

export default Index;
