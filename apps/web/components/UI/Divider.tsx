import classNames from 'classnames';

export interface IDividerProps {
  className?: string;
}

export const Divider = ({ className }: IDividerProps) => {
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
