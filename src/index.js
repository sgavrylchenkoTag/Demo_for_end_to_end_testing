import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import themes from 'devextreme/ui/themes';

import App from './App';
import store from './store';

import './common_styles/reset.scss';
import './common_styles/fonts.scss';

themes.initialized(() => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
));
