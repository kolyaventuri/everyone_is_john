import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../routes/home.jsx';

import JoinGame from '../routes/join-game.jsx';
import Game from '../routes/game.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/game/join" component={JoinGame}/>
      <Route path="/game/:game" component={Game}/>
    </Switch>
  </main>
);

export default Main;
