import React from 'react';

import Header from './shared/header.jsx';
import Main from './main.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}
