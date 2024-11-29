import ingredientsSlice, {
  initialState,
  fetchIngredients,
  selectisIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  addBun,
  addCurrentIngredients,
  deleteAllIngredients,
  deleteIngredients,
  moveDown,
  moveUp
} from '../ingredientsSlice';
const mockFetchIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

const currentIngredients = [mockFetchIngredients[0], mockFetchIngredients[2]];

describe('проверка работы ingredientsSlice', () => {
  it('проверка правильной работы ingredientsSlice при несуществующем action', () => {
    const action = { type: '' };
    const state = ingredientsSlice(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('загрузка запроса списка заказов', () => {
    const action = fetchIngredients.pending('');
    const state = ingredientsSlice(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('успешный запрос списка заказов', () => {
    const action = fetchIngredients.fulfilled(mockFetchIngredients, '');
    const state = ingredientsSlice(initialState, action);
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toBe(mockFetchIngredients);
  });
  it('ошибка при запросе списка заказов', () => {
    const action = fetchIngredients.rejected(
      { message: 'error', name: '' },
      ''
    );
    const state = ingredientsSlice(initialState, action);
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe('error');
  });
  it('проверка selectisIngredientsLoading', () => {
    const state = {
      ingredients: { ...initialState, selectisIngredientsLoading: true }
    };
    expect(selectisIngredientsLoading(state)).toBe(true);
  });
  it('проверка selectIngredients', () => {
    const state = {
      ingredients: { ...initialState, ingredients: mockFetchIngredients }
    };
    expect(selectIngredients(state)).toEqual(mockFetchIngredients);
  });
  it('проверка selectBuns', () => {
    const state = {
      ingredients: { ...initialState, ingredients: mockFetchIngredients }
    };
    expect(selectBuns(state)).toEqual([mockFetchIngredients[1]]);
  });
  it('проверка selectMains', () => {
    const state = {
      ingredients: { ...initialState, ingredients: mockFetchIngredients }
    };
    expect(selectMains(state)).toEqual([mockFetchIngredients[0]]);
  });
  it('проверка selectSauces', () => {
    const state = {
      ingredients: { ...initialState, ingredients: mockFetchIngredients }
    };
    expect(selectSauces(state)).toEqual([mockFetchIngredients[2]]);
  });
  it('addBun', () => {
    const state = ingredientsSlice(
      initialState,
      addBun(mockFetchIngredients[1])
    );
    expect(state.buns).toEqual(mockFetchIngredients[1]);
  });
  it('проверка addCurrentIngredients', () => {
    const state = ingredientsSlice(
      initialState,
      addCurrentIngredients(mockFetchIngredients[2])
    );
    expect(state.currentIngredients.length).toBe(1);
  });
  it('проверка deleteAllIngredients', () => {
    const state = ingredientsSlice(
      { ...initialState, currentIngredients: currentIngredients },
      deleteAllIngredients()
    );
    expect(state.currentIngredients).toEqual([]);
    expect(state.buns).toBeNull();
  });
  it('проверка deleteIngredients', () => {
    const state = ingredientsSlice(
      { ...initialState, currentIngredients: currentIngredients },
      deleteIngredients(1)
    );
    expect(state.currentIngredients).toEqual([currentIngredients[0]]);
  });
  it('проверка moveDown', () => {
    const state = ingredientsSlice(
      { ...initialState, currentIngredients: currentIngredients },
      moveDown(0)
    );
    expect(state.currentIngredients).toEqual([
      currentIngredients[1],
      currentIngredients[0]
    ]);
  });
  it('проверка moveDown', () => {
    const state = ingredientsSlice(
      { ...initialState, currentIngredients: currentIngredients },
      moveUp(1)
    );
    expect(state.currentIngredients).toEqual([
      currentIngredients[1],
      currentIngredients[0]
    ]);
  });
});
