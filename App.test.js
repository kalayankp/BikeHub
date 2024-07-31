// App.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';

describe('App Component', () => {
  it('renders Home Screen and navigates to Details Screen', () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    // Check if Home Screen is rendered
    expect(getByText('Home Screen')).toBeTruthy();

    // Press the button to navigate
    fireEvent.press(getByText('Go to Details'));

    // Check if Details Screen is rendered
    expect(queryByText('Details Screen')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
