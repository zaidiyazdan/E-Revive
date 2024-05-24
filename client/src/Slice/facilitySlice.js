import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  address: '',
};

const facilitySlice = createSlice({
  name: 'facilityData',
  initialState,
  reducers: {
    setFacilityData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
    },
    clearFacilityData: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.address = '';
    },
  },
});

export const { setFacilityData, clearFacilityData } = facilitySlice.actions;

export const selectFacilityData = (state) => state.facilityData;

export default facilitySlice.reducer;