import React from 'react';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openDialog() {
        electron.remote.dialog.showOpenDialog({properties: ['openDirectory']}, (filePaths) => {
            let dir = filePaths[0];
            this.setState({ dir });
        });
    }

    render() {
        return (
			<div className="container center-align">
                <div>
                    <h3>Welcome to Cerebro<span className="sub">, the mutation visualization tool.</span></h3>
                </div>
                <div id="dir-chooser" className="container">
                    <p>Choose the directory with your mutation analysis:</p>
                    <div>
                        <button onClick={() => this.openDialog()}>Open</button>
                    </div>
                </div>
                <div style={{marginTop: '30px'}}>
                    <button 
                        onClick={() => this.props.onChooseDirectory(this.state.dir)}
                        disabled={!this.state.dir}>
                        Visualize
                    </button>
                </div>
			</div>
		);
    }
}

export default Start;
