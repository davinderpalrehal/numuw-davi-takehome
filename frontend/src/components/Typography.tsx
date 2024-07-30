import { useMemo } from 'react';

function Typography({
  variant = '',
  component = '',
  className = '',
  children,
}) {
  const Tag = useMemo(() => {
    let tagToSet = 'div';
    switch (variant) {
      case 'displayLarge':
        tagToSet = 'h1';
        break;
      case 'displayMedium':
        tagToSet = 'h2';
        break;
      case 'displaySmall':
        tagToSet = 'h3';
        break;
      case 'headline':
        tagToSet = 'h4';
        break;
      case 'title':
        tagToSet = 'h5';
        break;
      case 'subtitle':
        tagToSet = 'h6';
        break;
      case 'body':
        tagToSet = 'p';
        break;
      case 'label':
      case 'buttonText':
        tagToSet = 'span';
        break;
      default:
        tagToSet = 'div';
    }
    return component || tagToSet;
  }, [variant, component]);

  const classes = useMemo(() => {
    const classesToBeApplied = [];
    switch (variant) {
      case 'displayLarge':
        classesToBeApplied.push('text-8xl', 'font-bold', 'leading-tight');
        break;
      case 'displayMedium':
        classesToBeApplied.push('text-7xl', 'font-bold', 'leading-tight');
        break;
      case 'displaySmall':
        classesToBeApplied.push('text-6xl', 'font-bold', 'leading-tight');
        break;
      case 'headline':
        classesToBeApplied.push('text-5xl', 'font-bold', 'leading-tight');
        break;
      case 'title':
        classesToBeApplied.push('text-4xl', 'font-bold', 'leading-relaxed');
        break;
      case 'subtitle':
        classesToBeApplied.push('text-3xl', 'leading-relaxed');
        break;
      case 'body':
        classesToBeApplied.push('text-base', 'font-normal', 'leading-relaxed');
        break;
      case 'label':
      case 'buttonText':
        classesToBeApplied.push('text-sm', 'font-medium', 'leading-snug');
        if (variant === 'buttonText') {
          classesToBeApplied.push('uppercase');
        }
        break;
      default:
        classesToBeApplied.push('text-base', 'leading-relaxed');
    }
    classesToBeApplied.push(className);
    return classesToBeApplied.join(' ');
  }, [variant, className]);

  return <Tag className={classes}>{children}</Tag>;
}

export default Typography;
