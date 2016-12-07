// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
// const {dialog} = require('electron').remote
const electron = require('electron');

// attach some electron things to our window object for use in React components
window.electron = electron;

ReactDOM.render(React.createElement(window.AppView), document.getElementById('app'));
