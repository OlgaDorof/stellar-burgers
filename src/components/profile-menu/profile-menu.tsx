import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { fetchLogout, selectUser } from '../../slices/registerSlice';
import { useSelector } from '../../services/store';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(fetchLogout())
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
