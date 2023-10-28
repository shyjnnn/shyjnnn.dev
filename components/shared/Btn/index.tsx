import classNames from 'classnames/bind';

import { BtnProps } from '@/types/components/shared.types';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

const Btn = ({ children, ...props }: BtnProps) => {
  return (
    <button className={cx('btn')} {...props}>
      {children}
    </button>
  );
};

export default Btn;
