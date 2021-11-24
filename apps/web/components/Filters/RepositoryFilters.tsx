import { Transition } from '@headlessui/react';
import {
  GetLanguagesQuery,
  GetLanguagesQueryResult,
  GetRepositoriesQueryVariables,
  RepoOrder,
  useGetLanguagesLazyQuery,
  useGetLanguagesQuery,
} from 'apps/web/lib/graphql-types';
import React, { Fragment, useMemo, useReducer, useState } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import LanguagesFilterSkeletonLoader from '../Skeleton Loaders/LanguagesFilterSkeletonLoader';
import Button from '../UI/Button/Button';
import Card from '../UI/Card';
import CheckboxList from '../UI/CheckboxList';
import Collapsible from '../UI/Collapsible';
import Input from '../UI/Input/Input';
import Select from '../UI/Select';
type TRepositoryFiltersAction = {
  type: keyof TRepositoryFiltersState | 'clear';
  payload: any;
};

// TODO: refactor needed for this component
interface IRepositoryFiltersProps {
  onApply?: (state: GetRepositoriesQueryVariables) => void;
}

//! TODO: this is type safe but its ugly. change it

const repoOrderOptions: Record<RepoOrder, { name: string; value: RepoOrder }> =
  {
    CREATED_ASC: { name: 'قدیمی‌ترین', value: RepoOrder.CreatedAsc },
    CREATED_DESC: { name: 'جدید‌ترین', value: RepoOrder.CreatedDesc },
    PUSHED_ASC: { name: 'قدیمی‌ترین تغییر', value: RepoOrder.PushedAsc },
    PUSHED_DESC: { name: 'جدید‌ترین تغییر', value: RepoOrder.PushedDesc },
    STARS_DESC: { name: 'بیشترین تعداد ستاره', value: RepoOrder.StarsDesc },
  };

const initialState: TRepositoryFiltersState = {
  searchTerm: '',
  languages: [],
  order: repoOrderOptions['PUSHED_DESC'],
};

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: GetLanguagesQuery['languages']['edges'][0]['node'][] | null;
  order: { name: string; value: RepoOrder } | null;
};

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  switch (action.type) {
    case 'order':
    case 'languages':
    case 'searchTerm':
      return { ...state, [action.type]: action?.payload };
    case 'clear':
      return initialState;
    default:
      return state;
  }
};

const RepositoryFilters = ({ onApply }: IRepositoryFiltersProps) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  state = state as TRepositoryFiltersState;
  dispatch = dispatch as React.Dispatch<TRepositoryFiltersAction>;

  const [runQuery, { data: languagesNode, loading, error }] =
    useGetLanguagesLazyQuery();

  const [languageSearchInput, setLanguageSearchInput] = useState('');

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
    dispatch({ type: 'searchTerm', payload: event.target.value });
  };

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

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      after: null,
      languages: state.languages.map((language) => language.slug),
      order: state.order.value,
      searchTerm: state.searchTerm,
    });
  };

  return (
    <Card>
      <form onSubmit={formSubmitHandler} className="space-y-6">
        <Collapsible title="مرتب سازی بر اساس" open={true}>
          <Select
            options={Object.values(repoOrderOptions)}
            value={state.order}
            onChange={orderChangeHandler}
          />
        </Collapsible>
        <Collapsible title="جستجوی پروژه" open={true}>
          <Input
            placeholder="جستجو..."
            onChange={searchTermChangeHandler}
            icon={AiOutlineSearch}
            value={state.searchTerm}
            className="w-full"
          />
        </Collapsible>
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
              className="max-h-36 overflow-y-auto mt-4"
              // Languages are all in english
              dir="ltr"
              options={languages}
              value={state.languages}
              onChange={languagesFilterChangeHandler}
            />
          )}
          {loading && (
            <div className="max-h-36 overflow-y-auto mt-4 space-y-4">
              {[...Array(12).keys()].map((index) => (
                <LanguagesFilterSkeletonLoader key={index} />
              ))}{' '}
            </div>
          )}
        </Collapsible>
        <div className="flex space-x-2 items-center space-x-reverse">
          <Button.Primary size="sm" type="submit">
            اعمال
          </Button.Primary>
          <Transition
            show={JSON.stringify(state) !== JSON.stringify(initialState)}
            enter="transition-opacity duration-100 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-100 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Button.Red
              size="sm"
              type="button"
              onClick={() => {
                dispatch({ type: 'clear', payload: null });
              }}
            >
              حذف فیلتر ها
            </Button.Red>
          </Transition>
        </div>
      </form>
    </Card>
  );
};

export default RepositoryFilters;
