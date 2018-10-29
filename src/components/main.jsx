import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../routes/home.jsx';

import JoinGame from '../routes/join-game.jsx';
import GameWindow from '../routes/game-window.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/game/join" component={JoinGame}/>
      <Route path="/game/:gameId" component={GameWindow}/>
    </Switch>
  </main>
);

export default Main;
