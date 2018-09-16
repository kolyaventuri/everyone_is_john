import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../routes/home.jsx';

import JoinGame from '../routes/join-game.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/game/join" component={JoinGame}/>
    </Switch>
  </main>
);

export default Main;
