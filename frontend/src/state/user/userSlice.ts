import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../utilities/Api.ts";
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
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI,
  ) => {
    try {
      console.log("Thunk loginuser");
      Api.post("api/token/", { username, password }).then((result) => {
        console.log(result);
      });
      // const api = new Api(import.meta.env.VITE_BASE_URL);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
/*
  async (
  ) => {
    try {
      const api = new Api(import.meta.env.VITE_BASE_URL);
      const response = await api.post("api/token/", { username, password });
      return response.data; // Ensure you return the response data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
*/

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
