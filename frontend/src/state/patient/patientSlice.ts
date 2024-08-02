import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../utilities/Api.ts';

interface PatientState {
  patients: [];
}

const initialState: PatientState = {
  patients: [],
};

export const fetchPatients = createAsyncThunk(
  'patient/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await Api.get('api/fetch-patients/', true);
      thunkAPI.dispatch(setPatients(response));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<string>) => {
      state.patients = action.payload;
    },
  },
});

export const { setPatients } = patientSlice.actions;
export default patientSlice.reducer;
