import Link from 'next/link';

export default function Gnb() {
  return (
    <header className='sticky top-0 z-10 flex items-center justify-between bg-white h-28'>
      <a
        className='text-xl italic font-bold transition border-b-2 border-white hover:border-pink-300 duration-250'
        href='/'>
        Shyjnnn<span className='text-3xl text-pink-400'>.</span>dev
      </a>
      <Link
        href='/portfolio'
        className='text-xl italic font-semibold transition border-b-2 border-white hover:border-pink-300 duration-250'>
        Portfolio
      </Link>
    </header>
  );
}
