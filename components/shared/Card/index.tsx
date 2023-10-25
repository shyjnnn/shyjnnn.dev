import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function Card({
  category,
  title,
  date,
  en_category,
}: {
  category: string;
  title: string;
  date: string;
  en_category: string;
}) {
  return (
    <Link href={`${en_category}/${title}`}>
      <div className={cx('shadow')}>
        <div className={cx('wrap')}>
          <p className={cx('category')}>{category}</p>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('date')}>{date}</p>
        </div>
      </div>
    </Link>
  );
}
