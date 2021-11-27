import { Transition } from '@headlessui/react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  ForkStatusType,
  GetLanguagesQuery,
  GetRepositoriesQueryVariables,
  RepoOrder,
  TemplateStatusType,
  useGetLanguagesLazyQuery,
} from '../../lib/graphql-types';
import LanguagesFilterSkeletonLoader from '../Skeleton Loaders/LanguagesFilterSkeletonLoader';
import Button from '../UI/Button/Button';
import Card from '../UI/Card';
import CheckboxList from '../UI/CheckboxList';
import Collapsible from '../UI/Collapsible';
import Input from '../UI/Input/Input';
import RadioList from '../UI/RadioList';
import { useDebounce } from 'use-debounce';
import classNames from 'classnames';

type TRepositoryFiltersAction = {
  type: keyof TRepositoryFiltersState | 'clear';
  payload: any;
};

interface IRepositoryFiltersProps {
  loading?: boolean;
  onApply?: (state: GetRepositoriesQueryVariables) => void;
}

const repoOrderOptions: Record<RepoOrder, { name: string; value: RepoOrder }> =
  {
    CREATED_ASC: { name: 'قدیمی‌ترین', value: RepoOrder.CreatedAsc },
    CREATED_DESC: { name: 'جدید‌ترین', value: RepoOrder.CreatedDesc },
    PUSHED_ASC: { name: 'قدیمی‌ترین تغییر', value: RepoOrder.PushedAsc },
    PUSHED_DESC: { name: 'جدید‌ترین تغییر', value: RepoOrder.PushedDesc },
    STARS_DESC: { name: 'بیشترین تعداد ستاره', value: RepoOrder.StarsDesc },
  };

const forkStatusOptions: Record<
  ForkStatusType,
  { name: string; value: ForkStatusType }
> = {
  ALL: { name: 'همه', value: ForkStatusType.All },
  FORK: { name: 'فورک', value: ForkStatusType.Fork },
  SOURCE: { name: 'سورس', value: ForkStatusType.Source },
};

const templateStatusOptions: Record<
  TemplateStatusType,
  { name: string; value: TemplateStatusType }
> = {
  ALL: { name: 'همه', value: TemplateStatusType.All },
  NOT_TEMPLATE: { name: 'غیر قالب', value: TemplateStatusType.NotTemplate },
  TEMPLATE: { name: 'قالب', value: TemplateStatusType.Template },
};

const initialState: TRepositoryFiltersState = {
  searchTerm: '',
  languages: [],
  order: repoOrderOptions['PUSHED_DESC'],
  forkStatus: forkStatusOptions['ALL'],
  templateStatus: templateStatusOptions['ALL'],
};

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: GetLanguagesQuery['languages']['edges'][0]['node'][] | null;
  order: { name: string; value: RepoOrder } | null;
  forkStatus: { name: string; value: ForkStatusType };
  templateStatus: { name: string; value: TemplateStatusType };
};

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  switch (action.type) {
    case 'clear':
      return initialState;
    default:
      return { ...state, [action.type]: action?.payload };
  }
};

