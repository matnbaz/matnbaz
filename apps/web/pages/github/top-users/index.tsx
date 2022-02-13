import { localize } from '@matnbaz/common';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useFlexLayout, useSortBy, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { PageHeader } from '../../../components/Layout/PageHeader';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetGithubChartDocument,
  GetGithubChartQueryResult,
  GetGithubChartQueryVariables,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};
export interface GithubTopUsersPageProps {
  owners: GetGithubChartQueryResult['data']['owners'];
}

const GithubTopUsersPage: NextPage<GithubTopUsersPageProps> = ({ owners }) => {
  const { t } = useTranslation('github-top-users');
  // const [search, setSearch] = useState('');
  const { locale } = useRouter();

  const data = useMemo(() => {
    return owners.edges.map((owner, ownerIdx) => owner.node);
  }, [owners]);
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
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://avatars.githubusercontent.com/u/${platformId}?v=4`}
                        alt={`عکس ${props.value || login}`}
                      />
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
          className="tr"
          {...row.getRowProps({ style })}
          // style={{ display: 'none' }}
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
    [prepareRow, rows]
  );

  return (
    <MainLayout>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} description={t('page-description')} />

      {/* <div className="flex justify-center items-center">
        <Input.Text
          className=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search-placeholder')}
        />
      </div> */}
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
                <div className="tbody" {...getTableBodyProps()}>
                  <FixedSizeList
                    height={750}
                    itemCount={rows.length}
                    itemSize={100}
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
    GetGithubChartQueryResult['data'],
    GetGithubChartQueryVariables
  >({
    query: GetGithubChartDocument,
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
