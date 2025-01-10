// index.tsx

import './index.css'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store.ts'; // Make sure to import the store
import FetchAPI from './FetchAPI.tsx';

ReactDOM.render(
  <Provider store={store}>
    <FetchAPI />
  </Provider>,
  document.getElementById('root')
);

