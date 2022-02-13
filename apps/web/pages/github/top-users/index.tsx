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
  GetGithubOwnersDocument,
  GetGithubOwnersQueryResult,
  GetGithubOwnersQueryVariables,
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
  owners: GetGithubOwnersQueryResult['data']['owners'];
}

const GithubTopUsersPage: NextPage<GithubTopUsersPageProps> = ({ owners }) => {
  const { t } = useTranslation('github-top-users');
  const { locale } = useRouter();

  const data = useMemo(() => {
    return owners.edges.map((owner, ownerIdx) => ({
      rank: ownerIdx + 1,
      ...owner.node,
    }));
  }, [owners]);
  const columns = useMemo(
    () => [
      {
        Header: t('rank'),
        accessor: 'rank',
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value, locale)}
          </div>
        ),
      },

      {
        Header: t('user'),
        accessor: 'name',
        width: 256,
        Cell: (props) => {
          const login = props.data[props.cell.row.index].login;
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
                      <div className="text-sm font-medium">{props.value}</div>
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
      // { Header: t('company'), accessor: 'company' },
      // {
      //   Header: t('twitter'),
      //   accessor: 'twitterUsername',
      //   width: 200,
      //   Cell: (props) => (
      //     <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
      //       {props.value && (
      //         <a
      //           href={`https://twitter.com/${props.value}`}
      //           target="_blank"
      //           rel="noreferrer"
      //           className="text-sm underline"
      //         >
      //           @{props.value}
      //         </a>
      //       )}
      //     </div>
      //   ),
      // },
      {
        Header: t('followers'),
        accessor: 'followersCount',
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('public-contributions'),
        accessor: 'publicContributionsCount',
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('total-stars'),
        accessor: 'totalStarsCount',
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('repositories-count'),
        accessor: 'repositoriesCount',
        Cell: (props) => (
          <div className="whitespace-nowrap px-6 py-4 text-center font-bold">
            {localize(props.value || 0, locale)}
          </div>
        ),
      },
      {
        Header: t('repositories-contributed-to-count'),
        accessor: 'repositoriesContributedToCount',
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
        <div className="tr" {...row.getRowProps({ style })} key={index}>
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

      {/* <div dir="ltr" className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg"> */}

      <div dir="ltr" className="table mx-auto" {...getTableProps()}>
        <div className="thead bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          {headerGroups.map((headerGroup, headerGroupIdx) => (
            <div
              className="tr"
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroupIdx}
            >
              {headerGroup.headers.map((column, columnIdx) => (
                <div
                  scope="col"
                  className="th text-secondary px-6 py-3 text-center text-xs font-medium"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
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
            height={1000}
            itemCount={rows.length}
            itemSize={100}
            width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
      {/* </div>
          </div>
        </div>
      </div> */}
    </MainLayout>
  );

  // return (
  //   <MainLayout>
  //     <NextSeo title={t('page-title')} description={t('page-description')} />
  //     <PageHeader title={t('page-title')} description={t('page-description')} />

  //     <div dir="ltr" className="flex flex-col">
  //       <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
  //         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
  //           <div className="overflow-hidden shadow-md sm:rounded-lg">
  //             <table className="min-w-full">
  //               <thead className="bg-gray-50 dark:bg-gray-700">
  //                 <tr>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
  //                   >
  //                     {t('rank')}
  //                   </th>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
  //                   >
  //                     {t('user')}
  //                   </th>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
  //                   >
  //                     {t('company')}
  //                   </th>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
  //                   >
  //                     {t('twitter')}
  //                   </th>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
  //                   >
  //                     {t('followers')}
  //                   </th>
  //                   <th
  //                     scope="col"
  //                     className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
  //                   >
  //                     {t('public-contributions')}
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {owners.edges.map(({ node: owner }, index) => (
  //                   <tr
  //                     className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
  //                     key={owner.login}
  //                   >
  //                     <td className="whitespace-nowrap px-6 py-4 text-center font-bold">
  //                       <span dir="rtl">{persianNumbers(index + 1)}</span>
  //                     </td>
  //                     <td className="whitespace-nowrap px-6 py-4">
  //                       <div className="flex items-center">
  //                         <div className="h-10 w-10 flex-shrink-0">
  //                           <Link href={`/github/${owner.login}`}>
  //                             <a target="_blank">
  //                               <img
  //                                 className="h-10 w-10 rounded-full"
  //                                 src={`https://github.com/${owner.login}.png`}
  //                                 alt={`عکس ${owner.name || owner.login}`}
  //                               />
  //                             </a>
  //                           </Link>
  //                         </div>
  //                         <div className="ml-4">
  //                           <Link href={`/github/${owner.login}`}>
  //                             <a target="_blank">
  //                               <div className="text-sm font-medium">
  //                                 {owner.name}
  //                               </div>
  //                             </a>
  //                           </Link>
  //                           <Link href={`/github/${owner.login}`}>
  //                             <a target="_blank">
  //                               <div className="text-secondary text-sm">
  //                                 @{owner.login}
  //                               </div>
  //                             </a>
  //                           </Link>
  //                         </div>
  //                       </div>
  //                     </td>
  //                     <td className="whitespace-nowrap px-6 py-4">
  //                       <div className="truncate text-sm">{owner.company}</div>
  //                     </td>
  //                     <td className="whitespace-nowrap px-6 py-4">
  //                       {owner.twitterUsername && (
  //                         <a
  //                           href={`https://twitter.com/${owner.twitterUsername}`}
  //                           target="_blank"
  //                           rel="noreferrer"
  //                           className="text-sm underline"
  //                         >
  //                           @{owner.twitterUsername}
  //                         </a>
  //                       )}
  //                     </td>
  //                     <td className="whitespace-nowrap px-6 py-4 text-center">
  //                       <span dir="rtl">
  //                         {owner.followersCount &&
  //                           `${persianNumbers(owner.followersCount)}`}
  //                       </span>
  //                     </td>
  //                     <td
  //                       className="whitespace-nowrap px-6 py-4 text-center"
  //                       dir="rtl"
  //                     >
  //                       {owner.publicContributionsCount &&
  //                         `${persianNumbers(owner.publicContributionsCount)}`}
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </MainLayout>
  // );
};

export default GithubTopUsersPage;

export const getStaticProps: GetStaticProps<GithubTopUsersPageProps> = async ({
  locale,
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { owners },
  } = await apolloClient.query<
    GetGithubOwnersQueryResult['data'],
    GetGithubOwnersQueryVariables
  >({
    query: GetGithubOwnersDocument,
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
