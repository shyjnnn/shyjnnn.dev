export default function HeadTitle({ text, count }: { text: string; count: number }) {
  return (
    <div className='flex items-start justify-center w-auto mx-auto gap-2'>
      <h1 className='text-size1 font-semibold italic'>{text.toUpperCase()}</h1>
      <p className='text-base font-normal italic text-gray'>{`(${count})`}</p>
    </div>
  );
}
