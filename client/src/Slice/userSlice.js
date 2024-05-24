import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: '',
  email: '',
  address: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.user_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
    },
    clearUserData: (state) => {
      state.id = null;
      state.username = '';
      state.email = '';
      state.address = '';
      state.phone = '';
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUserData = (state) => state.userData;

export default userSlice.reducer;
