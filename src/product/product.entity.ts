class ListProductCharacteristicsDTO {
  name: string;
  description: string;
}

class ListProductImagesDTO {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  category: string;
  characteristics: ListProductCharacteristicsDTO[];
  images: ListProductImagesDTO[];
}