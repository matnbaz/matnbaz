import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from 'use-debounce';
import { useGetSearchedRepositoriesLazyQuery } from '../../lib/graphql-types';
import Input from '../UI/Input/Input';
import RepositoryPreviewList from './RepositoryPreviewList';

const RepositorySearchInput = () => {
  const router = useRouter();
  const [getSearchResult, { loading, data, refetch, called }] =
    useGetSearchedRepositoriesLazyQuery({
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    });
  const [searchTerm, setSearchTerm] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const queryVariables = useMemo(() => {
    return { first: 5, searchTerm: debouncedSearchTerm };
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim().length < 2) return;
    if (!called) getSearchResult({ variables: queryVariables });
    else refetch(queryVariables);
    setDropdownOpen(true);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (inputFocused) setDropdownOpen(true);
    else setDropdownOpen(false);
  }, [inputFocused]);

  return (
    <form
      className="w-full md:w-auto relative"
      onSubmit={(event) => {
        event.preventDefault();
        router.push({ pathname: '/explore', query: { searchTerm } });
      }}
    >
      <Input.Text
        placeholder="جستجوی مخزن..."
        className={classNames(
          searchTerm.length > 0 ? 'md:w-[17rem] lg:w-[25rem]' : 'md:w-40',
          'transition-all w-full duration-500 ease-in-out'
        )}
        icon={AiOutlineSearch}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
      />
      {dropdownOpen && searchTerm.length > 2 && (
        <div className="absolute overflow-y-auto w-full left-1/2 -translate-x-1/2 max-h-96 bg-gray-800 rounded-lg top-12 p-4 flex flex-col space-y-4">
          {data?.repositories?.edges.length === 0 ? (
            <span className="text-secondary">نتیجه ای یافت نشد</span>
          ) : (
            <RepositoryPreviewList
              loading={loading}
              repositories={data?.repositories?.edges}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default RepositorySearchInput;
