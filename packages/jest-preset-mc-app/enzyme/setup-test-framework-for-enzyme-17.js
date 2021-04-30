require('./base-setup-test-framework-for-enzyme');
const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });
