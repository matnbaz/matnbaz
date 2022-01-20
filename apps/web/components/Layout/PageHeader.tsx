import classNames from 'classnames';

export interface PageHeaderProps {
  title: string;
  description?: string;
  visuallyHidden?: boolean;
}

export const PageHeader = ({
  title,
  visuallyHidden,
  description,
}: PageHeaderProps) => {
  return (
    <div
      className={classNames(
        'py-6',
        visuallyHidden && 'invisible absolute pointer-events-none'
      )}
    >
      <h1 className="text-4xl font-extrabold text-center">{title}</h1>
      {description && (
        <p className="mt-4 text-secondary text-center max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
