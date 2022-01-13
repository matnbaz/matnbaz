import classNames from 'classnames';

export const MatnbazLogo = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      className={classNames(className, 'fill-current')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 1920.79"
    >
      <path d="M1000,0C447.72,0,0,447.72,0,1000c0,413.65,251.16,768.63,609.29,920.79L826.9,1353c-130.55-64-220.44-198.26-220.44-353.49,0-217.34,176.2-393.54,393.54-393.54s393.54,176.2,393.54,393.54c0,154.76-89.35,288.63-219.26,352.91l217.17,568.1C1749.19,1768.14,2000,1413.36,2000,1000,2000,447.72,1552.28,0,1000,0Z" />
    </svg>
  );
};
