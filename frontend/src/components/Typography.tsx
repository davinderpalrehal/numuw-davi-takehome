import { useMemo } from 'react';
import { TypographyProps, TypographyVariant } from '../types';

const Typography: React.FC<TypographyProps> = ({
  variant = TypographyVariant.Body,
  component = '',
  className = '',
  children,
}) => {
  const Tag = useMemo(() => {
    let tagToSet = 'div';
    switch (variant) {
      case TypographyVariant.DisplayLarge:
        tagToSet = 'h1';
        break;
      case TypographyVariant.DisplayMedium:
        tagToSet = 'h2';
        break;
      case TypographyVariant.DisplaySmall:
        tagToSet = 'h3';
        break;
      case TypographyVariant.Headline:
        tagToSet = 'h4';
        break;
      case TypographyVariant.Title:
        tagToSet = 'h5';
        break;
      case TypographyVariant.Subtitle:
        tagToSet = 'h6';
        break;
      case TypographyVariant.Body:
        tagToSet = 'p';
        break;
      case TypographyVariant.Label:
      case TypographyVariant.ButtonText:
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
      case TypographyVariant.DisplayLarge:
        classesToBeApplied.push('text-8xl', 'font-bold', 'leading-tight');
        break;
      case TypographyVariant.DisplayMedium:
        classesToBeApplied.push('text-7xl', 'font-bold', 'leading-tight');
        break;
      case TypographyVariant.DisplaySmall:
        classesToBeApplied.push('text-6xl', 'font-bold', 'leading-tight');
        break;
      case TypographyVariant.Headline:
        classesToBeApplied.push('text-5xl', 'font-bold', 'leading-tight');
        break;
      case TypographyVariant.Title:
        classesToBeApplied.push('text-4xl', 'font-bold', 'leading-relaxed');
        break;
      case TypographyVariant.Subtitle:
        classesToBeApplied.push('text-3xl', 'leading-relaxed');
        break;
      case TypographyVariant.Body:
        classesToBeApplied.push('text-base', 'font-normal', 'leading-relaxed');
        break;
      case TypographyVariant.Label:
      case TypographyVariant.ButtonText:
        classesToBeApplied.push(
          'text-sm',
          'font-medium',
          'leading-snug',
          'text-center',
        );
        if (variant === TypographyVariant.ButtonText) {
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
};

export default Typography;
