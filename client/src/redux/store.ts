import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/redux/features/userSlice';
import memoReducer from 'src/redux/features/memoSlice';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
