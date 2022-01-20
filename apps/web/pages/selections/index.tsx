import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { SelectionPreviewList } from '../../components/Selection/SelectionPreviewList';
import { useGetSelectionsQuery } from '../../lib/graphql-types';

interface SelectionsPageProps {
  issue: number;
}

const SelectionsPage: NextPage<SelectionsPageProps> = ({ issue }) => {
  const { data, fetchMore, loading, networkStatus, called } =
    useGetSelectionsQuery({
      notifyOnNetworkStatusChange: true,
    });

  if (!data) return <></>;
  const selections = data.selections;

  const selectionsLoadMoreHandler = () => {
    if (!selections.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: selections.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="پروژه‌های منتخب"
        description="هر آخر هفته در متن‌باز پروژه‌هایی به عنوان پروژه‌های منتخب انتخاب شده و در سایت و شبکه‌های اجتماعی متن‌باز قرار می‌گیرند."
      />

      <PageHeader
        title="پروژه‌های منتخب"
        description="هر آخر هفته در متن‌باز پروژه‌هایی به عنوان پروژه‌های منتخب انتخاب شده و در سایت و شبکه‌های اجتماعی متن‌باز قرار می‌گیرند."
      />

      <div className="max-w-3xl mx-auto">
        <div className="grid gap-6 pb-6">
          <SelectionPreviewList
            networkStatus={networkStatus}
            called={called}
            loading={loading}
            onLoadMore={selectionsLoadMoreHandler}
            selections={selections.edges.map((edge) => edge.node)}
            // adsFrequency={7}
            // adsTemplate={() => (
            //   <PromotionBanner className="rounded-xl overflow-hidden" />
            // )}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default SelectionsPage;
