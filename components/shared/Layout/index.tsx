import classNames from 'classnames/bind';

import { LayoutProps } from '@/types/components/shared.types';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export default function Layout({
  tag: Tag = 'div',
  className,
  children,
  ...props
}: LayoutProps) {
  return (
    <Tag className={cx('layout', className)} {...props}>
      {children}
    </Tag>
  );
}
