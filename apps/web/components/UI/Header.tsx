import { useTheme } from 'next-themes';

interface IHeaderProps {
  className?: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { setTheme, theme } = useTheme();
  return (
    <div
      className={`w-full bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-sm z-20 fixed ${
        className || ''
      }`}
    >
      <div className="flex m-auto  max-w-6xl  justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1 max-w-7xl">
          <a href="#">
            <span className="sr-only">Workflow</span>
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
              alt=""
            />
          </a>
        </div>

        <a
          href="#"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mr-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          Toggle
        </a>
      </div>
    </div>
  );
};
export default Header;
