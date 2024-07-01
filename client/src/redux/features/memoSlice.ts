import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemoEntity } from 'src/util/memo.type';

export const memoSlice = createSlice({
  name: 'memo',
  initialState: {
    allData: [] as MemoEntity[],
  },
  reducers: {
    setAllMemoData: (state, action: PayloadAction<MemoEntity[]>) => {
      state.allData = action.payload;
    },
  },
});

export const { setAllMemoData } = memoSlice.actions;
export default memoSlice.reducer;
