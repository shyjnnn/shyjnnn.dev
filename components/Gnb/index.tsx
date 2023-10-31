import Link from 'next/link';

export default function Gnb() {
  return (
    <header className='h-28 flex justify-between items-center sticky top-0 bg-white z-10'>
      <a
        className='text-xl font-bold italic border-b-2 border-white hover:border-pink-300 transition duration-250'
        href='/'>
        Shyjnnn<span className='text-pink-400 text-3xl'>.</span>dev
      </a>
      <Link
        href='/about'
        className='text-xl font-semibold italic border-b-2 border-white hover:border-pink-300 transition duration-250'>
        About
      </Link>
    </header>
  );
}
