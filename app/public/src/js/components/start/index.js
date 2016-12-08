import React from 'react';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openDialog(target) {
        electron.remote.dialog.showOpenDialog({properties: ['openDirectory']}, (filePaths) => {
            if(filePaths) {
                let dir = filePaths[0];
                this.setState({ [target]: dir });
            }
        });
    }

    componentDidMount() {
        setTimeout(() => this.setState({ visible: true }), 0);
    }

    prettyDir(dir) {
        if(!dir) return null;
        let items = dir.split('/');
        return `/${items[items.length - 1]}`;
    }

    render() {
        return (
			<div id="start" className={`container center-align animate fade ${this.state.visible ? 'in':''}`}>
                <div>
                    <h3>Welcome to Cerebro<span className="sub">, the mutation visualization tool.</span></h3>
                </div>
                <div id="dir-chooser" className="container">
                    <ul>
                        <li>
                            <button 
                                className={`${this.state.mutation_dir ? 'primary':'secondary'}`} 
                                onClick={() => this.openDialog('mutation_dir')}>
                                {this.prettyDir(this.state.mutation_dir) || 'Locate Mutation Results'}
                            </button>
                        </li>
                        <li>then...</li>
                        <li>
                            <button 
                                disabled={!this.state.mutation_dir} 
                                className={`${this.state.source_dir ? 'primary':'secondary'}`} 
                                onClick={() => this.openDialog('source_dir')}>
                                {this.prettyDir(this.state.source_dir) || 'Locate Source Directory'}
                            </button>
                            
                        </li>
                        <li>finally...</li>
                        <li>
                            <button 
                                className="secondary"
                                onClick={() => this.props.onChooseDirectory({source: this.state.source_dir, mutation: this.state.mutation_dir})}
                                disabled={!this.state.mutation_dir || !this.state.source_dir}>
                                Visualize
                            </button>
                        </li>
                    </ul>
                </div>
			</div>
		);
    }
}

export default Start;
