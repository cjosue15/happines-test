import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import './List.scss';

import Pagination from './Pagination/Pagination';
import Header from './Header/Header';
import { Sort, ListProp } from './models/list.model';
import { getSortedData } from '../../utils/utils';

const List = <T extends { [key: string]: any }>({ headers, rows, loading, error, pagination }: ListProp<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [dataForShow, setDataForShow] = useState<T[]>([]);
  const [dataSorted, setDataSorted] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [sortConfig, setsortConfig] = useState<Sort | undefined>();

  const NUMBER_ONE = 1;

  const handleNext = () => {
    if (currentPage < totalPage) {
      const NEXT_PAGE = currentPage + 1;
      setCurrentPage(NEXT_PAGE);
      changeDataAndPage(NEXT_PAGE, dataSorted);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const PREV_PAGE = currentPage - 1;
      setCurrentPage(PREV_PAGE);
      changeDataAndPage(PREV_PAGE, dataSorted);
    }
  };

  const changeDataAndPage = useCallback(
    (page: number, data: T[]) => {
      const items = pagination?.itemsPerPage || 0;
      const dataSliced = data!.slice(items * (page - NUMBER_ONE), items * page);
      setDataForShow(dataSliced);
    },
    [pagination]
  );

  const handleSort = useCallback(
    (sort: Sort | undefined) => {
      if (sort) {
        const { column, order } = sort;
        const sortedArray = getSortedData<T>([...rows], column, order);
        setDataSorted(sortedArray);
        setDataForShow(sortedArray);
        setsortConfig(sort);
        changeDataAndPage(currentPage, sortedArray);
      }
    },
    [changeDataAndPage, currentPage, rows]
  );

  useEffect(() => {
    if (pagination?.hasPagiantion) {
      const itemsPage = pagination?.itemsPerPage;
      const count = rows.length;
      setTotalPage(Math.ceil(count / itemsPage));
      setCount(count);
      changeDataAndPage(currentPage, rows);
      handleSort(sortConfig);
      setDataSorted(rows);
    }
  }, [pagination, rows.length, rows, changeDataAndPage, handleSort, currentPage, sortConfig]);

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
                    <Header key={index} config={header} handleSort={handleSort} />
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
