import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function Card({
  category,
  title,
  slug,
  date,
  en_category,
}: {
  category: string;
  title: string;
  slug: string;
  date: string;
  en_category: string;
}) {
  return (
    <Link className={cx('wrap')} href={`${en_category}/${slug}`}>
      <div className={cx('shadow')}>
        <div className={cx('container')}>
          <p className={cx('category')}>{category}</p>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('date')}>{date}</p>
        </div>
      </div>
    </Link>
  );
}
