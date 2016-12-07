import React from 'react';
import FileTree from './fileTree';
import MutationsList from './mutationsList';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='column-layout'>
          <div className='column-1'>
            <FileTree />
          </div>

          <div className='column-3'>
            <MutationsList />
          </div>
        </div>
    );
  }
}

export default Explorer;
