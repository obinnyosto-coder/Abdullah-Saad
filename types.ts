
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Full text for the modal
  category: string;
  date: string;
  image: string;
  author: string;
}

export interface Category {
  name: string;
  count: number;
}
