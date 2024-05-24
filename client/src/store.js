import { configureStore } from '@reduxjs/toolkit';
import facilityReducer from './Slice/facilitySlice'
import userReducer from "./Slice/userSlice"

const store = configureStore({
  reducer: {
    facilityData: facilityReducer,
    userData: userReducer,
  },
});

export default store;
