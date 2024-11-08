import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../slices/registerSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { name } = useSelector(selectUser);
  return <AppHeaderUI userName={name} />;
};
