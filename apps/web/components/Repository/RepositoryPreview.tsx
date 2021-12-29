import classNames from 'classnames';
import { useMemo } from 'react';
import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import OwnerImage from '../Owner/OwnerImage';
import Card, { ICardProps } from '../UI/Card';
export interface IRepositoryPreviewProps
  extends Omit<ICardProps, 'children' | 'href'> {
  repository: GetRepositoriesQuery['repositories']['edges'][0]['node'];
  sendToPlatform?: boolean;
  variation?: 'default' | 'summary';
}
const RepositoryPreview = ({
  repository,
  sendToPlatform = false,
  variation = 'default',
  ...props
}: IRepositoryPreviewProps) => {
  const statistics = useMemo(
    () => [
      {
        name: 'ستاره‌ها',
        icon: AiOutlineStar,
        value: +repository.stargazersCount,
      },
      {
        name: 'فورک‌ها',
        icon: AiOutlineBranches,
        value: +repository.forksCount,
      },
      {
        name: 'موضوع‌ها',
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

  const template =
    variation === 'summary' ? (
      <div className="relative h-full">
        {/* Platform Logo */}
        {/* <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        /> */}
        {repository.isNew && (
          <span className="px-1.5 py-0.5 bg-primary-500/30 backdrop-blur-sm rounded-full absolute text-sm z-20 -mr-3 -mt-6">
            جدید
          </span>
        )}
        <div
          className={classNames(
            'flex flex-col items-center space-y-2',
            hasStatistics && 'pb-4 md:pb-12'
          )}
          dir="ltr"
        >
          {repository.owner && (
            <div>
              <OwnerImage
                withoutLink={props.disabled}
                owner={repository.owner}
              />
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full text-left overflow-hidden">
            <div className="text-lg text-primary-600 dark:text-primary-400 break-words">
              {repository.fullName}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center md:absolute bottom-0 w-full mt-2 md:mt-0">
          {repository.language && (
            <div className="flex items-center">
              <>
                {/* // Dir set to ltr to avoid displaying languages like C# as #C */}
                <span className="pl-1.5 py-1.5 text-sm" dir="ltr">
                  {repository.language.name}
                </span>
                <div
                  className="rounded-full w-2 h-2"
                  style={{
                    backgroundColor: repository.language.color.hexString,
                  }}
                />
              </>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 mr-auto">
            {hasStatistics &&
              statistics.slice(0, 1).map((statistic) => (
                <div
                  key={statistic.name}
                  className="flex space-x-1 space-x-reverse text-gray-700 dark:text-gray-400 items-center justify-end text-sm sm:text-base"
                >
                  <span>{statistic.value.toLocaleString('fa')}</span>
                  <statistic.icon className="w-4 h-4 md:w-5 md:h-5 m-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="relative h-full">
        {/* Platform Logo */}
        {/* <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        /> */}
        {repository.isNew && (
          <span className="px-1.5 py-0.5 bg-primary-500/30 backdrop-blur-sm rounded-full absolute text-sm z-20 -mr-3 -mt-6">
            جدید
          </span>
        )}
        <div
          className={classNames(
            'flex flex-col md:flex-row md:space-x-3 items-start space-y-2',
            hasStatistics && 'pb-4 md:pb-12'
          )}
          dir="ltr"
        >
          {repository.owner && (
            <div>
              <OwnerImage
                withoutLink={props.disabled}
                owner={repository.owner}
              />
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full text-left overflow-hidden">
            <div className="text-xl text-primary-600 dark:text-primary-400 break-words">
              {repository.fullName}
            </div>

            <p className="text-secondary text-sm">
              {repository.descriptionLimited}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center md:absolute bottom-0 w-full mt-2 md:mt-0">
          {repository.language && (
            <div className="flex items-center">
              <>
                {/* // Dir set to ltr to avoid displaying languages like C# as #C */}
                <span className="pl-1.5 py-1.5 text-sm" dir="ltr">
                  {repository.language.name}
                </span>
                <div
                  className="rounded-full w-2 h-2"
                  style={{
                    backgroundColor: repository.language.color.hexString,
                  }}
                />
              </>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 mr-auto">
            {hasStatistics &&
              statistics.map((statistic) => (
                <div
                  key={statistic.name}
                  className="flex space-x-1 space-x-reverse text-gray-700 dark:text-gray-400 items-center justify-end text-sm sm:text-base"
                >
                  <span>{statistic.value.toLocaleString('fa')}</span>
                  <statistic.icon className="w-4 h-4 md:w-5 md:h-5 m-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );

  return (
    <Card
      {...props}
      href={
        sendToPlatform
          ? `https://github.com/${repository.fullName}`
          : `/github/${repository.fullName}`
      }
    >
      {template}
    </Card>
  );
};

export default RepositoryPreview;
