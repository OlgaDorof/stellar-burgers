import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchLogin,
  selectIsAuthenticated,
  selectUser
} from '../../slices/registerSlice';
import { useNavigate } from 'react-router-dom';
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };
  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
