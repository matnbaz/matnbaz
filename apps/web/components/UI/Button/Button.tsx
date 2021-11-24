import { ButtonHTMLAttributes } from 'react';
import PrimaryButton from './PrimaryButton';
import classNames from 'classnames';
import RedButton from './RedButton';
enum RadiusesEnum {
  'sm' = 'rounded-sm',
  'md' = 'rounded-md',
  'lg' = 'rounded-lg',
  'xl' = 'rounded-xl',
  '2xl' = 'rounded-2xl',
  'full' = 'rounded-full',
}
enum SizeEnum {
  'xs' = 'text-xs font-medium py-1 px-1.5',
  'sm' = 'text-sm font-medium py-1 px-2.5',
  'md' = 'text-md font-medium py-2 px-4',
  'lg' = 'text-lg font-medium py-2 px-5',
  'xl' = 'text-xl font-bold py-3 px-8',
}

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
  rounded?: keyof typeof RadiusesEnum;
  size?: keyof typeof SizeEnum;
  className?: string;
}

const Button = ({
  children,
  href = null,
  rounded = 'md',
  size = 'md',
  className,
  ...props
}: IButtonProps) => {
  const Component = href ? `a` : `button`;
  return (
    <Component
      {...props}
      href={href}
      className={classNames(
        className,
        RadiusesEnum[rounded],
        SizeEnum[size],
        'text-center cursor-pointer inline-flex items-center border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
    >
      {children}
    </Component>
  );
};

Button.Primary = PrimaryButton;
Button.Red = RedButton;

export default Button;
