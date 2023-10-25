interface BlogPost {
  id: string;
  title: string;
  date: string;
}

interface AllBlogPosts extends BlogPost {
  category: string;
  en_category: string;
}

export type { AllBlogPosts, BlogPost };
