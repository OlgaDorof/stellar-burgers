import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/',
  getOrdersApi
);

interface ProfileOrdersState {
  ordersProfile: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: ProfileOrdersState = {
  ordersProfile: [],
  isLoading: true,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersProfile: (sliceState) => sliceState.ordersProfile,
    selectIsLoadingProfile: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersProfile = action.payload;
      });
  }
});

export const { selectOrdersProfile, selectIsLoadingProfile } =
  profileOrdersSlice.selectors;
export const {} = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
