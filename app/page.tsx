import classNames from 'classnames/bind';

import Card from '@/components/shared/Card';
// import Layout from '@/components/shared/Layout';
// import Select from '@/components/shared/Select';
// import { getCategories } from '@/services/getCategories';
import { getPostsList } from '@/services/getPostsList';
import styles from '@/styles/page/home.styles.module.scss';
import { PostInfo } from '@/types/api/data.types';

const cx = classNames.bind(styles);

export default async function Home({ params }: { params: { category: string } }) {
  // const categories: [string, number][] | Error = await getCategories();
  // if (categories instanceof Error) {
  //   throw Error;
  // }
  console.log(params?.category);

  const allPosts: PostInfo[] | Error = await getPostsList();

  if (allPosts instanceof Error) throw Error;
  return (
    // <Layout tag='main' className='head'>
    //   <Select
    //     categories={categories}
    //     initialOption={params?.category ? params.category[0] : 'all'}
    //   />

    <section className={cx('card-section')}>
      {allPosts.length !== 0 &&
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
    // </Layout>
  );
}
