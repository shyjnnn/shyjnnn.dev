'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { forwardRef, Ref, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';
import { SelectProps } from '@/types/components/shared.types';
import { createId } from '@/utils/getString';

import HeadTitle from '../HeadTitle';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Select(props: SelectProps, ref: Ref<HTMLButtonElement>) {
  console.log(props.initialOption);
  const { categories, initialOption } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const allCategory: [string, number] = categories.find(
    (category) => category[0] === 'all'
  ) as [string, number];
  const [selectedOption, setSelectedOption] = useState<[string, number]>(
    initialOption
      ? (categories.filter((category) => category[0] === initialOption)[0] as [
          string,
          number,
        ])
      : allCategory
  );

  const selectRef = useOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  const handleOptionClick = (category: [string, number]) => {
    setSelectedOption(category);
    setIsOpen(false);
  };

  return (
    <div className={cx('wrap')} ref={selectRef}>
      <button type='button' className={cx()} ref={ref} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption && (
          <HeadTitle text={selectedOption[0]} count={selectedOption[1]} />
        )}
      </button>
      {isOpen && (
        <ul className={cx('ul')}>
          {categories
            .filter((category: [string, number]) => category[0] !== selectedOption[0])
            .map((category: [string, number]) => (
              <Link
                href={category[0] === 'all' ? '/' : `/${createId(category[0])}`}
                className={cx('li')}
                key={category[0]}
                onClick={() => handleOptionClick(category)}>
                {category[0]} <span className={cx('span')}>{`(${category[1]})`}</span>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}

export default forwardRef(Select);
