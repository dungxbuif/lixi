import { api } from '@/shared/config/api.config';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../slices/user/user.slice';
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  reducer: {
    user: userSlice,
    [api.reducerPath]: api.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
