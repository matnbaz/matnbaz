import classNames from 'classnames';

interface IDividerProps {
  className?: string;
}

const Divider = ({ className }: IDividerProps) => {
  return (
    <div
      className={classNames(
        className,
        'w-full rounded-lg bg-gray-200 dark:bg-gray-700'
      )}
      style={{ height: '1px' }}
    />
  );
};

export default Divider;
