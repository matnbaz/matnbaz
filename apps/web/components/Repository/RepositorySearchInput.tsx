import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from 'use-debounce';
import useClickOutside from '../../hooks/use-click-outside';
import { useGetSearchedRepositoriesLazyQuery } from '../../lib/graphql-types';
import Input from '../UI/Input/Input';
import RepositoryPreviewList from './RepositoryPreviewList';

const RepositorySearchInput = () => {
  const router = useRouter();

  const [getSearchResult, { loading, data, refetch, called }] =
    useGetSearchedRepositoriesLazyQuery({
      // We don't want this to affect the cache so we disable it
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    });

  const [searchTerm, setSearchTerm] = useState('');

  const [inputFocused, setInputFocused] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownClickOutsideRef = useClickOutside(() => {
    setDropdownOpen(false);
  });
  const queryVariables = useMemo(() => {
    return { first: 5, searchTerm: debouncedSearchTerm };
  }, [debouncedSearchTerm]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If the length is too short, then search wont happen
    if (debouncedSearchTerm.trim().length < 2) return;
    if (!called) getSearchResult({ variables: queryVariables });
    else refetch(queryVariables);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // If the user focused on the input then the dropdown should open
    if (inputFocused) setDropdownOpen(true);
  }, [inputFocused]);

  useEffect(() => {
    // If the route is changed, then we close the dropdown
    setDropdownOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (!['/', 'k'].includes(event.key) || event.metaKey) return;
      if (
        /^(?:input|textarea|select|button)$/i.test(
          (event.target as { tagName?: string }).tagName
        )
      )
        return;

      if (inputRef?.current) {
        event.preventDefault();
        inputRef?.current.select();
        inputRef?.current.focus();
      }
    });
  }, []);

  return (
    <form
      className="w-full md:w-auto relative"
      onSubmit={(event) => {
        event.preventDefault();
        // If the user submitted the form (pressed enter) then we will redirect them to the explore page
        router.push({ pathname: '/explore', query: { searchTerm } });
        setSearchTerm('');
      }}
    >
      <Input.Text
        placeholder="جستجوی مخزن..."
        className={classNames(
          'transition-width w-full duration-500 ease-in-out !shadow-none backdrop-blur-sm focus:md:w-[17rem] focus:lg:w-[25rem] md:w-48'
        )}
        value={searchTerm}
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
        ref={inputRef}
      />
      {dropdownOpen && searchTerm.length > 2 && (
        <div
          ref={dropdownClickOutsideRef}
          className="absolute overflow-y-auto w-full left-1/2 -translate-x-1/2 max-h-96 bg-gray-100 dark:bg-gray-800 rounded-lg top-12 p-4 flex flex-col space-y-4"
        >
          {loading ||
          data?.repositories?.edges.length > 0 ||
          debouncedSearchTerm !== searchTerm ? (
            <RepositoryPreviewList
              loading={loading || debouncedSearchTerm !== searchTerm}
              repositories={data?.repositories?.edges}
            />
          ) : (
            <span className="text-secondary">نتیجه ای یافت نشد.</span>
          )}
        </div>
      )}
    </form>
  );
};

export default RepositorySearchInput;
