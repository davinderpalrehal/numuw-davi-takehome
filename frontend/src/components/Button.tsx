import { useMemo } from 'react';
import Typography from './Typography.tsx';
import { ButtonProps, Variant } from '../types';

const generateClasses = (variant: string, className: string): string => {
  const classesToBeApplied = [
    'bg-gradient-to-b',
    'py-2',
    'px-4',
    'rounded',
    className,
  ];

  if (variant === 'danger') {
    classesToBeApplied.push(
      'from-red-600',
      'to-red-500',
      'hover:from-red-800',
      'hover:to-red-700',
      'text-white',
    );
  } else if (variant === 'outline') {
    classesToBeApplied.push(
      'border-2',
      'border-purple-500',
      'text-purple-500',
      'hover:bg-purple-500',
      'hover:text-white',
    );
  } else {
    classesToBeApplied.push(
      'from-purple-600',
      'to-purple-500',
      'hover:from-purple-800',
      'hover:to-purple-700',
      'text-white',
    );
  }
  return classesToBeApplied.join(' ');
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = Variant.Primary,
  ...props
}) => {
  const classes = useMemo(
    () => generateClasses(variant, className),
    [variant, className],
  );

  return (
    <button className={classes} {...props}>
      <Typography variant="buttonText">{children}</Typography>
    </button>
  );
};

export default Button;
