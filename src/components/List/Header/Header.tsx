import React from 'react';
import { useState } from 'react';

import { HeaderConfig, Sort, SortEnum } from '../models/list.model';

const Header = ({ config, handleSort }: { config: HeaderConfig; handleSort: (name: Sort) => void }) => {
  const [sort, setSort] = useState<Sort>({
    order: null,
    column: config.field,
  });

  const handleState = () => {
    if (config.sortable) {
      const sortConfig: Sort = {
        ...sort,
        order: sort.order === null ? 'asc' : sort.order === 'asc' ? 'desc' : null,
      };
      setSort(sortConfig);
      handleSort(sortConfig);
    }
  };

  return (
    <th onClick={handleState}>
      {config.headerName}
      {sort.order && (
        <i>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='#000'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            {sort.order === SortEnum.ASC ? (
              <>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='16' y1='9' x2='12' y2='5' />
                <line x1='8' y1='9' x2='12' y2='5' />
              </>
            ) : (
              <>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='16' y1='15' x2='12' y2='19' />
                <line x1='8' y1='15' x2='12' y2='19' />
              </>
            )}
          </svg>
        </i>
      )}
    </th>
  );
};

export default Header;
