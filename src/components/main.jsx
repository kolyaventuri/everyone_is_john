import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './routes/home.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </main>
);

export default Main;
