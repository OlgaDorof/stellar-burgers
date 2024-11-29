import feedsSlice, {
  initialState,
  fetchFeeds,
  selectOrders,
  selectIsLoading,
  selectTotal,
  selectTotalToday,
  selectOrderNumber,
  fetchOrderNumber
} from '../feedsSlice';
const mockFetchFeeds = {
  success: true,
  orders: [
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
  ],
  total: 59911,
  totalToday: 2
};

const mockfetchOrderNumber = {
  _id: '67423fdbb27b06001c3ea2b5',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093c'
  ],
  owner: '67423fd0b27b06001c3ea2b2',
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2024-11-23T20:49:31.026Z',
  updatedAt: '2024-11-23T20:49:31.926Z',
  number: 60286,
  __v: 0
};

describe('проверка работы feedsSlice', () => {
  it('проверка правильной работы feedsSlice при несуществующем action', () => {
    const action = { type: '' };
    const state = feedsSlice(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('загрузка запроса списка заказов', () => {
    const action = fetchFeeds.pending('');
    const state = feedsSlice(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('успешный запрос списка заказов', () => {
    const action = fetchFeeds.fulfilled(mockFetchFeeds, '');
    const state = feedsSlice(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.total).toBe(mockFetchFeeds.total);
    expect(state.orders).toBe(mockFetchFeeds.orders);
    expect(state.totalToday).toBe(mockFetchFeeds.totalToday);
  });
  it('ошибка при запросе списка заказов', () => {
    const action = fetchFeeds.rejected({ message: 'error', name: '' }, '');
    const state = feedsSlice(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  it('проверка selectIsLoading', () => {
    const state = { feeds: { ...initialState, isLoading: true } };
    expect(selectIsLoading(state)).toBe(true);
  });
  it('проверка selectTotal', () => {
    const state = { feeds: { ...initialState, total: mockFetchFeeds.total } };
    expect(selectTotal(state)).toBe(mockFetchFeeds.total);
  });
  it('проверка selectTotalToday', () => {
    const state = {
      feeds: { ...initialState, totalToday: mockFetchFeeds.totalToday }
    };
    expect(selectTotalToday(state)).toBe(mockFetchFeeds.totalToday);
  });
  it('проверка selectOrders', () => {
    const state = { feeds: { ...initialState, orders: mockFetchFeeds.orders } };
    expect(selectOrders(state)).toEqual(mockFetchFeeds.orders);
  });
  it('загрузка заказа по номеру', () => {
    const action = fetchOrderNumber.pending('', 1);
    const state = feedsSlice(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('успешный запрос заказа по номеру', () => {
    const action = fetchOrderNumber.fulfilled(mockfetchOrderNumber, '', 60286);
    const state = feedsSlice(initialState, action);
    expect(state.orderNumber).toEqual(mockfetchOrderNumber);
  });
  it('ошибка при запросе заказа по номеру', () => {
    const action = fetchOrderNumber.rejected(
      { message: 'error', name: '' },
      '',
      1
    );
    const state = feedsSlice(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  it('проверка selectOrders', () => {
    const state = {
      feeds: { ...initialState, orderNumber: mockfetchOrderNumber }
    };
    expect(selectOrderNumber(state)).toEqual(mockfetchOrderNumber);
  });
});
