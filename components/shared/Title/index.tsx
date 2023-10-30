import classNames from 'classnames/bind';

import dateToString from '@/utils/dateToString';

import Chip from '../Chip';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function Title({
  title,
  tags,
  date,
}: {
  title: string;
  tags: string[];
  date: string;
}) {
  return (
    <div className={cx('wrap')}>
      <h1 className={cx('title')}>{title}</h1>
      <nav>
        <div className={cx('date')}>{dateToString(new Date(date))}</div>
        <div className={cx('tags')}>
          {tags.map((tag) => (
            <Chip key={tag} text={tag} />
          ))}
        </div>
      </nav>
      <hr />
    </div>
  );
}
