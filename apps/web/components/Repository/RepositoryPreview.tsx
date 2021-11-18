import { GetRepositoriesQuery } from 'apps/web/graphql-types';
import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import Card from '../UI/Card';

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
    { name: 'فورک ها', icon: AiOutlineBranches, value: +repository.forksCount },
    {
      name: 'ستاره ها',
      icon: AiOutlineStar,
      value: +repository.stargazerscount,
    },
  ];
  return (
    <Card
      onClick={() => {
        console.log('clicked');
      }}
    >
      <div className="relative h-full">
        {/* Github Logo */}
        <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        />
        <div className="flex space-x-3 space-x-reverse pb-12">
          <div className="flex flex-col space-y-2 h-full items-end w-full text-left overflow-hidden">
            {/* // TODO: change the href so it works for gitlab, github, etc */}
            <a
              className="text-lg text-blue-600 dark:text-blue-400"
              href={`https://github.com/${repository.fullName}`}
              target="_blank"
            >
              {repository.fullName}
            </a>

            <span className="text-gray-800 dark:text-gray-300 font-extralight text-sm">
              {repository.description}
            </span>
          </div>
          <img
            src={`https://avatars.githubusercontent.com/u/${repository.owner.platformId}?v=4`}
            className={`w-16 h-16 ${
              repository.owner.type === 'User' ? 'rounded-full' : 'rounded-lg'
            }`}
          />
        </div>
        <div className="flex justify-between items-center absolute bottom-0 w-full">
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

          <div className="flex space-x-6 space-x-reverse mr-auto">
            {statistics.map((statistic) => (
              <div
                key={statistic.name}
                className="flex space-x-1 space-x-reverse text-gray-700 dark:text-gray-400 items-center justify-end"
              >
                <span>{statistic.value.toLocaleString('fa')}</span>
                <statistic.icon className="w-5 h-5 m-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepositoryPreview;
