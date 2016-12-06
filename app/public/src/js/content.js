'use strict';

import React from 'react';

import {ipcRenderer} from 'electron';

export default class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    ipcRenderer.send('stuff');

    ipcRenderer.on('stuff', (event, data) => {
      this.setState(() => ({
        data: data
      }));
    });
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  }
}