export default function Chip({ text }: { text: string }) {
  return (
    <button className='text-size6 font-normal p-1.5 px-2.5 rounded-lg bg-light-blue-gray text-gray hover:bg-blue hover:text-white'>
      {text}
    </button>
  );
}
