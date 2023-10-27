import classNames from 'classnames/bind';

import { TableOfContents } from '@/types/components/data.types';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const TableOfContents = ({ tableOfContents }: { tableOfContents: TableOfContents[] }) => {
  let lastLevel = 1;
  return (
    <div className={cx('wrap')}>
      <div className={cx('h2')}>ON THIS PAGE</div>
      {tableOfContents.map((content, index) => {
        let className = `level-${content.level}`;
        if (content.level > lastLevel + 1) {
          className = `level-${lastLevel + 1}`;
        }
        lastLevel = content.level;
        return (
          <div key={index} className={cx('toc-item', className)}>
            {content.text}
          </div>
        );
      })}
    </div>
  );
};

export default TableOfContents;
