import classNames from 'classnames/bind';

import { HeadingItem } from '@/types/components/data.types';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Headings = ({ headings }: { headings: HeadingItem[] }) => (
  <>
    <h2 className={cx('h2')}>ON THIS PAGE</h2>
    <ul>
      {headings.map((heading) => (
        <li key={heading.id} id={`#${heading.id}`}>
          <a className={cx('a')} href={`#${heading.id}`}>
            {heading.title}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child) => (
                <li key={child.id} id={`#${child.id}`}>
                  <a className={cx('a')} href={`#${child.id}`}>
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </>
);
export default Headings;
