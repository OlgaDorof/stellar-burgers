import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../slices/registerSlice';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user.name) {
    // если пользователь на странице авторизации и данных в хранилище нет
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user.name) {
    // если пользователь на странице авторизации и данные есть в хранилище
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
