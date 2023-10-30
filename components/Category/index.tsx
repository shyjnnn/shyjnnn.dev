import { getCategories } from '@/services/getCategories';

import CategoryText from '../shared/CategoryText';
import HeadTitle from '../shared/HeadTitle';

export default async function Category({
  currentCategory = 'all',
}: {
  currentCategory: string;
}) {
  const categories: [string, number][] | Error = await getCategories();
  if (categories instanceof Error) throw Error;
  return (
    <div>
      <HeadTitle text={currentCategory} count={0} />
      {categories.map((category) => (
        <CategoryText
          key={category[0]}
          text={category[0]}
          count={category[1]}
          isCurrent={currentCategory === category[0]}
        />
      ))}
    </div>
  );
}
