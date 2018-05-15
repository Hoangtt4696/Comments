import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import * as RoutesModule from './routes';

let routes = RoutesModule.routes;

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter children={routes} />
    </AppContainer>,
    document.getElementById('react-app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require<typeof RoutesModule>('./routes').routes;
    renderApp();
  });
}