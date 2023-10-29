import CategoryText from '../shared/CategoryText';
import HeadTitle from '../shared/HeadTitle';

export default function Category({
  categories,
  currentCategory,
}: {
  categories: [string, number][];
  currentCategory: string;
}) {
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
      ))}{' '}
    </div>
  );
}
