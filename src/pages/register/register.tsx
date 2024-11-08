import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchRegister,
  selectIsAuthenticated,
  selectUser
} from '../../slices/registerSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(selectUser);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegister({ email, password, name: userName }));
  };
  console.log(user);
  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
