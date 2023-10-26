interface PostInfo {
  id: string;
  title: string;
  date: string;
}

interface AllPostInfos extends PostInfo {
  category: string;
  en_category: string;
}

interface PostData {
  title: string;
  date: string;
  slug: string;
  tags: string;
  category: string;
}

interface BlogPost {
  content: string;
  data: PostData;
  isEmpty: boolean;
  excerpt: string;
}

export type { AllPostInfos, BlogPost, PostData, PostInfo };
