import React, { useCallback } from 'react';
import './List.scss';

import Pagination from './Pagination/Pagination';
import { useEffect, useState } from 'react';

export type Headers<T> = { field: string; headerName: string; renderCell?: (param: T) => JSX.Element };

type ListProp<T> = {
  headers: Headers<T>[];
  rows: T[];
  loading: boolean;
  error: boolean;
  pagination?: {
    hasPagiantion: boolean;
    itemsPerPage: number;
  };
};

const List = <T extends { [key: string]: any }>({ headers, rows, loading, error, pagination }: ListProp<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [dataForShow, setDataForShow] = useState<T[]>([]);
  const [count, setCount] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPage) {
      const NEXT_PAGE = currentPage + 1;
      setCurrentPage(NEXT_PAGE);
      changeDataAndPage(NEXT_PAGE);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const PREV_PAGE = currentPage - 1;
      setCurrentPage(PREV_PAGE);
      changeDataAndPage(PREV_PAGE);
    }
  };

  const changeDataAndPage = useCallback(
    (page: number) => {
      const items = pagination?.itemsPerPage || 0;
      const NUMBER_ONE = 1;
      const dataSliced = rows.slice(items * (page - NUMBER_ONE), items * page);
      setDataForShow(dataSliced);
    },
    [pagination, rows]
  );

  useEffect(() => {
    if (pagination?.hasPagiantion) {
      const itemsPage = pagination?.itemsPerPage;
      const count = rows.length;
      setTotalPage(Math.ceil(count / itemsPage));
      setCount(count);
      changeDataAndPage(currentPage);
    }
  }, [pagination, rows.length, changeDataAndPage, currentPage]);

  return (
    <div className='list'>
      {loading && <p>Loading...</p>}

      {!loading && !error && (
        <div className='list__wrapper'>
          <div className='list__table'>
            <table>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header.headerName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {count === 0 && (
                  <tr>
                    <td style={{ textAlign: 'center' }} colSpan={headers.length}>
                      No data for show
                    </td>
                  </tr>
                )}
                {dataForShow.map((item: T, indexTr: number) => {
                  return (
                    <tr key={indexTr}>
                      {headers.map((header, indexTd) => {
                        return (
                          <td key={indexTd}>{header.renderCell ? header.renderCell(item) : item[`${header.field}`]}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='list__pagination'>
            {count > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
