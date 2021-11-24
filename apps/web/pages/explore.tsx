import Card from '../components/UI/Card';

import {
  GetRepositoriesQueryVariables,
  RepoOrder,
  useGetRepositoriesQuery,
} from '../lib/graphql-types';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loaders/RepositoryPreviewSkeletonLoader';

import RepositoryPreviewList from '../components/Repository/RepositoryPreviewList';
import MainLayout from '../components/Layouts/MainLayout';
import MultiSelectWIP from '../components/UI/MultiSelectWIP';
import Input from '../components/UI/Input/Input';
import { AiOutlineSearch } from 'react-icons/ai';
import Collapsible from '../components/UI/Collapsible';
import PrimaryButton from '../components/UI/Button/PrimaryButton';
import Button from '../components/UI/Button/Button';
import { useState } from 'react';
import RepositoryFilters, {
  TRepositoryFiltersState,
} from '../components/Filters/RepositoryFilters';

const Explore = () => {
  const { loading, data, fetchMore, refetch } = useGetRepositoriesQuery();
  const repositories = data?.repositories.edges;
  const repositoriesPageInfo = data?.repositories.pageInfo;
  const repositoriesLoadMoreHandler = () => {
    if (!repositoriesPageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: repositoriesPageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-8 pt-4 px-6 pb-6 gap-y-6 gap-x-0 md:gap-x-6">
        <div className="md:col-span-2">
          <RepositoryFilters onApply={refetch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-0 md:gap-x-6 md:col-span-6">
          {loading ? (
            <>
              {[...Array(6).keys()].map((number) => (
                <RepositoryPreviewSkeletonLoader key={number} />
              ))}
            </>
          ) : data.repositories.edges.length ? (
            <RepositoryPreviewList
              repositories={repositories}
              onLoadMore={repositoriesLoadMoreHandler}
            />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                نتیجه ای یافت نشد.
              </h1>
              <span>هیچ نتیجه ای با فیلتر های وارد شده یافت نشد.</span>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
