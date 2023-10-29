import classNames from 'classnames/bind';

import Category from '@/components/Category';
import Card from '@/components/shared/Card';
import { getCategories } from '@/services/getCategories';
import { getPostsList } from '@/services/getPostsList';
import styles from '@/styles/page/home.styles.module.scss';
import { PostInfo } from '@/types/api/data.types';

const cx = classNames.bind(styles);
export default async function HomePage() {
  const post: PostInfo[] | Error = await getPostsList();
  const categories: [string, number][] | Error = await getCategories();
  if (post instanceof Error) throw Error;
  if (categories instanceof Error) throw Error;
  return (
    <>
      <Category categories={categories} currentCategory='all' />
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
    </>
  );
}
