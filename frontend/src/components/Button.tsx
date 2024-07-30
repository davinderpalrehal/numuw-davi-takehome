import Typography from './Typography.tsx';
import { useMemo } from 'react';

function Button({ children, className = '', variant = 'primary', ...props }) {
  const classes = useMemo(() => {
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
  }, [variant, className]);

  return (
    <button className={classes} {...props}>
      <Typography variant="buttonText">{children}</Typography>
    </button>
  );
}

export default Button;
