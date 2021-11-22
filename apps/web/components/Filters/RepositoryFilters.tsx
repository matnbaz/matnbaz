import {
  GetLanguagesQuery,
  GetLanguagesQueryResult,
  useGetLanguagesQuery,
} from 'apps/web/lib/graphql-types';
import React, { useMemo, useReducer } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import Card from '../UI/Card';
import CheckboxList from '../UI/CheckboxList';
import Collapsible from '../UI/Collapsible';
import Input from '../UI/Input/Input';

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: string[] | null;
};

type TRepositoryFiltersAction =
  | { type: 'searchTerm'; payload: string }
  | {
      type: 'languages';
      payload: string[];
    };

interface IRepositoryFilters {
  onApply?: (state: TRepositoryFiltersState) => void;
}

const initialState: TRepositoryFiltersState = {
  searchTerm: null,
  languages: null,
};

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  switch (action.type) {
    case 'languages':
    case 'searchTerm':
      return { ...state, [action.type]: action?.payload };
    default:
      return state;
  }
};

const RepositoryFilters = ({ onApply }: IRepositoryFilters) => {
  const { data: languagesNode, loading, error } = useGetLanguagesQuery();

  const languages = useMemo(() => {
    return languagesNode?.languages.edges.map((edge) => edge.node);
  }, [languagesNode]);

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
    dispatch({
      type: 'languages',
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
            className="w-full"
          />
        </Collapsible>
        <Collapsible title="زبان برنامه نویسی" open={true}>
          <Input
            placeholder="جستجو..."
            onChange={searchTermChangeHandler}
            icon={AiOutlineSearch}
            className="w-full"
          />
          {languages && (
            <CheckboxList
              className="max-h-36 overflow-y-auto mt-4"
              // Languages are all in english
              dir="ltr"
              options={languages}
              onChange={languagesFilterChangeHandler}
            />
          )}
        </Collapsible>
        <div className="flex space-x-2 items-center space-x-reverse">
          <Button.Primary size="sm" type="submit">
            اعمال
          </Button.Primary>
        </div>
      </form>
    </Card>
  );
};

export default RepositoryFilters;
