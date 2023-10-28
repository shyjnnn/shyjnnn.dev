import classNames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export default function Chip({ text }: { text: string }) {
  return <button className={cx('chip')}>{text}</button>;
}
