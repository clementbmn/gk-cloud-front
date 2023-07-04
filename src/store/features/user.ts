import { createSlice, Draft } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  type: string;
}

export interface UserState {
  jwt: string;
  user: User;
}

export const userSlice = createSlice({
  name: 'counter',
  initialState: {} as UserState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setJwt, setUser } = userSlice.actions

export default userSlice.reducer
