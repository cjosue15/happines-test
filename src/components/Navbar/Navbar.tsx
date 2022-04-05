import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.scss';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import List from '../List/List';

import { favorites, removeFavorite } from '../../redux/states/favorites';
import { Person } from '../../models/person.model';
import { changeStateOfFavorite } from '../../redux/states/people';

const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<Function>();
  const favoritesPerson = useSelector(favorites);
  const HEADERS = [
    'Id',
    'Name',
    'Category',
    'Category image',
    'Company',
    'Company image',
    'Level of happiness',
    'Actions',
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
          <List headers={HEADERS} error={false} loading={false}>
            {favoritesPerson.length === 0 && (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan={8}>No data</td>
              </tr>
            )}
            {favoritesPerson.length > 0 &&
              favoritesPerson?.map((person: Person) => (
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
                  </td>
                </tr>
              ))}
          </List>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
