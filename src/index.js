import {render} from 'react-dom';

// eslint-disable-next-line no-unused-vars
const MainApp = () => (
  <h1>Hello React!</h1>
);

render(<MainApp />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
