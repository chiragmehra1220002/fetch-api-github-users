import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  login: string;
  id: number;
  avatar_url: string;
}

interface GitUserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const getAllData = createAsyncThunk<User[], void, { rejectValue: string }>(
  'gitUser/getAllData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.github.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: User[] = await response.json();
      return result;
    } catch (error: any) {
      console.error("ERROR", error);
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

const initialState: GitUserState = {
  users: [],
  loading: false,
  error: null,
};

export const gitUser = createSlice({
  name: "gitUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null; 
      })
      .addCase(getAllData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred while fetching users';
      });
  }
});

export default gitUser.reducer; 
