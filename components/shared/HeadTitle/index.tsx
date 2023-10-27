import classNames from 'classnames/bind';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function HeadTitle({ text, count }: { text: string; count: number }) {
  return (
    <div className={cx('head-title')}>
      <h1 className={cx('title')}>{text.toUpperCase()}</h1>
      <p className={cx('count')}>{`(${count})`}</p>
    </div>
  );
}
