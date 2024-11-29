import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/', getFeedsApi);
export const fetchOrderNumber = createAsyncThunk(
  'orderNumber/',
  async (data: number) => {
    const res = await getOrderByNumberApi(data);
    return res.orders[0];
  }
);
interface FeedListState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
  orderNumber: TOrder | null;
}

const initialState: FeedListState = {
  orders: [],
  orderNumber: null,
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectTotal: (sliceState) => sliceState.total,
    selectTotalToday: (sliceState) => sliceState.totalToday,
    selectOrderNumber: (sliceState) => sliceState.orderNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrderNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      });
  }
});

export const {
  selectOrders,
  selectIsLoading,
  selectTotal,
  selectTotalToday,
  selectOrderNumber
} = feedsSlice.selectors;
export const {} = feedsSlice.actions;
export default feedsSlice.reducer;
