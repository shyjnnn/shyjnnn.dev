import classNames from 'classnames/bind';

import { getCategories } from '@/services/getCategories';

import CategoryText from '../shared/CategoryText';
import HeadTitle from '../shared/HeadTitle';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default async function Category({
  currentCategory = 'all',
}: {
  currentCategory: string;
}) {
  const categories: [string, number][] | Error = await getCategories();
  if (categories instanceof Error) throw Error;

  const category = categories.find((category) => category[0] === currentCategory);
  const count = category ? category[1] : 0;
  return (
    <div className={cx('wrap')}>
      <HeadTitle text={currentCategory} count={count} />
      <div className={cx('category-list')}>
        {categories.map((category) => (
          <CategoryText
            key={category[0]}
            text={category[0]}
            count={category[1]}
            isCurrent={currentCategory === category[0]}
          />
        ))}
      </div>
    </div>
  );
}
