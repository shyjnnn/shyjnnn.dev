export default function Chip({
  variant,
  text,
}: {
  variant?: string | undefined;
  text: string;
}) {
  const color =
    variant === 'category'
      ? CATEGORY_CHIP_COLOR[text]
      : 'bg-gray-400 text-white hover:bg-pink-100';
  return (
    <button className={`text-sm font-normal px-1.5 rounded-md ${color}`}>{text}</button>
  );
}

const CATEGORY_CHIP_COLOR: { [key: string]: string } = {
  '🏫백과사전': 'bg-green-100',
  '🙏잡학사전': 'bg-amber-100',
  '🙌Shyjnnn': 'bg-pink-100',
  '✏️TIL': 'bg-violet-100',
  '📑WIL': 'bg-orange-100',
  '🧮Algorithm': 'bg-rose-100',
  '👻나자신': 'bg-slate-100',
  '💹Cryptometer': 'bg-lime-100',
  '🔗Linkbrary': 'bg-cyan-100',
  '👩‍🍳더줄게': 'bg-orange-200',
};
