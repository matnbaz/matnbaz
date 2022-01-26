import classNames from 'classnames';

export interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
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
