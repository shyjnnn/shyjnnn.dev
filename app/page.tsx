export const dynamic = 'force-dynamic'; // NOTE : fetch error 임시 해결

import CardList from '@/components/CardList';
import Category from '@/components/Category';
import Layout from '@/components/shared/Layout';

export default function HomePage() {
  return (
    <Layout>
      <Category currentCategory='all' />
      <CardList category='all' />
    </Layout>
  );
}
