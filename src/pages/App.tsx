import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { peopleFromReducer, setError, setLoading, changeStateOfFavorite, setPeople } from '../redux/states/people';
import { createPersonAdapter } from '../adapters/person.adapter';

import List, { Headers } from '../components/List/List';
import Navbar from '../components/Navbar/Navbar';
import './App.scss';
import { addNewFavorite } from '../redux/states/favorites';
import { Person, PersonEndpoint } from '../models/person.model';

const API = 'data/people.json';

function App() {
  const dispatch = useDispatch<Function>();
  const { error, loading, people } = useSelector(peopleFromReducer);

  const HEADERS: Headers<Person>[] = [
    { field: 'id', headerName: 'Id' },
    { field: 'name', headerName: 'Name' },
    { field: 'category', headerName: 'Category' },
    {
      field: 'categoryImage',
      headerName: 'Category image',
      renderCell: (item) => (
        <img width={20} height={20} src={require(`../assets/images/${item.categoryImage}`)} alt='' />
      ),
    },
    { field: 'company', headerName: 'Company' },
    {
      field: 'companyImage',
      headerName: 'Company image',
      renderCell: (item) => (
        <img width={20} height={20} src={require(`../assets/images/${item.companyImage}`)} alt='' />
      ),
    },
    { field: 'levelOfHappiness', headerName: 'Level of happiness' },
    {
      field: 'isFavorite',
      headerName: 'Actions',
      renderCell: (person) => {
        return (
          <button type='button' onClick={() => handleFavorite(person)}>
            <svg
              className={person.isFavorite ? 'favorite' : undefined}
              strokeWidth={2}
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
            >
              <path d='M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z'></path>
            </svg>
          </button>
        );
      },
    },
  ];

  const fetchPeople = () => fetch(API, { method: 'GET' });

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetchPeople();
        const result = await response.json();
        const people = result.map((item: PersonEndpoint) => createPersonAdapter(item));
        dispatch(setPeople(people));
      } catch (error) {
        dispatch(setError(true));
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [dispatch]);

  const handleFavorite = (person: Person) => {
    if (!person.isFavorite) {
      dispatch(changeStateOfFavorite({ id: person.id, isFavorite: true }));
      dispatch(addNewFavorite(person));
    }
  };

  return (
    <>
      <Navbar />
      <div className='app'>
        <div className='container'>
          <List
            headers={HEADERS}
            error={error}
            loading={loading}
            rows={[...people]}
            pagination={{
              hasPagiantion: true,
              itemsPerPage: 5,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
