import { localize } from 'common';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  AiOutlineExclamationCircle,
  AiOutlineFork,
  AiOutlineStar,
} from 'react-icons/ai';
import {
  OwnerType,
  PlatformType,
  ScriptDirection,
} from '../../lib/graphql-types';
import { OwnerImage } from '../Owner/OwnerImage';
import { Card, CardProps } from '../UI/Card';

export interface RepositoryPreviewProps
  extends Omit<CardProps, 'children' | 'href'> {
  repository: {
    id: string;
    fullName: string;
    platformUrl?: string | null | undefined;
    platform: PlatformType;
    descriptionLimited?: string | null | undefined;
    descriptionDirection: ScriptDirection;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;
    isNew: boolean;
    owner?: {
      type: OwnerType;
      login: string;
      platformId: string;
    } | null;

    language?: {
      __typename?: 'Language';
      name: string;
      color?: { __typename?: 'Color'; hexString: string } | null;
    } | null;
  };
  sendToPlatform?: boolean;
}
export const RepositoryPreview = ({
  repository,
  sendToPlatform = false,
  ...props
}: RepositoryPreviewProps) => {
  const { t } = useTranslation();

  const statistics = useMemo(
    () => [
      {
        icon: AiOutlineStar,
        value: +repository.stargazersCount,
      },
      {
        icon: AiOutlineFork,
        value: +repository.forksCount,
      },
      {
        icon: AiOutlineExclamationCircle,
        value: +repository.openIssuesCount,
      },
    ],
    [repository]
  );

  const hasStatistics = useMemo(
    () =>
      statistics.every(
        (statistic) =>
          statistic.value !== null &&
          statistic.value !== undefined &&
          !isNaN(statistic.value)
      ),
    [statistics]
  );
  const { locale } = useRouter();

  return (
    <Card
      {...props}
      href={
        sendToPlatform
          ? `https://github.com/${repository.fullName}`
          : `/github/${repository.fullName}`
      }
    >
      <div className="relative h-full" dir="ltr">
        {/* Platform Logo */}
        {/* <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        /> */}
        {repository.isNew && (
          <span className="px-2 py-0.5 bg-primary-500/30 backdrop-blur-sm rounded-full absolute right-0 text-sm z-20 -ml-3 -mt-6">
            {t('new')}
          </span>
        )}
        <div
          className={classNames(
            'flex flex-col md:flex-row md:space-x-3 items-start space-y-2',
            hasStatistics && 'pb-4 md:pb-12'
          )}
        >
          {repository.owner && (
            <div>
              <OwnerImage withoutLink owner={repository.owner} />
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full text-left overflow-hidden">
            <div className="flex w-full text-xl text-primary-600 dark:text-primary-400 break-all">
              {repository.fullName}
            </div>

            <p
              className="text-secondary text-sm break-all"
              dir={repository.descriptionDirection?.toLowerCase()}
            >
              {repository.descriptionLimited}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center md:absolute bottom-0 w-full mt-2 md:mt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            {hasStatistics &&
              statistics.map((statistic, statIdx) => (
                <div
                  key={statIdx}
                  className="flex space-x-1 text-gray-700 dark:text-gray-400 items-center justify-end text-sm sm:text-base"
                >
                  <statistic.icon className="w-4 h-4 md:w-5 md:h-5 m-auto" />
                  <span>{localize(statistic.value, locale)}</span>
                </div>
              ))}
          </div>

          {repository.language && (
            <div className="flex items-center">
              <>
                {/* // Dir set to ltr to avoid displaying languages like C# as #C */}
                <div
                  className="rounded-full w-2 h-2"
                  style={{
                    backgroundColor: repository.language.color?.hexString,
                  }}
                />
                <span className="pl-1.5 py-1.5 text-sm">
                  {repository.language.name}
                </span>
              </>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const commonColorsTable = {
  Vue: '#4FC08D',
  Php: '#777BB4',
  Shell: '#89e051',
};

export const githubRepoResponseNormalize = (repo: any) => ({
  id: repo.id.toString(),
  isNew: false,
  platform: PlatformType.GitHub,
  owner: {
    login: repo.owner.login,
    platformId: repo.owner.id,
    type:
      repo.owner.type === 'Organization'
        ? OwnerType.Organization
        : OwnerType.User,
  },
  descriptionLimited: repo.description,
  forksCount: repo.forks_count,
  openIssuesCount: repo.open_issues_count,
  stargazersCount: repo.stargazers_count,
  fullName: repo.full_name,
  language: {
    name: repo.language,
    color: {
      hexString: commonColorsTable[repo.language] || '#1e90ff',
    },
  },
  descriptionDirection: ScriptDirection.Ltr,
});
