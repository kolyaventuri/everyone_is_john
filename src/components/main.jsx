import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './routes/home.jsx';

import NewGame from './routes/new-game.jsx';
import JoinGame from './routes/join-game.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/game/new" component={NewGame}/>
      <Route exact path="/game/join" component={JoinGame}/>
    </Switch>
  </main>
);

export default Main;
