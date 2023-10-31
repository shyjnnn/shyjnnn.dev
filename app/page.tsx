export const dynamic = 'force-dynamic'; // NOTE : fetch error 임시 해결

import CardList from '@/components/CardList';
import Category from '@/components/Category';

export default function HomePage() {
  return (
    <main>
      <Category currentCategory='all' />
      <CardList category='all' />
    </main>
  );
}
