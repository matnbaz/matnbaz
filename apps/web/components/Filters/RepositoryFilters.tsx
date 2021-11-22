import React, { useReducer } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import Card from '../UI/Card';
import Collapsible from '../UI/Collapsible';
import Input from '../UI/Input';

export type TRepositoryFiltersState = {
  searchTerm: string | null;
};

type TRepositoryFiltersAction = { type: 'searchTerm'; payload: string };

interface IRepositoryFilters {
  onApply?: (state: TRepositoryFiltersState) => void;
}

const initialState: TRepositoryFiltersState = { searchTerm: null };

const reducer = (
  state: TRepositoryFiltersState,
  action: TRepositoryFiltersAction
): TRepositoryFiltersState => {
  const { type, payload } = action;
  switch (type) {
    case 'searchTerm':
      return { ...state, [type]: payload };
    default:
      return state;
  }
};

const RepositoryFilters = ({ onApply }: IRepositoryFilters) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  state = state as TRepositoryFiltersState;
  dispatch = dispatch as React.Dispatch<TRepositoryFiltersAction>;

  const searchTermChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: 'searchTerm', payload: event.target.value });
  };

  return (
    <Card>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onApply(state);
        }}
      >
        <Collapsible title="جستجوی پروژه" open={true}>
          <Input
            placeholder="جستجو..."
            onChange={searchTermChangeHandler}
            icon={AiOutlineSearch}
            className="w-full"
          />
        </Collapsible>
        <Button.Primary className="mt-4" size="sm" type="submit">
          اعمال
        </Button.Primary>
      </form>
    </Card>
  );
};

export default RepositoryFilters;
