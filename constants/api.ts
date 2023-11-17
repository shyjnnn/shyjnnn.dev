const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.BASE_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const CATEGORY_MAP: { [key: string]: string } = {
  encyclos: '🏫백과사전',
  trivia: '🙏잡학사전',
  algorithm: '🧮Algorithm',
  review: '🌱회고',
};

export { BASE_URL, CATEGORY_MAP };
