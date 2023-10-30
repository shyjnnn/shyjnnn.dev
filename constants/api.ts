const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.BASE_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export { BASE_URL };
