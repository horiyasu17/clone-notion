import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/redux/features/userSlice'
import {useSelector as rawUseSelector, TypedUseSelectorHook} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;