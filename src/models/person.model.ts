export interface Person {
  id: string;
  name: string;
  category: string;
  categoryImage: string;
  company: string;
  companyImage: string;
  levelOfHappiness: string;
  isFavorite: boolean;
}

export interface PersonEndpoint {
  id: string;
  name: string;
  category: string;
  'category-image': string;
  company: string;
  'company-image': string;
  levelOfHappiness: string;
}
