import { localize } from 'common';
import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineSearch,
} from 'react-icons/ai';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useFlexLayout, useSortBy, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { PageHeader } from '../../../components/Layout/PageHeader';
import { OwnerImage } from '../../../components/Owner/OwnerImage';
import { Input } from '../../../components/UI/Input/Input';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetGithubUsersChartDocument,
  GetGithubUsersChartQueryResult,
  GetGithubUsersChartQueryVariables,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';
import { scrollbarWidth } from '../../../utils/scrollbar-width';

export interface GithubTopUsersPageProps {
  owners: GetGithubUsersChartQueryResult['data']['owners'];
}

const ITEM_HEIGHT = 74;

const checkOwnerMatch = (
  owner: { name?: string; login: string },
  search: string
) => {
  return (
    owner.login.toLowerCase().includes(search.toLowerCase()) ||
    (owner.name && owner.name.toLowerCase().includes(search.toLowerCase()))
  );
};

const GithubTopUsersPage: NextPage<GithubTopUsersPageProps> = ({ owners }) => {
  const { t } = useTranslation('github-top-users');
  const { locale } = useRouter();
  const [search, setSearch] = useState('');
  const [filteredRows, setFilteredRows] = useState<number[]>([]);

  const data = useMemo(() => {
    return owners.edges.map((owner, ownerIdx) => owner.node);
  }, [owners]);

  const scrollToNextMatch = useCallback(() => {
    let top = 0;
    const container = document.querySelector('#tbody').querySelector('div');
    const currentTopScroll = container.scrollTop;
    if (filteredRows.length > 0 && filteredRows.length !== data.length) {
      const firstRowScroll = filteredRows[0] * ITEM_HEIGHT;
      top = firstRowScroll;
      if (firstRowScroll <= currentTopScroll) {
        for (const row of filteredRows) {
          const rowScroll = ITEM_HEIGHT * row;
          if (currentTopScroll < rowScroll) {
            top = rowScroll;
            break;
          }
        }
      }
    }
    container.scroll({ top });
  }, [data.length, filteredRows]);

  const columns = useMemo(
    () => [
      {
        Header: t('rank'),
        Cell: (props) => {
          let rank = props.flatRows.indexOf(props.row) + 1;
          if (props.state.sortBy[0]) {
            if (props.state.sortBy[0].id === 'login') {
              rank = '-';
            } else if (!props.state.sortBy[0].desc) {
              rank = props.data.length + 1 - rank;
            }
          }

          return (
            <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
              {localize(rank, locale)}
            </div>
          );
        },
      },

      {
        Header: t('user'),
        accessor: 'login',
        width: 256,
        Cell: (props) => {
          const login = props.value;
          const name = props.data[props.cell.row.index].name;
          const platformId = props.data[props.cell.row.index].platformId;
          return (
            <div className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <Link href={`/github/${login}`}>
                    <a target="_blank">
                      <OwnerImage owner={props.row.original} />
                    </a>
                  </Link>
                </div>
                <div className="ml-4">
                  <Link href={`/github/${login}`}>
                    <a target="_blank">
                      <div className="text-sm font-medium">{name}</div>
                    </a>
                  </Link>
                  <Link href={`/github/${login}`}>
                    <a target="_blank">
                      <div className="text-secondary text-sm">@{login}</div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        Header: t('followers'),
        accessor: 'followersCount',
        sortDescFirst: true,
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('public-contributions'),
        accessor: 'publicContributionsCount',
        sortDescFirst: true,
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('total-stars'),
        accessor: 'totalStarsCount',
        sortDescFirst: true,
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('repositories-count'),
        accessor: 'repositoriesCount',
        sortDescFirst: true,
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('repositories-contributed-to-count'),
        accessor: 'repositoriesContributedToCount',
        sortDescFirst: true,
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('languages'),
        Cell: (props) => {
          return (
            <div className="whitespace-nowrap px-6 py-4">
              <div className="flex flex-col items-start">
                {props.row.original.languages
                  .slice(0, 3)
                  .map(({ percentage, language }, index) => (
                    <div className="flex items-center" key={index} dir="ltr">
                      <div
                        className="rounded-full w-2 h-2"
                        style={{
                          backgroundColor: language.color?.hexString,
                        }}
                      />
                      <span className="pl-1.5  text-xs">{language.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        },
      },
    ],
    [t, locale]
  );

  const scrollBarSize = useMemo(() => {
    if (typeof window === 'undefined') return 10;
    return scrollbarWidth();
  }, []);

  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useFlexLayout
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      return (
        <div
          className={classNames(
            'tr',
            search && (!filteredRows.includes(index) ? 'opacity-25' : '')
          )}
          {...row.getRowProps({ style })}
          key={index}
        >
          {row.cells.map((cell, cellIdx) => {
            return (
              <div className="td" {...cell.getCellProps()} key={cellIdx}>
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [rows, prepareRow, search, filteredRows]
  );

  const scrollToPrevMatch = useCallback(() => {
    const reversedFilteredRows = [...filteredRows].reverse();
    let top = 0;
    const container = document.querySelector('#tbody').querySelector('div');
    const currentTopScroll = container.scrollTop;
    if (
      reversedFilteredRows.length > 0 &&
      reversedFilteredRows.length !== data.length
    ) {
      for (const row of reversedFilteredRows) {
        const rowScroll = ITEM_HEIGHT * row;
        if (currentTopScroll > rowScroll) {
          top = rowScroll;
          break;
        }
      }
    }
    container.scroll({ top });
  }, [data.length, filteredRows]);

  useEffect(() => {
    setFilteredRows(
      rows
        .map((row, rowIdx) => ({ ...row, rowIdx }))
        .filter((row) => checkOwnerMatch(row.original, search))
        .map((row) => row.rowIdx)
    );
    // const resultIndex = data.findIndex((owner) => owner.matches);
    // if (resultIndex) {
    //   setFocusedIndex(resultIndex);
    // } else {
    //   setFocusedIndex(null);
    // }
  }, [search, rows, state]);

  useEffect(() => scrollToNextMatch(), [scrollToNextMatch, filteredRows]);

  return (
    <MainLayout>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} description={t('page-description')} />

      <div className="flex justify-center items-center gap-2 mb-2">
        <div
          className={classNames(
            filteredRows.length === rows.length && 'opacity-25',
            'flex flex-col items-center justify-center gap-0.5'
          )}
        >
          <button onClick={() => scrollToPrevMatch()}>
            <AiOutlineArrowUp />
          </button>
          <button onClick={() => scrollToNextMatch()}>
            <AiOutlineArrowDown />
          </button>
        </div>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              e.shiftKey ? scrollToPrevMatch() : scrollToNextMatch();
          }}
          icon={AiOutlineSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search-placeholder')}
        />
      </div>
      <div dir="ltr" className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div
                className="table bg-gray-100 dark:bg-gray-800 mx-auto"
                {...getTableProps()}
              >
                <div className="thead bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                  {headerGroups.map((headerGroup, headerGroupIdx) => (
                    <div
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroupIdx}
                    >
                      {headerGroup.headers.map((column, columnIdx) => (
                        <div
                          scope="col"
                          className="th text-secondary px-6 py-3 text-center text-xs font-medium"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          title={t('toggle-sort')}
                          key={columnIdx}
                        >
                          {column.render('Header')}
                          <span className="inline ml-2">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <GoArrowDown className="w-4 h-4 inline" />
                              ) : (
                                <GoArrowUp className="w-4 h-4 inline" />
                              )
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div id="tbody" className="tbody" {...getTableBodyProps()}>
                  <FixedSizeList
                    height={700}
                    itemCount={rows.length}
                    itemSize={ITEM_HEIGHT}
                    width={totalColumnsWidth + scrollBarSize}
                  >
                    {RenderRow}
                  </FixedSizeList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-secondary text-center">
        {t('tip-start')}
        <Link href="/submit-user">{t('tip-link')}</Link>
        {t('tip-end')}
      </p>
    </MainLayout>
  );
};

export default GithubTopUsersPage;

export const getStaticProps: GetStaticProps<GithubTopUsersPageProps> = async ({
  locale,
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { owners },
  } = await apolloClient.query<
    GetGithubUsersChartQueryResult['data'],
    GetGithubUsersChartQueryVariables
  >({
    query: GetGithubUsersChartDocument,
    variables: {},
  });

  return {
    revalidate: 60 * 60 * 12, // 12H
    props: {
      owners,
      ...(await serverSideTranslations(
        locale,
        ['common', 'github-top-users'],
        nextI18nextConfig
      )),
    },
  };
};
