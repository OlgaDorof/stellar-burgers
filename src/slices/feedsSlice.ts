import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/', async () => getFeedsApi());

interface FeedListState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: FeedListState = {
  orders: [],
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
    selectTotalToday: (sliceState) => sliceState.totalToday
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
      });
  }
});

export const { selectOrders, selectIsLoading, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
export const {} = feedsSlice.actions;
export default feedsSlice.reducer;
