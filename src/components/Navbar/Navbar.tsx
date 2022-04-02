import React, { useState } from 'react';
import Button from '../Button/Button';

import './Navbar.scss';

import Modal from '../Modal/Modal';

const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('Holi close');
    setShowModal(false);
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
          <p>Text</p>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
