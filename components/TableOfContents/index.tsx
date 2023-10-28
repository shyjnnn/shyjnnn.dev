'use client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TableOfContents } from '@/types/components/data.types';
import createId from '@/utils/createId';
import { getIntersectionObserver } from '@/utils/getIntersectionObserver';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface TableOfContentItemProps {
  text: string;
  level: string;
  isActive: boolean;
  onCurrentId: Dispatch<SetStateAction<string>>;
}

const TableOfContentItem = ({
  text,
  level,
  isActive,
  onCurrentId,
}: TableOfContentItemProps) => {
  const id = createId(text);
  const handleClick = () => {
    onCurrentId(id);
  };
  return (
    <Link
      id={id}
      className={cx('toc-item', level, { current: isActive })}
      onClick={handleClick}
      href={`#${id}`}>
      {text}
    </Link>
  );
};

const TableOfContents = ({ tableOfContents }: { tableOfContents: TableOfContents[] }) => {
  let lastLevel = 1;
  const [currentId, setCurrentId] = useState<string>('');
  const [, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h3'));

    setHeadingEls(headingElements);

    headingElements.map((header) => {
      observer.observe(header);
    });
  }, []);

  return (
    <div className={cx('wrap')}>
      <div className={cx('h2')}>ON THIS PAGE</div>
      {tableOfContents.map((content, index) => {
        let level = `level-${content.level}`;
        if (content.level > lastLevel + 1) {
          level = `level-${lastLevel + 1}`;
        }
        lastLevel = content.level;
        return (
          <TableOfContentItem
            key={index}
            text={content.text}
            level={level}
            isActive={currentId === createId(content.text)}
            onCurrentId={setCurrentId}
          />
        );
      })}
    </div>
  );
};

export default TableOfContents;
