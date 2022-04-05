import { configureStore } from '@reduxjs/toolkit';

import { Person } from '@models/person.model';

import favoritesSlice from './states/favorites';
import peopleSlice from './states/people';

export interface AppStore {
  favorites: Person[];
  people: {
    loading: boolean;
    error: boolean;
    people: Person[];
  };
}

export default configureStore<AppStore>({
  reducer: {
    favorites: favoritesSlice,
    people: peopleSlice,
  },
});
