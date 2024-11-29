import profileOrdersSlice, {
  selectOrdersProfile,
  selectIsLoadingProfile,
  fetchProfileOrders,
  initialState
} from '../profileOrdersSlice';

const mockfetchProfileOrders = [
  {
    _id: '67423055b27b06001c3ea27e',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0949',
      '643d69a5c3f7b9001cfa0948',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный экзо-плантаго астероидный альфа-сахаридный бургер',
    createdAt: '2024-11-23T19:43:17.883Z',
    updatedAt: '2024-11-23T19:43:18.801Z',
    number: 60285
  },
  {
    _id: '67422ee0b27b06001c3ea279',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2024-11-23T19:37:04.379Z',
    updatedAt: '2024-11-23T19:37:05.320Z',
    number: 60284
  }
];

describe('проверка работы profileOrdersSlice', () => {
  it('проверка правильной работы profileOrdersSlice при несуществующем action', () => {
    const action = { type: '' };
    const state = profileOrdersSlice(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('загрузка запроса заказов пользователя', () => {
    const action = fetchProfileOrders.pending('');
    const state = profileOrdersSlice(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('успешный запрос заказов пользователя', () => {
    const action = fetchProfileOrders.fulfilled(mockfetchProfileOrders, '');
    const state = profileOrdersSlice(initialState, action);
    expect(state.ordersProfile).toEqual(mockfetchProfileOrders);
  });
  it('ошибка при запросе заказов пользователя', () => {
    const action = fetchProfileOrders.rejected(
      { message: 'error', name: '' },
      ''
    );
    const state = profileOrdersSlice(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  it('проверка selectOrdersProfile', () => {
    const state = {
      profileOrders: { ...initialState, ordersProfile: mockfetchProfileOrders }
    };
    expect(selectOrdersProfile(state)).toEqual(mockfetchProfileOrders);
  });
  it('проверка selectIsLoadingProfile', () => {
    const state = { profileOrders: { ...initialState, isLoading: true } };
    expect(selectIsLoadingProfile(state)).toBe(true);
  });
});
