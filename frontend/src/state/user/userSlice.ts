import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../utilities/Api.ts';
import { jwtDecode } from 'jwt-decode';
// import jwtDecode from "jwt-decode";
// import Api from "../../utilities/Api.ts";

interface UserState {
  token: string | null;
  user: any | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI,
  ) => {
    try {
      console.log('Thunk loginuser');
      const response = await Api.post('api/token/', { username, password });
      console.log(response);
      const token = response.access;
      localStorage.setItem('token', token);
      document.cookie = `token=${token};path=/;`;
      thunkAPI.dispatch(setToken(token));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log({
      state,
    });
    if (state.user.user) return state.user.user;
    try {
      const response = await Api.get('api/user-details/', true);
      console.log({
        userDetails: response,
      });
      thunkAPI.dispatch(setUserDetails(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearToken, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
