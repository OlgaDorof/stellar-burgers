import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchOrderBurger = createAsyncThunk(
  'orderBurger/',
  async (data: string[]) => orderBurgerApi(data)
);

interface IngredientsState {
  orderRequest: boolean;
  error: string | null | undefined;
  orderModalData: TOrder | null;
}

export const initialState: IngredientsState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    canselOrder(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    orderRequest: (sliceState) => sliceState.orderRequest,
    orderModalData: (sliceState) => sliceState.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { orderRequest, orderModalData } = orderBurgerSlice.selectors;
export const { canselOrder } = orderBurgerSlice.actions;
export default orderBurgerSlice.reducer;