const RepositoryFilters = ({
  onApply,
  loading = false,
}: IRepositoryFiltersProps) => {
  let [state, dispatch] = useReducer(useCallback(reducer, []), initialState);
  state = state as TRepositoryFiltersState;
  dispatch = dispatch as React.Dispatch<TRepositoryFiltersAction>;

  const [
    runQuery,
    {
      data: languagesNode,
      loading: languagesLoading,
      error,
      refetch: refetchLanguages,
    },
  ] = useGetLanguagesLazyQuery();

  const [languageSearchInput, setLanguageSearchInput] = useState('');
  const [repoSearchInput, setRepoSearchInput] = useState('');
  const [debouncedRepoSearchInput] = useDebounce(repoSearchInput, 1000);

  const languages = useMemo(() => {
    // First the returned languages must be mapped because they are paginated and they have nodes
    const mappedLanguages = languagesNode?.languages.edges.map(
      (edge) => edge.node
    );
    if (languageSearchInput.length < 1) return mappedLanguages;
    // Then they must be filtered if the user searched for a specific language
    return mappedLanguages.filter((language) =>
      language?.slug?.toLowerCase().includes(languageSearchInput.toLowerCase())
    );
  }, [languagesNode, languageSearchInput]);

  // Filter handlers

  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepoSearchInput(event.target.value);
  };

  useEffect(() => {
    dispatch({ type: 'searchTerm', payload: debouncedRepoSearchInput });
  }, [debouncedRepoSearchInput]);

  const languagesFilterChangeHandler = (
    value: GetLanguagesQuery['languages']['edges'][0]['node'][]
  ) => {
    dispatch({
      type: 'languages',
      // Since languages filter is based on slug, it should be mapped before changing the state
      payload: value,
    });
  };

  const orderChangeHandler = (order) => {
    dispatch({ type: 'order', payload: order });
  };

  const forkStatusChangeHandler = (forkStatus) => {
    dispatch({ type: 'forkStatus', payload: forkStatus });
  };

  const templateStatusChangeHandler = (forkStatus) => {
    dispatch({ type: 'templateStatus', payload: forkStatus });
  };

  useEffect(() => {
    if (loading) return;
    onApply({
      after: null,
      languages: state.languages.map((language) => language.slug),
      order: state.order.value,
      searchTerm: state.searchTerm,
      forkStatus: state.forkStatus.value,
      templateStatus: state.templateStatus.value,
    });
    // Dependency has to be stringified state as react can't compare two objects in useEffect
    // So it will always trigger this useEffect regardless of the state changing or not
  }, [JSON.stringify(state)]);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute z-20 w-full h-full bg-white/70 dark:bg-gray-900/70" />
      )}
      <div className="space-y-6">
        <Card>
          <Collapsible title="مرتب سازی بر اساس" open={true}>
            <RadioList
              options={Object.values(repoOrderOptions)}
              value={state.order}
              onChange={orderChangeHandler}
            />
          </Collapsible>
        </Card>
        <Card>
          <Collapsible title="جستجوی پروژه" open={true}>
            <Input
              placeholder="جستجو..."
              onChange={searchTermChangeHandler}
              icon={AiOutlineSearch}
              value={repoSearchInput}
              className="w-full"
            />
          </Collapsible>
        </Card>
        <Card>
          <Collapsible
            title="زبان برنامه نویسی"
            onClick={() => {
              // Remove this listener and don't use lazy useQuery if open is set to true for this collapsible
              if (!languagesNode && !error) runQuery();
            }}
          >
            <Input
              placeholder="جستجو..."
              onChange={(event) => {
                setLanguageSearchInput(event.target.value);
              }}
              icon={AiOutlineSearch}
              className="w-full"
            />
            {languages && (
              <CheckboxList
                className="max-h-52 overflow-y-auto mt-4"
                // Languages are all in english
                dir="ltr"
                options={languages}
                value={state.languages}
                onChange={languagesFilterChangeHandler}
              />
            )}
            {error && (
              <div className="flex flex-col space-y-2 items-center mt-2">
                <span>خطایی رخ داد</span>
                <Button.Primary
                  size="sm"
                  onClick={() => {
                    refetchLanguages();
                  }}
                >
                  امتحان مجدد
                </Button.Primary>
              </div>
            )}
            {languagesLoading && (
              <div className="max-h-52 overflow-y-auto mt-4 space-y-4">
                {[...Array(12).keys()].map((index) => (
                  <LanguagesFilterSkeletonLoader key={index} />
                ))}{' '}
              </div>
            )}
          </Collapsible>
        </Card>
        <Card>
          <Collapsible title="وضعیت فورک">
            <RadioList
              options={Object.values(forkStatusOptions)}
              value={state.forkStatus}
              onChange={forkStatusChangeHandler}
            />
          </Collapsible>
        </Card>
        <Card>
          <Collapsible title="وضعیت قالب">
            <RadioList
              options={Object.values(templateStatusOptions)}
              value={state.templateStatus}
              onChange={templateStatusChangeHandler}
            />
          </Collapsible>
        </Card>

        <Transition
          show={JSON.stringify(state) !== JSON.stringify(initialState)}
          enter="transition-opacity duration-100 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Button.Primary
            size="md"
            type="button"
            onClick={() => {
              dispatch({ type: 'clear', payload: null });
            }}
          >
            حذف فیلتر ها
          </Button.Primary>
        </Transition>
      </div>
    </div>
  );
};

export default RepositoryFilters;
