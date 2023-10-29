import '@/styles/global.scss';

import Layout from '@/components/shared/Layout';
import { getCategories } from '@/services/getCategories';

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  const categories: [string, number][] | Error = await getCategories();
  if (categories instanceof Error) throw Error;
  return (
    <Layout tag='main' className='head'>
      {children}
    </Layout>
  );
}
