
export type HomeCategory = {
  id?: string;
  _id?: string;
  name: string;
};

export type HomeTechnician = {
  name?: string;
  user?: {
    name?: string;
  };
};

export type HomeService = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  image?: string;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  categoryId?: string;
  categoryName?: string;
  category?: HomeCategory | string;
  technician?: HomeTechnician;
  technicianName?: string;
};

export type HomeCategoryItem = {
  id: string;
  name: string;
};

