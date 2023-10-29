import '@/styles/global.scss';

import Layout from '@/components/shared/Layout';
import Select from '@/components/shared/Select';
import { getCategories } from '@/services/getCategories';

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  const categories: [string, number][] | Error = await getCategories();
  console.log(params.category);
  if (categories instanceof Error) {
    console.log('레이아웃 에러임');
    throw Error;
  }

  return (
    <Layout tag='main' className='head'>
      <Select
        categories={categories}
        initialOption={params?.category ? params.category[0] : 'all'}
      />
      {children}
    </Layout>
  );
}
