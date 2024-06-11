import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemoEntity } from 'src/api/memoApi';

export const memoSlice = createSlice({
  name: 'memo',
  initialState: {
    data: [] as MemoEntity[],
  },
  reducers: {
    setAllMemoData: (state, action: PayloadAction<MemoEntity[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setAllMemoData } = memoSlice.actions;
export default memoSlice.reducer;
