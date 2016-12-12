import React from 'react';
import FileTree from './fileTree';
import MutantList from './mutantList';
import {parseDictionary} from '../../util/mutation';

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

    this.state = {}

    this.items = parseDictionary(this.props.mutationdictionary);
  }

  selectFile(name) {
    this.setState({ selectedFile: name });
  }

  getSelectedFileText() {
    let selectedFile = this.state.selectedFile;
    if(!selectedFile) return null;

    var levels = selectedFile.split('.')
    var classObj = this.props.mutationdictionary;
    for(let level in levels) {
      classObj = classObj[levels[level]]
    }
    return classObj.text;
  }

  render() {
    return (
        <div id='explorer'>
          <div className='column-layout'>
            <div className='column-1' style={{ height: '100vh' }}>
              <FileTree
                selected={this.state.selectedFile}
                files={this.items}
                directory={this.props.directory}
                selectFile={(name) => this.selectFile(name)} />
            </div>

            <div className='column-3' style={{ height: '100vh' }}>
              <MutantList
                selected={this.state.selectedFile}
                filetext={this.getSelectedFileText()}
                mutants={this.props.mutationresults.filter((function(mutant){
                  return mutant.class === this.state.selectedFile;
                }).bind(this))}/>
            </div>
          </div>
        </div>
    );
  }
}

Explorer.propTypes = {
  directory: React.PropTypes.string.isRequired,
  mutationresults: React.PropTypes.array.isRequired,
  mutationdictionary: React.PropTypes.object.isRequired
};

export default Explorer;
