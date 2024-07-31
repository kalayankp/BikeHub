// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { setSensitiveInfo, getSensitiveInfo } from '../../utils/sensitiveInfo';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;

export const storeToken = (token) => async (dispatch) => {
  await setSensitiveInfo('authToken', token);
  dispatch(setToken(token));
};

export const loadToken = () => async (dispatch) => {
  const token = await getSensitiveInfo('authToken');
  if (token) {
    dispatch(setToken(token));
  }
};

export const storeUser = (user) => async (dispatch) => {
  await setSensitiveInfo('authUser', JSON.stringify(user));
  dispatch(setUser(user));
};

export const loadUser = () => async (dispatch) => {
  const user = await getSensitiveInfo('authUser');
  if (user) {
    dispatch(setUser(JSON.parse(user)));
  }
};

export default authSlice.reducer;
