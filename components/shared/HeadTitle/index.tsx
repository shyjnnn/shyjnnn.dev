export default function HeadTitle({ text, count }: { text: string; count: number }) {
  return (
    <div className='flex items-start justify-center w-auto mx-auto gap-2'>
      <h1 className='text-7xl font-bold italic'>{text.toUpperCase()}</h1>
      <p className='text-base font-normal italic text-zinc-400'>{`(${count})`}</p>
    </div>
  );
}
