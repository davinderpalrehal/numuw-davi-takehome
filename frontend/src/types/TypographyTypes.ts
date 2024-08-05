import { TypographyVariant } from './VariantTypes.ts';
import React from 'react';

export interface TypographyProps {
  variant?: TypographyVariant;
  component?: string;
  className?: string;
  children: React.ReactNode;
}
