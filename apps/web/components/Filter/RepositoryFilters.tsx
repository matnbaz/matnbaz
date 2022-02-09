import { useRouterQuery } from 'next-router-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  ForkStatusType,
  RepoOrder,
  TemplateStatusType,
} from '../../lib/graphql-types';
import { Card } from '../UI/Card';
import { ForkStatusFilterItem } from './Repository/ForkStatusFilterItem';
import { LanguageFilterItem } from './Repository/LanguageFilterItem';
import { OrderFilterItem } from './Repository/OrderFilterItem';
import { SearchFilterItem } from './Repository/SearchFilterItem';
import { TemplateStatusFilterItem } from './Repository/TemplateStatusFilterItem';

export interface RepositoryFiltersProps {
  onFiltersUpdate?: (filters: Filters) => unknown;
  onDebouncedFiltersUpdate?: (filters: Filters) => unknown;
}

const initialValue = {
  forkStatus: ForkStatusType.All,
  languages: [],
  order: RepoOrder.TrendingWeekly,
  searchTerm: '',
  templateStatus: TemplateStatusType.All,
};

const queryToFilters = (query) => {
  const forkStatus = Object.values(ForkStatusType).includes(
    query.forkStatus as ForkStatusType
  )
    ? (query.forkStatus as ForkStatusType)
    : initialValue.forkStatus;

  const languages = Array.isArray(query.languages)
    ? query.languages
    : query.languages
    ? [query.languages]
    : initialValue.languages;

  const order = Object.values(RepoOrder).includes(query.order as RepoOrder)
    ? (query.order as RepoOrder)
    : initialValue.order;

  const searchTerm =
    typeof query.searchTerm === 'string'
      ? query.searchTerm
      : initialValue.searchTerm;

  const templateStatus = Object.values(TemplateStatusType).includes(
    query.templateStatus as TemplateStatusType
  )
    ? (query.templateStatus as TemplateStatusType)
    : initialValue.templateStatus;

  return {
    forkStatus,
    languages,
    order,
    searchTerm,
    templateStatus,
  };
};

interface Filters {
  searchTerm: string;
  languages: string[];
  order: RepoOrder;
  forkStatus: ForkStatusType;
  templateStatus: TemplateStatusType;
}
/**
 * @param defaults if defaults is passed, they will be removed in the output
 */
const filterToQueries = (filters: Filters, defaults: Filters) => {
  let filterKeys = Object.keys(filters);
  if (defaults) {
    filterKeys = filterKeys.filter((key) => filters[key] !== defaults[key]);
  }
  return filterKeys.reduce((res, key) => ((res[key] = filters[key]), res), {});
};

export const RepositoryFilters = ({
  onFiltersUpdate,
  onDebouncedFiltersUpdate,
}: RepositoryFiltersProps) => {
  const [state, setState] = useState<Filters>(initialValue);
  const [debouncedState] = useDebounce(state, 500);
  const [queryApplied, setQueryApplied] = useState(false);

  const routerQuery = useRouterQuery();
  const router = useRouter();

  useEffect(() => {
    // State => Query
    if (!queryApplied) return;
    const newQuery = filterToQueries(state, initialValue);
    if (JSON.stringify(routerQuery) === JSON.stringify(newQuery)) return;
    router.push({ query: newQuery }, undefined, { shallow: true });
  }, [state]);

  useEffect(() => {
    // Query => State
    const newState = queryToFilters(routerQuery);
    setState(newState);
    setQueryApplied(true);
  }, []);

  useEffect(() => {
    if (!queryApplied) return;
    onDebouncedFiltersUpdate && onDebouncedFiltersUpdate(debouncedState);
  }, [debouncedState]);

  useEffect(() => {
    if (!queryApplied) return;
    onFiltersUpdate && onFiltersUpdate(state);
  }, [state]);

  return (
    <Card
      padded={false}
      border="desktop"
      className="divide-y divide-gray-100 dark:divide-gray-700"
    >
      <div>
        <OrderFilterItem
          open
          value={state.order}
          onChange={({ value }) => setState({ ...state, order: value })}
        />
      </div>
      <div>
        <SearchFilterItem
          open
          value={state.searchTerm}
          onChange={(value) => setState({ ...state, searchTerm: value })}
        />
      </div>
      <div>
        <LanguageFilterItem
          value={state.languages.map((lang) => ({ value: lang }))}
          onChange={(value) =>
            setState({
              ...state,
              languages: value.map((item) => item.value.toString()),
            })
          }
        />
      </div>
      <div>
        <ForkStatusFilterItem
          value={state.forkStatus}
          onChange={({ value }) => setState({ ...state, forkStatus: value })}
        />
      </div>
      <div>
        <TemplateStatusFilterItem
          value={state.templateStatus}
          onChange={({ value }) =>
            setState({ ...state, templateStatus: value })
          }
        />
      </div>
    </Card>
  );
};
