import { createSlice } from '@reduxjs/toolkit';
import { IUserProfile } from './user.interface';

export interface IUserState {
  user: IUserProfile;
}

const initialState: IUserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
