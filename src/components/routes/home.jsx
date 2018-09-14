import React from 'react';
import {Link} from 'react-router-dom';

import GameManager from '../../lib/game-manager';

import Button from '../shared/button.jsx';
import Rules from './components/rules.jsx';

const Home = () => (
  <div>
    <div>
      <Button onClick={GameManager.create}>
        Start Game
      </Button>
      <Button>
        <Link to="/game/join">Join a Game</Link>
      </Button>
    </div>
    <Rules/>
  </div>
);

export default Home;
