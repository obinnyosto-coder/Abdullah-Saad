
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  footerText: string;
  heroImageUrl: string;
  sidebarAdUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
}
