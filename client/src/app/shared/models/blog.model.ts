export interface BlogItem {
  id: number;
  imageUrl: string;
  categoryId: number;
  title: string;
  description: string;
}

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
}
