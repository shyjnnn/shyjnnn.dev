import classNames from 'classnames/bind';

import Card from '@/components/shared/Card';
import { getPostsList } from '@/services/getPostsList';
import { PostInfo } from '@/types/api/data.types';

import styles from './styles.module.scss';
const cx = classNames.bind(styles);

export default async function CardList({ category }: { category: string }) {
  const post: PostInfo[] | Error = await getPostsList(category);
  if (post instanceof Error) return <></>;
  console.log(post);
  return (
    <div className={cx('card-list')}>
      {post &&
        post.length !== 0 &&
        post.map((card) => (
          <Card
            key={card.id}
            category={card.category}
            title={card.title}
            slug={card.id}
            date={card.date}
            en_category={card.en_category}
          />
        ))}
    </div>
  );
}
