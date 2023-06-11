import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import clientsReducer, { loadClientsFromLocalStorage } from './client';

export const createStore = async () => {
  const clientsFromLocal = await loadClientsFromLocalStorage();
  const store = configureStore({
    reducer: {
      clients: clientsReducer,
    },
    preloadedState: {
      clients: { clients: clientsFromLocal || [] },
    },
  });

  return store;
};

const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
  preloadedState: {
    clients: { clients: [] },
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
