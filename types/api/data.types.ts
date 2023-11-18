interface PostInfo {
  id: string;
  title: string;
  date: Date;
  category: string;
  en_category: string;
  thumbnail?: string;
  summary?: string;
}

interface PostData {
  title: string;
  date: string;
  slug: string;
  tags: string;
  category: string;
  thumbnail?: string;
  summary?: string;
}

interface BlogPost {
  content: string;
  data: PostData;
  isEmpty: boolean;
  excerpt: string;
}

export type { BlogPost, PostData, PostInfo };
