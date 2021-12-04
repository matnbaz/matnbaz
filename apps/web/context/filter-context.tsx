import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  initialState,
  TRepositoryFiltersState,
} from '../components/Filter/RepositoryFilters';

interface IFilterContext {
  filters: TRepositoryFiltersState;
  setFilters?: Dispatch<SetStateAction<TRepositoryFiltersState>>;
}

const FilterContext = createContext<IFilterContext>({ filters: initialState });

export const FilterContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<TRepositoryFiltersState>(initialState);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export default FilterContext;
