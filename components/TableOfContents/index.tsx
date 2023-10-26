'use client';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);
import useHeadingsData from '@/hooks/useHeadingsData';

import Headings from '../shared/Headings';

const TableOfContents: React.FC = () => {
  const { nestedHeadings } = useHeadingsData();

  return (
    <nav className={cx('wrap')} aria-label='Table of contents'>
      <Headings headings={nestedHeadings} />
    </nav>
  );
};

export default TableOfContents;
