import classNames from 'classnames';

export interface PageHeaderProps {
  title: string;
  visuallyHidden?: boolean;
}

export const PageHeader = ({ title, visuallyHidden }: PageHeaderProps) => {
  return (
    <div
      className={classNames(
        'py-10',
        visuallyHidden && 'invisible absolute pointer-events-none'
      )}
    >
      <h1 className="text-4xl font-bold text-center">{title}</h1>
    </div>
  );
};
