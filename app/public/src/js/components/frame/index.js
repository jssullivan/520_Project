import React from 'react';
import FileTree from './fileTree';
import MutationsList from './mutationsList';

class Frame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FileTree />
        <MutationsList />
      </div>
    );
  }
}

export default Frame;
