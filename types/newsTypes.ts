// News Types
export type NewsStatus = "Published" | "Draft";
export type NewsCategory = "Stock" | "Crypto" | "Economy";

export type NewsFilterOption = NewsCategory | "All";
export type NewsStatusFilterOption = NewsStatus | "All";

export interface NewsItem {
  id: number;
  title: string;
  category: NewsCategory;
  publishDate: string;
  status: NewsStatus;
  featured: boolean;
  content?: string;
}

export interface NewNewsData {
  title: string;
  category: NewsCategory;
  publishDate: string;
  content: string;
  status: NewsStatus;
  featured: boolean;
}
