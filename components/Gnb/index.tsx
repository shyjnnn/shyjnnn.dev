import Link from 'next/link';

export default function Gnb() {
  return (
    <header className='h-28 flex justify-between items-center'>
      <a className='text-xl font-semibold italic' href='/'>
        Shyjnnn.dev
      </a>
      <Link href='/about' className='text-xl font-semibold italic'>
        About
      </Link>
    </header>
  );
}
