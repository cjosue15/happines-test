import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '@models/person.model';
import { AppStore } from '../store';

type State = {
  loading: boolean;
  error: boolean;
  people: Person[];
};

const initialState: State = {
  error: false,
  loading: false,
  people: [],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state: State, action: PayloadAction<Person[]>) => {
      return {
        ...state,
        people: [...state.people, ...action.payload],
      };
    },
    changeStateOfFavorite: (state: State, action: PayloadAction<{ id: string; isFavorite: boolean }>) => {
      const { people } = state;

      return {
        ...state,
        people: [
          ...people.map((person) =>
            Number(person.id) === Number(action.payload.id)
              ? { ...person, isFavorite: action.payload.isFavorite }
              : person
          ),
        ],
      };
    },
    setLoading: (state: State, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError: (state: State, action: PayloadAction<boolean>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { setPeople, setLoading, setError, changeStateOfFavorite } = peopleSlice.actions;

export const peopleFromReducer = (state: AppStore) => state.people;

export default peopleSlice.reducer;
