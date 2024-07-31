import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy Data
const initialState = {
  data: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  list: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 4, name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Alice Johnson', email: 'alice.johnson@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 7, name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 8, name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://via.placeholder.com/50' },
    { id: 9, name: 'Alice Johnson', email: 'alice.johnson@example.com', avatar: 'https://via.placeholder.com/50' },

  ],
};

// Thunks for asynchronous operations
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => initialState.data);

export const fetchUsersList = createAsyncThunk('user/fetchUsersList', async () => initialState.list);

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId) => userId);

export const editUser = createAsyncThunk('user/editUser', async ({ userId, data }) => {
    // Simulate an API call to update user details
    return { ...data, id: userId };
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user.id !== action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
