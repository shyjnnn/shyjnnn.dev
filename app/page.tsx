import Select from '@/components/shared/Select';

export default function Home() {
  return (
    <main>
      <Select
        categories={[
          ['가나다라마바', 1],
          ['사아자차카타', 2],
          ['파하하하하', 3],
        ]}
        initialOption={['가나다라마바', 1]}
      />
    </main>
  );
}
