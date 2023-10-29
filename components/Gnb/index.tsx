import classNames from 'classnames/bind';

// import Link from 'next/link';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default function Gnb() {
  return (
    <header className={cx('gnb')}>
      <a className={cx('logo')} href='/'>
        Shyjnnn.dev
      </a>
      <a className={cx('about')} href='/about'>
        About
      </a>
    </header>
  );
}
