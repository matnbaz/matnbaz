import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import Card from '../UI/Card';

const RepositoryPreview = () => {
  const statistics = [
    { name: 'تعداد مشکلات', icon: AiOutlineExclamationCircle, value: 6 },
    { name: 'فورک ها', icon: AiOutlineBranches, value: 9 },
    { name: 'ستاره ها', icon: AiOutlineStar, value: 3 },
  ];
  return (
    <Card>
      {/* Github Logo */}
      {/* <img
        className="w-4 h-4 absolute opacity-50"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
      /> */}
      <div className="flex space-x-3 space-x-reverse">
        <div className="flex flex-col space-y-2 h-full items-end w-full">
          <h1 className="text-2xl text-blue-600 dark:text-blue-400">
            facebook/react
          </h1>

          <span
            className="text-gray-800 dark:text-gray-300 font-extralight text-sm"
            dir="ltr"
          >
            A declarative, efficient, and flexible JavaScript library for
            building user interfaces.
          </span>
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/69631?v=4"
          className="w-16 h-16 rounded-lg m-auto"
        />
      </div>
      <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center">
          <span className="pr-2.5 pl-1.5 py-1.5 text-sm">Javascript</span>
          <div className="bg-yellow-500 rounded-full w-2 h-2" />
        </div>

        <div className="flex space-x-6 space-x-reverse">
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
    </Card>
  );
};

export default RepositoryPreview;
