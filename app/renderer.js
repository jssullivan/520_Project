// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(React.createElement('div', {}, 'hello from renderer'), document.getElementById('app'))