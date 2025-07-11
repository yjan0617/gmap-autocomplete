import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SearchBox from './components/SearchBox';
import MapDisplay from './components/MapDisplay';

const App = () => (
  <Provider store={store}>
    <div style={{ padding: '40px' }}>
      <SearchBox />
      <MapDisplay />
    </div>
  </Provider>
);

export default App;
