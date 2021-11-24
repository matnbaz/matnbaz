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
}
enum SizeEnum {
  'sm' = 'text-sm py-1 px-2.5',
  'md' = 'text-md py-1 px-3',
  'lg' = 'text-lg py-2 px-3.5',
  'xl' = 'text-xl py-2.5 px-4',
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
        ' text-center cursor-pointer inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
    >
      {children}
    </Component>
  );
};

Button.Primary = PrimaryButton;
Button.Red = RedButton;

export default Button;
