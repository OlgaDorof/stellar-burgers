import registerSlice, {
  initialState,
  getUser,
  fetchLogout,
  fetchUpdateUser,
  fetchRegister,
  fetchLogin,
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated
} from '../registerSlice';

const mockUser = {
  success: true,
  user: {
    name: 'olga',
    email: 'olga@yandex.ru'
  }
};

const mockUserForRegister = {
  name: 'olga',
  email: 'olga@yandex.ru',
  password: '123456'
};

describe('проверка работы registerSlice', () => {
  it('проверка правильной работы registerSlice при несуществующем action', () => {
    const action = { type: '' };
    const state = registerSlice(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('загрузка запроса данных о пользователе', () => {
    const action = getUser.pending('');
    const state = registerSlice(initialState, action);
    expect(state.error).toBeNull();
  });
  it('успешный запрос данных о пользователе', () => {
    const action = getUser.fulfilled(mockUser, '');
    const state = registerSlice(initialState, action);
    expect(state.user).toEqual(mockUser.user);
    expect(state.isAuthChecked).toBe(true);
  });
  it('ошибка при запросе данных о пользователе', () => {
    const action = getUser.rejected({ message: 'error', name: '' }, '');
    const state = registerSlice(initialState, action);
    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(true);
  });
  it('загрузка запроса на выход из аккаунта', () => {
    const action = fetchLogout.pending('');
    const state = registerSlice(initialState, action);
    expect(state.error).toBeNull();
  });
  it('успешный запрос на выход из аккаунта', () => {
    const action = fetchLogout.fulfilled(mockUser, '');
    const state = registerSlice(initialState, action);
    expect(state.user).toEqual(initialState.user);
  });
  it('ошибка при запросе на выход из аккаунта', () => {
    const action = fetchLogout.rejected({ message: 'error', name: '' }, '');
    const state = registerSlice(initialState, action);
    expect(state.error).toBe('error');
  });
  it('загрузка запроса на обновление данных пользователя', () => {
    const action = fetchUpdateUser.pending('', mockUserForRegister);
    const state = registerSlice(initialState, action);
    expect(state.error).toBeNull();
  });
  it('успешное обновление данных о пользователе', () => {
    const action = fetchUpdateUser.fulfilled(
      { success: true, user: mockUser.user },
      '',
      mockUserForRegister
    );
    const state = registerSlice(initialState, action);
    expect(state.user).toEqual(mockUser.user);
  });
  it('ошибка при обновлении данных о пользователе', () => {
    const action = fetchUpdateUser.rejected(
      { message: 'error', name: '' },
      '',
      mockUserForRegister
    );
    const state = registerSlice(initialState, action);
    expect(state.error).toBe('error');
  });
  it('загрузка запроса регистрации', () => {
    const action = fetchRegister.pending('', mockUserForRegister);
    const state = registerSlice(initialState, action);
    expect(state.error).toBeNull();
  });
  it('успешный запрос на регистрацию', () => {
    const action = fetchRegister.fulfilled(
      mockUser.user,
      '',
      mockUserForRegister
    );
    const state = registerSlice(initialState, action);
    expect(state.user).toEqual(mockUser.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });
  it('ошибка при регистрации', () => {
    const action = fetchRegister.rejected(
      { message: 'error', name: '' },
      '',
      mockUserForRegister
    );
    const state = registerSlice(initialState, action);
    expect(state.error).toBe('error');
  });
  it('загрузка запроса на вход в аккаунт', () => {
    const action = fetchLogin.pending('', {
      email: 'olga@yandex.ru',
      password: '123456'
    });
    const state = registerSlice(initialState, action);
    expect(state.error).toBeNull();
  });
  it('успешный вход в аккаунт', () => {
    const action = fetchLogin.fulfilled(mockUser.user, '', {
      email: 'olga@yandex.ru',
      password: '123456'
    });
    const state = registerSlice(initialState, action);
    expect(state.user).toEqual(mockUser.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });
  it('ошибка при входе в аккаунт', () => {
    const action = fetchLogin.rejected({ message: 'error', name: '' }, '', {
      email: 'olga@yandex.ru',
      password: '123456'
    });
    const state = registerSlice(initialState, action);
    expect(state.error).toBe('error');
  });
  it('проверка selectIsLoading', () => {
    const state = { register: { ...initialState, user: mockUser.user } };
    expect(selectUser(state)).toEqual(mockUser.user);
  });
  it('проверка selectIsAuthChecked', () => {
    const state = { register: { ...initialState, isAuthChecked: true } };
    expect(selectIsAuthChecked(state)).toBe(true);
  });
  it('проверка selectIsAuthenticated', () => {
    const state = { register: { ...initialState, isAuthenticated: true } };
    expect(selectIsAuthenticated(state)).toBe(true);
  });
});
