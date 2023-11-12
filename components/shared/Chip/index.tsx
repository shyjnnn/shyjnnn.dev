import { CATEGORY_CHIP_COLOR } from '@/constants/category';

export default function Chip({
  variant,
  text,
}: {
  variant?: string | undefined;
  text: string;
}) {
  const color = variant
    ? CATEGORY_CHIP_COLOR['잡학사전']
    : 'bg-gray-400 text-white hover:bg-pink-300';
  return (
    <button className={`text-sm font-normal px-1.5 rounded-md ${color}`}>{text}</button>
  );
}
