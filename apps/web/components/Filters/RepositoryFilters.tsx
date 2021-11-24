import { Transition } from '@headlessui/react';
import React, { useMemo, useReducer, useState } from 'react';
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

  const forkStatusChangeHandler = (forkStatus) => {
    dispatch({ type: 'forkStatus', payload: forkStatus });
  };

  const templateStatusChangeHandler = (forkStatus) => {
    dispatch({ type: 'templateStatus', payload: forkStatus });
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      after: null,
      languages: state.languages.map((language) => language.slug),
      order: state.order.value,
      searchTerm: state.searchTerm,
      forkStatus: state.forkStatus.value,
      templateStatus: state.templateStatus.value,
    });
  };

  return (
    <Card>
      <form onSubmit={formSubmitHandler} className="space-y-6">
        <Collapsible title="مرتب سازی بر اساس" open={true}>
          <RadioList
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
        <Collapsible title="وضعیت فورک">
          <RadioList
            options={Object.values(forkStatusOptions)}
            value={state.forkStatus}
            onChange={forkStatusChangeHandler}
          />
        </Collapsible>
        <Collapsible title="وضعیت قالب">
          <RadioList
            options={Object.values(templateStatusOptions)}
            value={state.templateStatus}
            onChange={templateStatusChangeHandler}
          />
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
