import { ButtonHTMLAttributes } from 'react';
import { Variant } from './VariantTypes.ts';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  className?: string;
}
