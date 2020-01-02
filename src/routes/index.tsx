import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LandingPage, Dashboard, NotFound } from '../pages';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
