import classNames from 'classnames';

export type OpenSourceProps = React.SVGAttributes<SVGElement>;

export const OpenSource = ({ className, ...props }: OpenSourceProps) => {
  return (
    <svg
      {...props}
      className={classNames(className, 'fill-current')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 255.42 247.25"
      stroke="none"
    >
      <g>
        <path d="M143.05,167.71a42.79,42.79,0,1,0-30.68,0L83.55,242.84a123.22,123.22,0,1,1,88.32,0l-28.82-75.13" />
        <path d="M171.87,247.25a4.4,4.4,0,0,1-4.11-2.83l-28.83-75.13a4.41,4.41,0,0,1,2.54-5.69,38.37,38.37,0,1,0-27.52,0,4.4,4.4,0,0,1,2.54,5.69L87.66,244.42A4.39,4.39,0,0,1,82,247,127.7,127.7,0,0,1,8.54,82a127.64,127.64,0,0,1,235.78-6.19A127.7,127.7,0,0,1,173.45,247a4.34,4.34,0,0,1-1.58.3ZM127.67,8.82A118.91,118.91,0,0,0,81,237.07l25.72-67a47.17,47.17,0,1,1,41.91,0l25.71,67A118.94,118.94,0,0,0,127.67,8.82Z" />
      </g>
    </svg>
  );
};
