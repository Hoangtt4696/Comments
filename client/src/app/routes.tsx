import * as React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import { AppProvider } from './context';
import CommentScreen from '../screens/CommentScreen/index2';
import HomeScreen from '../screens/HomeScreen';

const history = createBrowserHistory();

export const routes = (
  <Router history={history}>
    <AppProvider>
      <Route exact={true} path='/' component={HomeScreen} />
      <Route exact={true} path='/topics/:topicId' component={CommentScreen} />
    </AppProvider>
  </Router>
);