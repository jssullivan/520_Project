import React from 'react';
import FileTree from './fileTree';
import MutationsList from './mutationsList';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.fakeItems = [
        { type: 'CLASS', name: 'BinarySearchTree' },
        { type: 'CLASS', name: 'HashMap' },
        { type: 'CLASS', name: 'LinkedList' },
        { type: 'CLASS', name: 'PriorityQueue' }
    ]

    this.state = {
      selectedFile: this.fakeItems[0].name
    }
  }

  selectFile(name) {
    this.setState({ selectedFile: name });
  }

  render() {
    return (
        <div id="explorer">
          <div className='column-layout'>
            <div className='column-1'>
              <FileTree 
                selected={this.state.selectedFile} 
                files={this.fakeItems}
                directory={this.props.directory} 
                selectFile={(name) => this.selectFile(name)} />
            </div>

            <div className='column-3'>
              <MutationsList 
                selected={this.state.selectedFile} />
            </div>
          </div>
        </div>
    );
  }
}

Explorer.propTypes = {
  directory: React.PropTypes.string.isRequired,
  // mutationresults: React.PropTypes.array.isRequired
};

export default Explorer;
