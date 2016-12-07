import React from 'react';
import FileTree from './fileTree';
import MutantList from './mutantList';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.fakeItems = [
        { type: 'CLASS', name: 'BinarySearchTree' },
        { type: 'CLASS', name: 'HashMap' },
        { type: 'CLASS', name: 'LinkedList' },
        { type: 'CLASS', name: 'PriorityQueue' }
    ]

    this.fakeMutants = [
        {id: 1, type: 'LVR', fromDef: '0', toDef: 'POS', class: 'triangle.Triangle',
          method: 'classify', lineNum: 20, from: 0, to: 1, status: 'LIVE', killed: false},
        {id: 2, type: 'LVR', fromDef: '0', toDef: 'NEG', class: 'triangle.Triangle',
          method: 'classify', lineNum: 20, from: 0, to: -1, status: 'LIVE', killed: false},
        {id: 3, type: 'ROR', fromDef: '<=(int,int)', toDef: '<(int,int)', class: 'triangle.Triangle',
          method: 'classify', lineNum:20, from: 'a <= 0', to:'a < 0', status:'FAIL', killed: true}
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
        <div id='explorer'>
          <div className='column-layout'>
            <div className='column-1'>
              <FileTree
                selected={this.state.selectedFile}
                files={this.fakeItems}
                directory={this.props.directory}
                selectFile={(name) => this.selectFile(name)} />
            </div>

            <div className='column-3'>
              <MutantList
                selected={this.state.selectedFile}
                mutants={this.fakeMutants}/>
            </div>
          </div>
        </div>
    );
  }
}

Explorer.propTypes = {
  directory: React.PropTypes.string.isRequired
};

export default Explorer;
