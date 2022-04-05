import { PersonEndpoint, Person } from '../models/person.model';

export const createPersonAdapter = (person: PersonEndpoint): Person => {
  const formatedPerson: Person = {
    id: person.id,
    name: person.name,
    category: person.category,
    categoryImage: person['category-image'],
    company: person.company,
    companyImage: person['company-image'],
    levelOfHappiness: person.levelOfHappiness,
    isFavorite: false,
  };

  return formatedPerson;
};
