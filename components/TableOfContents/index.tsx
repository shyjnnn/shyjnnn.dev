'use client';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TableOfContents } from '@/types/components/data.types';
import { getIntersectionObserver } from '@/utils/getIntersectionObserver';
import { createId, getRawString } from '@/utils/getString';

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
  const itemClasses = `block py-1 hover:underline ${
    level === 'level-2'
      ? 'pl-2 sm:pl-4 md:pl-6 lg:pl-8'
      : level === 'level-3'
      ? 'pl-4 sm:pl-6 md:pl-8 lg:pl-10'
      : level === 'level-4'
      ? 'pl-6 sm:pl-8 md:pl-10 lg:pl-12'
      : ''
  } ${isActive ? 'text-blue' : 'text-semi-gray'}`;

  return (
    <Link id={id} className={itemClasses} onClick={handleClick} href={`#${id}`}>
      {getRawString(text)}
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
    <div className='sticky top-40 min-w-40rem ml-10 tablet:hidden'>
      <div className='text-lg font-semibold'>ON THIS PAGE</div>
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
