import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// eslint-disable-next-line import/no-unassigned-import
import 'jest-enzyme';

Enzyme.configure({adapter: new Adapter()});
