import orderBurgerSlice, {
  fetchOrderBurger,
  orderRequest,
  orderModalData,
  initialState,
  canselOrder
} from '../orderBurgerSlice';

const mockfetchOrderBurger = {
  success: true,
  name: 'Флюоресцентный люминесцентный бургер',
  order: {
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    _id: '6740cf96b27b06001c3e9d2dt',
    owner: {
      name: 'myp',
      email: 'myp2@myp.ru',
      createdAt: '2024-11-22T18:37:59.549Z',
      updatedAt: '2024-11-22T18:37:59.549Z'
    },
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-22T18:38:14.556Z',
    updatedAt: '2024-11-22T18:38:15.535Z',
    number: 800211,
    price: 1976
  }
};

describe('проверка работы orderBurgerSlice', () => {
  it('проверка правильной работы orderBurgerSlice при несуществующем action', () => {
    const action = { type: '' };
    const state = orderBurgerSlice(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('загрузка запроса при заказе', () => {
    const action = fetchOrderBurger.pending('', ['1', '2']);
    const state = orderBurgerSlice(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });
  it('успешный запрос заказа', () => {
    const action = fetchOrderBurger.fulfilled(mockfetchOrderBurger, '', [
      '1',
      '2'
    ]);
    const state = orderBurgerSlice(initialState, action);
    expect(state.orderModalData).toEqual(mockfetchOrderBurger.order);
  });
  it('ошибка при заказе', () => {
    const action = fetchOrderBurger.rejected(
      { message: 'error', name: '' },
      '',
      ['1', '2']
    );
    const state = orderBurgerSlice(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('error');
  });
  it('проверка orderRequest', () => {
    const state = {
      orderBurger: { ...initialState, orderRequest: true }
    };
    expect(orderRequest(state)).toBe(true);
  });
  it('проверка orderModalData', () => {
    const state = {
      orderBurger: {
        ...initialState,
        orderModalData: mockfetchOrderBurger.order
      }
    };
    expect(orderModalData(state)).toEqual(mockfetchOrderBurger.order);
  });
  it('проверка canselOrder', () => {
    const state = orderBurgerSlice(
      {
        ...initialState,
        orderRequest: true,
        orderModalData: mockfetchOrderBurger.order
      },
      canselOrder()
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});
