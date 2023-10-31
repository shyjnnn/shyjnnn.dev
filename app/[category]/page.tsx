import CardList from '@/components/CardList';
import Category from '@/components/Category';

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <>
      <Category currentCategory={params.category} />
      <CardList category={params.category} />
    </>
  );
}
