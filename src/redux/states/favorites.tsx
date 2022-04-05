import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '@models/person.model';
import { AppStore } from '../store';

const initialState: Person[] = [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addNewFavorite: (state: Person[], action: PayloadAction<Person>) => {
      return [...state, action.payload];
    },
    removeFavorite: (state: Person[], action: PayloadAction<string>) => {
      return [...state.filter((person) => !(person.id === action.payload))];
    },
  },
});

export const { addNewFavorite, removeFavorite } = favoritesSlice.actions;

export const favorites = (state: AppStore) => state.favorites;

export default favoritesSlice.reducer;
