import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from 'components/Route';
import routes from 'configs/routes';

export default () => (
  <BrowserRouter>
    <Switch>
      {
        routes.map((route, index) => (
          <Route {...route} key={index} />
        ))
      }
    </Switch>
  </BrowserRouter>
)