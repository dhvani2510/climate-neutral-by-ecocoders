// setupTests.js
const { JSDOM } = require('jsdom');

const jsdomConfig = {
  url: 'http://localhost',
};

const jsdom = new JSDOM('<!doctype html><html><body><div id="dynamic-divs"></div></body></html>', jsdomConfig);
global.document = jsdom.window.document;
global.window = jsdom.window;
global.navigator = jsdom.window.navigator;
