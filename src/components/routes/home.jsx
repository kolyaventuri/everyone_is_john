import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../shared/button.jsx';
import Rules from './components/rules.jsx';

const Home = () => (
  <div>
    <div>
      <Button onClick={() => {}}>
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
