interface SelectProps {
  categories: [string, number][];
  initialOption: [string, number];
}

interface LayoutProps {
  tag?: React.ElementType;
  children: React.ReactNode;
}
export type { LayoutProps, SelectProps };
