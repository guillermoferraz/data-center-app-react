import { useDispatch } from 'react-redux'
import store from '../store';

type AppDispatch = typeof store.dispatch;
export type RootSate = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

