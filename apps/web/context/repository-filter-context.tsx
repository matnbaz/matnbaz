import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  ForkStatusType,
  GetLanguagesQuery,
  RepoOrder,
  TemplateStatusType,
} from '../lib/graphql-types';

export const repoOrderOptions: Record<string, { value: RepoOrder }> = {
  TRENDING_WEEKLY: { value: RepoOrder.TrendingWeekly },
  STARS_DESC: { value: RepoOrder.StarsDesc },
  CREATED_DESC: { value: RepoOrder.CreatedDesc },
  PUSHED_DESC: { value: RepoOrder.PushedDesc },
};

export const forkStatusOptions: Record<
  ForkStatusType,
  { value: ForkStatusType }
> = {
  ALL: { value: ForkStatusType.All },
  FORK: { value: ForkStatusType.Fork },
  SOURCE: { value: ForkStatusType.Source },
};

export const templateStatusOptions: Record<
  TemplateStatusType,
  { value: TemplateStatusType }
> = {
  ALL: { value: TemplateStatusType.All },
  NOT_TEMPLATE: { value: TemplateStatusType.NotTemplate },
  TEMPLATE: { value: TemplateStatusType.Template },
};

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: GetLanguagesQuery['languages']['edges'][0]['node'][] | null;
  order: { value: RepoOrder } | null;
  forkStatus: { value: ForkStatusType };
  templateStatus: { value: TemplateStatusType };
};

export const initialFilters: TRepositoryFiltersState = {
  searchTerm: '',
  languages: [],
  order: repoOrderOptions['TRENDING_WEEKLY'],
  forkStatus: forkStatusOptions['ALL'],
  templateStatus: templateStatusOptions['ALL'],
};

interface RepositoryFilterContext {
  filters: TRepositoryFiltersState;
  setFilters?: Dispatch<SetStateAction<TRepositoryFiltersState>>;
}

const RepositoryFilterContext = createContext<RepositoryFilterContext>({
  filters: initialFilters,
});

export const RepositoryFilterContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] =
    useState<TRepositoryFiltersState>(initialFilters);
  return (
    <RepositoryFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </RepositoryFilterContext.Provider>
  );
};

export const useRepositoryFilterContext = () => {
  return useContext(RepositoryFilterContext);
};

export default RepositoryFilterContext;
