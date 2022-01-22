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

  const selectionsLoadMoreHandler = () => {
    if (!data?.selections.pageInfo.hasNextPage) return;
    console.log(data.selections.pageInfo.endCursor);
    fetchMore({
      variables: {
        after: data.selections.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="پروژه‌های منتخب"
        description={`هر آخر‌هفته پروژه‌هایی به عنوان «پروژه‌های منتخب» انتخاب شده و در سایت و شبکه‌های اجتماعی متن‌باز معرفی می‌شوند.`}
      />

      <PageHeader
        title="پروژه‌های منتخب"
        description="هر آخر هفته در متن‌باز پروژه‌هایی به عنوان «پروژه‌های منتخب» انتخاب شده و در سایت و شبکه‌های اجتماعی متن‌باز قرار می‌گیرند."
      />

      <div className="max-w-3xl mx-auto">
        {data?.selections.edges.length > 0 ? (
          <div className="grid gap-6 pb-6">
            <SelectionPreviewList
              networkStatus={networkStatus}
              called={called}
              loading={loading}
              onLoadMore={selectionsLoadMoreHandler}
              selections={data.selections.edges.map((edge) => edge.node)}
              // adsFrequency={7}
              // adsTemplate={() => (
              //   <PromotionBanner className="rounded-xl overflow-hidden" />
              // )}
            />
          </div>
        ) : (
          <p className="text-center font-bold">هنوز پروژه‌ای منتخب نشده‌است.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default SelectionsPage;
