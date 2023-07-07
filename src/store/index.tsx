import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { PropsWithChildren } from 'react';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './features/user';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  user: userReducer,
}))

export const store = configureStore({
  reducer: persistedReducer,
})
export const persistor = persistStore(store)

export function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
