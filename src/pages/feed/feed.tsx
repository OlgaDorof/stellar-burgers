import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders, selectIsLoading } from '../../slices/feedsSlice';
import { fetchFeeds } from '../../slices/feedsSlice';
export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  function handleGetFeeds() {
    dispatch(fetchFeeds());
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
