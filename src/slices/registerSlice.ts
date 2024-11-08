import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  updateUserApi,
  getUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export const fetchRegister = createAsyncThunk(
  'register/',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchLogin = createAsyncThunk(
  'login/',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUser = createAsyncThunk('auth/user', async () => getUserApi());

export const fetchLogout = createAsyncThunk('logout', async () => logoutApi());

export const fetchUpdateUser = createAsyncThunk(
  'update/',
  async (data: TRegisterData) => updateUserApi(data)
);

interface RegisterState {
  user: TUser;
  error: string | null | undefined;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
}

const initialState: RegisterState = {
  user: {
    name: '',
    email: ''
  },
  error: null,
  isAuthChecked: false,
  isAuthenticated: false
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsAuthChecked: (sliceState) => sliceState.isAuthChecked,
    selectIsAuthenticated: (sliceState) => sliceState.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.user = { name: '', email: '' };
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
      });
  }
});

export const { selectUser, selectIsAuthChecked, selectIsAuthenticated } =
  registerSlice.selectors;
export const {} = registerSlice.actions;
export default registerSlice.reducer;
