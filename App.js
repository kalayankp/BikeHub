import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { BikeProvider } from './src/Context/BikeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <BikeProvider>
        <AppNavigator />
      </BikeProvider>
    </Provider>
  );
};

export default App;
