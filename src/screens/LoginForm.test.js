// LoginForm.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginForm from '../components/LoginForm'; // Adjust the path based on your file structure
import { login } from '../redux/authSlice';

const mockStore = configureStore([thunk]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/authSlice', () => ({
  login: jest.fn().mockReturnValue({ type: 'login' }),
}));

describe('LoginForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('validates email and password fields', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');

    fireEvent.press(getByText('Login'));

    expect(await findByText('Invalid email')).toBeTruthy();
    expect(await findByText('Password must be at least 6 characters')).toBeTruthy();
  });

  it('dispatches login action with valid email and password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const email = 'test@example.com';
    const password = 'Password123';

    fireEvent.changeText(getByPlaceholderText('Email'), email);
    fireEvent.changeText(getByPlaceholderText('Password'), password);

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(email, 'dummy-token');
    });
  });

  it('shows ActivityIndicator when submitting', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password123');

    fireEvent.press(getByText('Login'));

    expect(queryByTestId('activity-indicator')).toBeTruthy();
  });
});
