// import { useEffect, useState } from 'react';

// export const useAdapter = <T,>(initialState: T[], functionForAdapter: Function): { data: T[] } => {
//   const [data, setData] = useState(initialState);

//   useEffect(() => {
//     let isActive = true;
//     if (isActive) {
//       const dataAdapter = functionForAdapter();
//       setData(dataAdapter);
//     }

//     return () => {
//       isActive = false;
//     };
//   }, []);

//   return { data };
// };

export const EMPTY_FILE = true;
