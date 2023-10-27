import classNames from 'classnames/bind';

import Card from '@/components/shared/Card';
import { getPostsList } from '@/services/getPostsList';
import styles from '@/styles/page/home.styles.module.scss';
import { PostInfo } from '@/types/api/data.types';

const cx = classNames.bind(styles);

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const post: PostInfo[] | Error = await getPostsList(params?.category);

  if (post instanceof Error) throw Error;

  return (
    <section className={cx('card-section')}>
      {post.length !== 0 &&
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
    </section>
  );
}
