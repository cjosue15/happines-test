import React from 'react';
import './List.scss';

const List = ({
  children,
  headers,
  loading,
  error,
}: {
  children: React.ReactNode;
  headers: string[];
  loading: boolean;
  error: boolean;
}) => {
  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>{headers.length > 0 && headers.map((item, index) => <th key={index}>{item}</th>)}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      )}
    </>
  );
};

export default List;
