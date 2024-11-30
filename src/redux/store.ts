import { configureStore } from '@reduxjs/toolkit';
import horarioReducer from './horarioSlice';

const store = configureStore({
  reducer: {
    horarios: horarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
