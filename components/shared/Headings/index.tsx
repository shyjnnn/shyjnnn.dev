import classNames from 'classnames/bind';

import { HeadingItem } from '@/types/components/data.types';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const renderHeading = (heading: HeadingItem) => (
  <li className={cx('li')} key={heading.id} id={`#${heading.id}`}>
    <a className={cx('a')} href={`#${heading.id}`}>
      {heading.title}
    </a>
    {heading.items.length > 0 && (
      <ul className={cx('ul')}>{heading.items.map((child) => renderHeading(child))}</ul>
    )}
  </li>
);

const Headings = ({ headings }: { headings: HeadingItem[] }) => {
  return (
    <div className={cx('headings-wrap')}>
      <div className={cx('h2')}>ON THIS PAGE</div>
      <ul className={cx('wrap')}>{headings.map((heading) => renderHeading(heading))}</ul>
    </div>
  );
};

export default Headings;
