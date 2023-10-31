import { BtnProps } from '@/types/components/shared.types';

const Btn = ({ children, ...props }: BtnProps) => {
  return (
    <button className='px-4 py-4 rounded-full bg-black text-white' {...props}>
      {children}
    </button>
  );
};

export default Btn;
