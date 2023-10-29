import classNames from 'classnames/bind';
import Link from 'next/link';

import { createId } from '@/utils/getString';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function CategoryText({
  text,
  count,
  isCurrent,
}: {
  text: string;
  count: number;
  isCurrent: boolean;
}) {
  return (
    <Link className={cx('wrap')} href={text === 'all' ? '/' : `/${createId(text)}`}>
      <h1 className={cx('title', { current: isCurrent })}>{text.toUpperCase()}</h1>
      <p className={cx('count')}>{`(${count})`}</p>
    </Link>
  );
}
