import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.scss';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import List, { Headers } from '../List/List';

import { favorites, removeFavorite } from '../../redux/states/favorites';
import { Person } from '../../models/person.model';
import { changeStateOfFavorite } from '../../redux/states/people';

const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<Function>();
  const favoritesPerson = useSelector(favorites);
  const HEADERS: Headers<Person>[] = [
    { field: 'id', headerName: 'Id' },
    { field: 'name', headerName: 'Name' },
    { field: 'category', headerName: 'Category' },
    {
      field: 'categoryImage',
      headerName: 'Category image',
      renderCell: (person) => (
        <img
          width={20}
          height={20}
          src={require(`../../assets/images/${person.categoryImage}`)}
          alt={person.category}
        />
      ),
    },
    { field: 'company', headerName: 'Company' },
    {
      field: 'companyImage',
      headerName: 'Company image',
      renderCell: (person) => (
        <img width={20} height={20} src={require(`../../assets/images/${person.companyImage}`)} alt={person.company} />
      ),
    },
    { field: 'levelOfHappiness', headerName: 'Level of happiness' },
    {
      field: 'isFavorite',
      headerName: 'Actions',
      renderCell: (person) => {
        return (
          <button onClick={() => handleDelete(person.id)}>
            <svg
              width='24'
              height='24'
              xmlns='http://www.w3.org/2000/svg'
              className='icon-trash'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <line x1='4' y1='7' x2='20' y2='7' />
              <line x1='10' y1='11' x2='10' y2='17' />
              <line x1='14' y1='11' x2='14' y2='17' />
              <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
              <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
            </svg>
          </button>
        );
      },
    },
  ];

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    dispatch(removeFavorite(id));
    dispatch(changeStateOfFavorite({ id, isFavorite: false }));
  };

  return (
    <>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar__wrapper'>
            <h1 className='navbar__title'>Happines Test</h1>
            <Button name='Favorites' clickFunction={handleOpenModal} />
          </div>
        </div>
      </nav>
      {showModal && (
        <Modal title='Favorite List' closeFunction={handleCloseModal}>
          <List
            headers={HEADERS}
            error={false}
            loading={false}
            rows={[...favoritesPerson]}
            pagination={{
              hasPagiantion: true,
              itemsPerPage: 5,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
