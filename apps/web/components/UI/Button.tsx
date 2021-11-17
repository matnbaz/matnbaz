enum RadiusesEnum {
  'sm' = 'rounded-sm',
  'md' = 'rounded-md',
  'lg' = 'rounded-lg',
  'xl' = 'rounded-xl',
  '2xl' = 'rounded-2xl',
}

enum VariantsEnum {
  'primary' = 'bg-primary-400 focus:ring-primary-400',
  'secondary' = 'bg-gray-400 focus:ring-gray-400',
}

enum SizeEnum {
  'sm' = 'text-sm py-1 px-2.5',
  'md' = 'text-md py-1.5 px-3',
  'lg' = 'text-lg py-2 px-3.5',
  'xl' = 'text-xl py-2.5 px-4',
}

interface IButtonProps {
  children: React.ReactNode;
  href?: string;
  rounded?: keyof typeof RadiusesEnum;
  variant?: keyof typeof VariantsEnum;
  size?: keyof typeof SizeEnum;
  onClick?: () => void;
}

const Button = ({
  children,
  href = null,
  rounded = 'md',
  variant = 'primary',
  size = 'md',
  ...props
}: IButtonProps) => {
  const Component = href ? `a` : `button`;
  return (
    <Component
      {...props}
      href={href}
      className={`${RadiusesEnum[rounded]} ${VariantsEnum[variant]} ${SizeEnum[size]} text-center cursor-pointer inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {children}
    </Component>
  );
};

export default Button;
