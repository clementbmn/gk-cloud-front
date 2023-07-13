import { createSlice, Draft } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/types';

export interface UserState {
  jwt: string | undefined;
  user: User | undefined;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.jwt = undefined;
      state.user = undefined;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setJwt, setUser, logout } = userSlice.actions

export default userSlice.reducer
