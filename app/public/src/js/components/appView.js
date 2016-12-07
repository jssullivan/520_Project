import React from 'react';

import Explorer from './explorer';
import Start from './start';

class AppView extends React.Component {
  constructor(props) {
    super(props);

    this.directoryChosen = this.directoryChosen.bind(this);
  }

  componentWillMount() {
    this.setState({ mutantsDirectory: null });
  }

  directoryChosen(dir) {
    this.setState({ mutantsDirectory: dir });
  }

  render() {
    return (
      <div className='view'>
        <div className='window-chrome'></div>

        {this.state.mutantsDirectory == null && <Start onChooseDirectory={this.directoryChosen} />}
        {this.state.mutantsDirectory != null && <Explorer directory={this.state.mutantsDirectory} />}
      </div>
    );
  }
}

export default AppView;
