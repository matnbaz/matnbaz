import Button from '../components/UI/Button';
import { useTheme } from 'next-themes';
import Card from '../components/UI/Card';
import RepositoryPreview from '../components/Repository/RepositoryPreview';
import { useGetRepositoriesQuery } from '../graphql-types';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loaders/RepositoryPreviewSkeletonLoader';

export function Index() {
  const { theme, setTheme } = useTheme();
  const { loading, error, data } = useGetRepositoriesQuery();
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
        {loading ? (
          <>
            <RepositoryPreviewSkeletonLoader />
            <RepositoryPreviewSkeletonLoader />
            <RepositoryPreviewSkeletonLoader />
            <RepositoryPreviewSkeletonLoader />
            <RepositoryPreviewSkeletonLoader />
            <RepositoryPreviewSkeletonLoader />
          </>
        ) : data.repositories.edges.length > 0 ? (
          data.repositories.edges.map((data) => (
            <RepositoryPreview
              key={data.node.fullName}
              repository={data.node}
            />
          ))
        ) : (
          <div>
            <h1 className="text-2xl font-semibold mb-4">نتیجه ای یافت نشد.</h1>
            <span>هیچ نتیجه ای با فیلتر های وارد شده یافت نشد.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
