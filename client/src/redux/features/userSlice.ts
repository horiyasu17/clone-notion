import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from 'src/api/AuthApi';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {} as UserEntity,
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserEntity>) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
