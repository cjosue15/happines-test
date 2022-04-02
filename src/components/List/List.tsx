import React, { useEffect, useState } from 'react';
import './List.scss';

import { createPersonAdapter } from '../../adapters/person.adapter';
import { useFetch } from '../../hooks/useFetch';
import { Person, PersonEndpoint } from '../../models/person.model';

const API = 'data/people.json';

const List = () => {
  const [dataFromApi, load, error] = useFetch<PersonEndpoint[]>(API, []);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const adaptedData = () => dataFromApi.map((item: PersonEndpoint): Person => createPersonAdapter(item));
    setPeople(adaptedData());
  }, [dataFromApi]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Category image</th>
            <th>Company</th>
            <th>Company image</th>
            <th>Level of happiness</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            !error &&
            people?.map((person: Person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.category}</td>
                <td>
                  <img width={20} height={20} src={require(`../../assets/images/${person.categoryImage}`)} alt='' />
                </td>
                <td>{person.company}</td>
                <td>
                  <img width={20} height={20} src={require(`../../assets/images/${person.companyImage}`)} alt='' />
                </td>
                <td>{person.levelOfHappiness}</td>
                <td className='actions'>
                  <svg
                    className={person.isFavorite ? 'favorite' : undefined}
                    strokeWidth={2}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                  >
                    <path d='M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z'></path>
                  </svg>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
