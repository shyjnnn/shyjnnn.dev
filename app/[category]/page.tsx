import CardList from '@/components/CardList';
import Category from '@/components/Category';
import Layout from '@/components/shared/Layout';

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <Layout>
      <Category currentCategory={params.category} />
      <CardList category={params.category} />
    </Layout>
  );
}
