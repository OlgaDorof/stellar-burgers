import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedsSlice from '../slices/feedsSlice';
import registerSlice from '../slices/registerSlice';
import ingredientsSlice from '../slices/ingredientsSlice';
import orderBurgerSlice from '../slices/orderBurgerSlice';
import profileOrdersSlice from '../slices/profileOrdersSlice';
const rootReducer = combineReducers({
  feeds: feedsSlice,
  ingredients: ingredientsSlice,
  register: registerSlice,
  orderBurger: orderBurgerSlice,
  profileOrders: profileOrdersSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
