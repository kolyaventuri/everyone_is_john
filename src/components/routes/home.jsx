import React from 'react';
import {Link} from 'react-router-dom';

import Rules from './components/rules.jsx';

const Home = () => (
  <div>
    <div>
      <div className="button">
        <Link to="/game/new">Start a Game</Link>
      </div>
      <div className="button">
        <Link to="/game/join">Join a Game</Link>
      </div>
    </div>
    <Rules/>
  </div>
);

export default Home;
