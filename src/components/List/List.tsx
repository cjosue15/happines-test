import React from 'react';
import './List.scss';

export type Headers<T> = { field: string; headerName: string; renderCell?: (param: T) => JSX.Element };

const List = <T extends { [key: string]: any }>({
  headers,
  rows,
  loading,
  error,
}: {
  headers: Headers<T>[];
  rows: T[];
  loading: boolean;
  error: boolean;
}) => {
  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item: T, indexTr: number) => {
              return (
                <tr key={indexTr}>
                  {headers.map((header, indexTd) => {
                    // if(Object.hasOwnProperty(item[`${header.field}`]))
                    console.log(item[`${header.field}`]);

                    return (
                      <td key={indexTd}>{header.renderCell ? header.renderCell(item) : item[`${header.field}`]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default List;
