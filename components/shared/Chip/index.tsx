export default function Chip({ text }: { text: string }) {
  return (
    <button className='text-sm font-normal px-1.5 rounded-md bg-gray-400 text-white hover:bg-pink-400'>
      {text}
    </button>
  );
}
