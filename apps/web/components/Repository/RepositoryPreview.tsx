import { GetRepositoriesQuery } from '../../lib/graphql-types';
import Image from 'next/image';
import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import Card from '../UI/Card';
import Router from 'next/router';
import OwnerImage from '../Owner/OwnerImage';
interface IRepositoryPreviewProps {
  repository: GetRepositoriesQuery['repositories']['edges'][0]['node'];
}
const RepositoryPreview = ({ repository }: IRepositoryPreviewProps) => {
  const statistics = [
    {
      name: 'تعداد مشکلات',
      icon: AiOutlineExclamationCircle,
      value: +repository.openIssuesCount,
    },
    {
      name: 'فورک ها',
      icon: AiOutlineBranches,
      value: +repository.forksCount,
    },
    {
      name: 'ستاره ها',
      icon: AiOutlineStar,
      value: +repository.stargazersCount,
    },
  ];
  return (
    <Card padded href={`/github/${repository.fullName}`}>
      <div className="relative h-full">
        {/* Platform Logo */}
        {/* <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        /> */}
        <div
          className="flex flex-col md:flex-row md:space-x-3 items-start space-y-2 pb-4 md:pb-12"
          dir="ltr"
        >
          {repository.owner && (
            <div>
              <OwnerImage owner={repository.owner} />
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full text-left overflow-hidden">
            <a
              className="text-lg text-primary-600 dark:text-primary-400"
              href={`https://github.com/${repository.fullName}`}
              target="_blank"
              rel="noreferrer"
            >
              {repository.fullName}
            </a>

            <span className="text-gray-800 dark:text-gray-300 font-extralight text-sm">
              {repository.descriptionLimited}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center md:absolute bottom-0 w-full mt-2 md:mt-0">
          {repository.language && (
            <div className="flex items-center">
              <>
                {/* // Dir set to ltr to avoid displaying languages like C# as #C */}
                <span className="pr-2.5 pl-1.5 py-1.5 text-sm" dir="ltr">
                  {repository.language.name}
                </span>
                <div
                  className="rounded-full w-2 h-2"
                  style={{ backgroundColor: repository.language.color }}
                />
              </>
            </div>
          )}

          <div className="flex flex-col sm:flex-row space-x-6 space-y-3 sm:space-y-0 space-x-reverse mr-auto">
            {statistics.map((statistic) => (
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
    </Card>
  );
};

export default RepositoryPreview;
