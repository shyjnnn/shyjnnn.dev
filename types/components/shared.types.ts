import { ButtonHTMLAttributes } from 'react';

interface SelectProps {
  categories: [string, number][];
  initialOption: string;
}

interface LayoutProps {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export type { BtnProps, LayoutProps, SelectProps };
