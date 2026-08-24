export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;

  categoryId: string;
  category?: Category;

  basePrice: number;
  priceUnit?: string;

  image?: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}