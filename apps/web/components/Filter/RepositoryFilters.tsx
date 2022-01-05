import { Transition } from '@headlessui/react';
import { useRouter } from 'next/dist/client/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from 'use-debounce';
import {
  forkStatusOptions,
  initialFilters,
  repoOrderOptions,
  templateStatusOptions,
  TRepositoryFiltersState,
  useRepositoryFilterContext,
} from '../../context/repository-filter-context';
import {
  GetLanguagesQuery,
  GetRepositoriesQueryVariables,
  useGetLanguagesLazyQuery,
} from '../../lib/graphql-types';
import LanguagesFilterSkeletonLoader from '../Skeleton Loader/LanguagesFilterSkeletonLoader';
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

interface IRepositoryFiltersProps {
  loading?: boolean;
  called: boolean;
  refetch: (variables: GetRepositoriesQueryVariables) => void;
  query: ({ variables: GetRepositoriesQueryVariables }) => void;
  onApply?: (state: GetRepositoriesQueryVariables) => void;
}

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  switch (action.type) {
    case 'clear':
      return initialFilters;
    default:
      return { ...state, [action.type]: action?.payload };
  }
};

const RepositoryFilters = ({
  onApply,
  refetch,
  query,
  called,
  loading = false,
}: IRepositoryFiltersProps) => {
  const filterCtx = useRepositoryFilterContext();

  let [state, dispatch] = useReducer(
    useCallback(reducer, []),
    filterCtx.filters
  );
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
  const [debouncedState] = useDebounce(state, 500);

  const languages = useMemo(() => {
    // First the returned languages must be mapped because they are paginated and they have nodes
    const mappedLanguages = languagesNode?.languages.edges.map(
      (edge) => edge.node
    );
    if (languageSearchInput.length < 1) return mappedLanguages;
    // Then they must be filtered if the user searched for a specific language
    return mappedLanguages?.filter(
      (language) =>
        language?.slug
          ?.toLowerCase()
          .includes(languageSearchInput.toLowerCase()) ||
        language?.name
          ?.toLowerCase()
          .includes(languageSearchInput.toLowerCase())
    );
  }, [languagesNode, languageSearchInput]);

  const router = useRouter();
  const routerParams = useMemo(() => router.query, [router.query]);

  useEffect(() => {
    // First we get the key of each given param and we loop them
    Object.keys(routerParams).forEach(
      // And we assume that they are of the type repository filters action
      (routerParam: TRepositoryFiltersAction['type']) => {
        const paramValue = routerParams[routerParam];
        // The param value might be an array so this variable only returns the first element if thats the case
        // And returns the whole value if its not an array
        const paramValueFirstElement = Array.isArray(paramValue)
          ? paramValue[0]
          : paramValue;

        // If initial state doesn't have the given router param, it means that it's redundant and setting it would be pointless
        // So we return
        if (!Object.keys(initialFilters).includes(routerParam)) return;
        // At this point we are sure that the given router param does exist in our state

        switch (routerParam) {
          case 'order':
            // If the param value doesn't exist in the order options, we default to the initial state value
            // The same logic repeats for some of the cases below
            dispatch({
              type: 'order',
              payload:
                repoOrderOptions[paramValueFirstElement] ||
                initialFilters.order,
            });
            break;
          case 'forkStatus':
            dispatch({
              type: 'forkStatus',
              payload:
                forkStatusOptions[paramValueFirstElement] ||
                initialFilters.forkStatus,
            });
            break;
          case 'languages':
            runQuery();
            break;
          case 'templateStatus':
            dispatch({
              type: 'templateStatus',
              payload:
                templateStatusOptions[paramValueFirstElement] ||
                initialFilters.templateStatus,
            });
            break;
          case 'searchTerm':
            dispatch({ type: 'searchTerm', payload: paramValueFirstElement });
            break;
          default:
            dispatch({ type: routerParam, payload: paramValue });
        }
      }
    );
  }, [JSON.stringify(routerParams)]);

  useEffect(() => {
    const paramValue = routerParams['languages'];
    if (!paramValue?.length || !languages?.length) return;
    // If there is only one language in filters, it will be returned as a string
    // And since we treat languages as an array, we convert it to an array if its a string
    const paramValueArray = Array.isArray(paramValue)
      ? paramValue
      : [paramValue];
    dispatch({
      type: 'languages',
      payload: languages.filter((language) =>
        paramValueArray.includes(language.slug)
      ),
    });
  }, [JSON.stringify(languages)]);

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
      payload: value,
    });
  };

  const orderChangeHandler = (order) => {
    dispatch({ type: 'order', payload: order });
  };

  const forkStatusChangeHandler = (forkStatus) => {
    dispatch({ type: 'forkStatus', payload: forkStatus });
  };

  const templateStatusChangeHandler = (templateStatus) => {
    dispatch({ type: 'templateStatus', payload: templateStatus });
  };

  useEffect(() => {
    // If the router isn't ready, we can't check if url params are existent so we return early
    // And if languages are loading or the repositories themselves are loading, sending filters will be redundant
    if (loading || !router.isReady || languagesLoading) return;

    const convertedState = {
      languages: debouncedState.languages.map((language) => language.slug),
      order: debouncedState.order.value,
      searchTerm: debouncedState.searchTerm,
      forkStatus: debouncedState.forkStatus.value,
      templateStatus: debouncedState.templateStatus.value,
    };

    // If there are already some repositories, then we need to refetch
    if (called) refetch(convertedState);
    // Otherwise it means that we are fetching for the first time, so we avoid calling refetch
    else query({ variables: convertedState });

    onApply?.(convertedState);

    // Change query params to match the current filters
    router.push({
      // Filter the state so its not equal to the initial state
      // Because its redundant to have initial state filters in the url
      query: Object.keys(convertedState)
        .filter((key) => debouncedState[key] !== initialFilters[key])
        .reduce((res, key) => ((res[key] = convertedState[key]), res), {}),
    });

    filterCtx.setFilters(debouncedState);
    // Dependency has to be stringified state as react can't compare two objects in useEffect
    // So it will always trigger this useEffect regardless of the state changing or not
  }, [JSON.stringify(debouncedState)]);

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
          <Collapsible title="جستجوی پروژه">
            <Input
              placeholder="جستجو..."
              onChange={searchTermChangeHandler}
              icon={AiOutlineSearch}
              value={state.searchTerm}
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
            {languages && languages.length ? (
              <CheckboxList
                className="max-h-52 overflow-y-auto mt-4"
                // Languages are all in english
                dir="ltr"
                options={languages}
                value={state.languages}
                onChange={languagesFilterChangeHandler}
              />
            ) : (
              !languagesLoading && (
                <div className="mt-4 text-sm text-secondary">
                  <span>نتیجه ای پیدا نشد.</span>
                </div>
              )
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
          <Collapsible title="وضعیت قالب (Template)">
            <RadioList
              options={Object.values(templateStatusOptions)}
              value={state.templateStatus}
              onChange={templateStatusChangeHandler}
            />
          </Collapsible>
        </Card>

        <Transition
          show={JSON.stringify(state) !== JSON.stringify(initialFilters)}
          enter="transition-opacity duration-100 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Button.Ghost
            size="sm"
            type="button"
            onClick={() => {
              dispatch({ type: 'clear', payload: null });
            }}
          >
            حذف فیلتر‌ها
          </Button.Ghost>
        </Transition>
      </div>
    </div>
  );
};

export default RepositoryFilters;
