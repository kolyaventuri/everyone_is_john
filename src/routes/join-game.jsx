import React from 'react';

import TextBox from '../components/text-box.jsx';
import Button from '../components/shared/button.jsx';

import GameManager from '../lib/game-manager';

const JoinGame = () => (
  <div>
    <TextBox/>
    <Button onClick={GameManager.joinGame}>Join Game</Button>
  </div>
);

export default JoinGame;
