import { Transition } from '@headlessui/react';
import {
  GetLanguagesQuery,
  GetLanguagesQueryResult,
  useGetLanguagesQuery,
} from 'apps/web/lib/graphql-types';
import React, { Fragment, useMemo, useReducer, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import Card from '../UI/Card';
import CheckboxList from '../UI/CheckboxList';
import Collapsible from '../UI/Collapsible';
import Input from '../UI/Input/Input';

type TRepositoryFiltersAction = {
  type: keyof TRepositoryFiltersState | 'clear';
  payload: any;
};
interface IRepositoryFiltersProps {
  onApply?: (state: TRepositoryFiltersState) => void;
}

const initialState: TRepositoryFiltersState = {
  searchTerm: '',
  languages: [],
};

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: string[] | null;
};

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  switch (action.type) {
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
  const { data: languagesNode, loading, error } = useGetLanguagesQuery();

  const [languageSearchInput, setLanguageSearchInput] = useState('');

  const [selectedLanguages, setSelectedLanguages] = useState([]);

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

  let [state, dispatch] = useReducer(reducer, initialState);
  state = state as TRepositoryFiltersState;
  dispatch = dispatch as React.Dispatch<TRepositoryFiltersAction>;

  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: 'searchTerm', payload: event.target.value });
  };

  const languagesFilterChangeHandler = (
    value: GetLanguagesQuery['languages']['edges'][0]['node'][]
  ) => {
    setSelectedLanguages(value);
    dispatch({
      type: 'languages',
      // Since languages filter is based on slug, it should be mapped before changing the state
      payload: value.map((language) => language.slug),
    });
  };

  return (
    <Card>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onApply(state);
        }}
        className="space-y-6"
      >
        <Collapsible title="جستجوی پروژه" open={true}>
          <Input
            placeholder="جستجو..."
            onChange={searchTermChangeHandler}
            icon={AiOutlineSearch}
            value={state.searchTerm}
            className="w-full"
          />
        </Collapsible>
        <Collapsible title="زبان برنامه نویسی" open={true}>
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
              value={selectedLanguages}
              onChange={languagesFilterChangeHandler}
            />
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
              type="submit"
              onClick={() => {
                setSelectedLanguages([]);
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
