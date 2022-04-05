// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// export const useFetchRedux = (
//   asyncFunction: Function,
//   dataFunction: Function,
//   loadingFunction: Function,
//   errorFunction: Function
// ) => {
//   const dispatch = useDispatch<Function>();

//   useEffect(() => {
//     (async () => {
//       dispatch(loadingFunction(true));

//       try {
//         const response = await asyncFunction();
//         const result = await response.json();
//         dispatch(dataFunction(result));
//       } catch (error) {
//         dispatch(errorFunction(true));
//       } finally {
//         dispatch(loadingFunction(false));
//         dispatch(errorFunction(false));
//       }
//     })();
//   }, [asyncFunction, dataFunction, dispatch, loadingFunction, errorFunction]);
// };

export {};
