import classNames from 'classnames/bind';

import Card from '@/components/shared/Card';
import { getPostsList } from '@/services/getPostsList';
import styles from '@/styles/page/home.styles.module.scss';
import { PostInfo } from '@/types/api/data.types';

const cx = classNames.bind(styles);

export default async function Home() {
  const allPosts: PostInfo[] | Error = await getPostsList();

  if (allPosts instanceof Error) throw Error;
  console.log(allPosts);
  return (
    <section className={cx('card-section')}>
      {allPosts &&
        allPosts.length !== 0 &&
        allPosts.map((card) => (
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
