interface SelectProps {
  categories: [string, number][];
  initialOption: string;
}

interface LayoutProps {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
export type { LayoutProps, SelectProps };
