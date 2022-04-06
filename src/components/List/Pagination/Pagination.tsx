import React from 'react';

import './Pagination.scss';

type PaginationProps = { currentPage: number; totalPage: number; handleNext: Function; handlePrevious: Function };

const Pagiantion = ({ currentPage, totalPage, handleNext, handlePrevious }: PaginationProps) => {
  return (
    <div className='pagination'>
      <div className='pagination__wrapper'>
        <div className='pagination__count'>
          <span>
            {currentPage} <small>of</small> {totalPage}
          </span>
        </div>
        <div className='pagination__arrows'>
          <button type='button' onClick={() => handlePrevious()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-left'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <polyline points='15 6 9 12 15 18' />
            </svg>
          </button>
          <button type='button' onClick={() => handleNext()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-right'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#2c3e50'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <polyline points='9 6 15 12 9 18' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagiantion;
