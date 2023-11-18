import Card from '@/components/shared/Card';
import { getPostsList } from '@/services/getPostsList';
import { PostInfo } from '@/types/api/data.types';
import dateToString from '@/utils/dateToString';

export default async function CardList({ category }: { category: string }) {
  const post: PostInfo[] | Error = await getPostsList(category);
  if (post instanceof Error) return <></>;
  return (
    <>
      {post &&
        post.length !== 0 &&
        post.map((card) => {
          return (
            <Card
              key={card.id}
              category={card.category}
              title={card.title}
              slug={card.id}
              date={dateToString(new Date(card.date))}
              en_category={card.en_category}
              thumbnail={card?.thumbnail}
              summary={card?.summary}
            />
          );
        })}
    </>
  );
}
