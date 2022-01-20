import { useMemo } from 'react';
import { InfiniteScroll } from '../Feature/InfiniteScroll';
import { SelectionPreviewSkeletonLoader } from '../Skeleton Loader/SelectionPreviewSkeletonLoader';
import { ISelectionPreviewProps, SelectionPreview } from './SelectionPreview';

interface ISelectionPreviewListProps {
  selections: ISelectionPreviewProps['selection'][];
  adsFrequency?: number;
  adsTemplate?: () => JSX.Element;
  loading?: boolean;
}

export interface ISelectionPreviewListPropsWithoutPagination
  extends ISelectionPreviewListProps {
  networkStatus?: never;
  called?: never;
  onLoadMore?: never;
}

export interface ISelectionPreviewListPropsWithPagination
  extends ISelectionPreviewListProps {
  loading: boolean;
  onLoadMore?: () => void;
  networkStatus?: number;
  called?: boolean;
}

export const SelectionPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  selections,
  adsFrequency,
  adsTemplate,
  onLoadMore,
}:
  | ISelectionPreviewListPropsWithPagination
  | ISelectionPreviewListPropsWithoutPagination) => {
  const mappedRepositories = useMemo(() => {
    return selections?.map((selection, index) => (
      <>
        <SelectionPreview padded selection={selection} key={selection.id} />
        {index !== 1 &&
          adsFrequency &&
          (index + 1) % adsFrequency === 0 &&
          adsTemplate()}
      </>
    ));
  }, [selections]);

  const skeletonLoaders = useMemo(
    () =>
      [...Array(8).keys()].map((number) => (
        <SelectionPreviewSkeletonLoader padded key={number} />
      )),
    []
  );

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll
      onLoadMore={onLoadMore}
      dataLength={selections?.length || 0}
    >
      {
        // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
        // In this case we don't want skeleton loaders to appear when the user is trying to load more data
        // So it checks if it's not 3 (fetchMore)
      }

      {(loading && networkStatus !== 3) || !called
        ? skeletonLoaders
        : mappedRepositories}
      {networkStatus === 3 &&
        [...Array(2).keys()].map((number) => (
          <SelectionPreviewSkeletonLoader padded key={number} />
        ))}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{loading ? skeletonLoaders : mappedRepositories}</>
  );
};
