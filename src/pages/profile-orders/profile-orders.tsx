import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrdersProfile,
  fetchProfileOrders
} from '../../slices/profileOrdersSlice';
import { fetchFeeds } from '../../slices/feedsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, []);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);
  const orders = useSelector(selectOrdersProfile);
  return <ProfileOrdersUI orders={orders} />;
};
