import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/',
  getIngredientsApi
);

interface IngredientsState {
  isIngredientsLoading: boolean;
  error: string | null | undefined;
  ingredients: TIngredient[];
  buns: TIngredient | null;
  currentIngredients: TIngredient[];
}

export const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: true,
  error: null,
  buns: null,
  currentIngredients: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.buns = action.payload;
    },
    addCurrentIngredients: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      }),
      reducer: (state, action: PayloadAction<TIngredient & { id: string }>) => {
        state.currentIngredients.push(action.payload);
      }
    },
    deleteAllIngredients(state) {
      state.currentIngredients = [];
      state.buns = null;
    },
    deleteIngredients(state, action: PayloadAction<number>) {
      state.currentIngredients.splice(action.payload, 1);
    },
    moveDown(state, action: PayloadAction<number>) {
      const current = state.currentIngredients[action.payload];
      state.currentIngredients[action.payload] =
        state.currentIngredients[action.payload + 1];
      state.currentIngredients[action.payload + 1] = current;
    },
    moveUp(state, action: PayloadAction<number>) {
      const current = state.currentIngredients[action.payload];
      state.currentIngredients[action.payload] =
        state.currentIngredients[action.payload - 1];
      state.currentIngredients[action.payload - 1] = current;
    }
  },
  selectors: {
    selectisIngredientsLoading: (sliceState) => sliceState.isIngredientsLoading,
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectBuns: createSelector(
      (sliceState: IngredientsState) => sliceState.ingredients,
      (ingredients): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'bun')
    ),
    selectMains: createSelector(
      (sliceState: IngredientsState) => sliceState.ingredients,
      (ingredients): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'main')
    ),
    selectSauces: createSelector(
      (sliceState: IngredientsState) => sliceState.ingredients,
      (ingredients): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'sauce')
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  selectisIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;
export const {
  addBun,
  addCurrentIngredients,
  deleteIngredients,
  moveDown,
  moveUp,
  deleteAllIngredients
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
