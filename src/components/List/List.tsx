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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
