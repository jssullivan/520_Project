import React from 'react';

import MutantOverview from './mutantOverview';
import Mutant from './mutant';

class MutationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    getKilledCount() {
        let killed = 0;
        this.props.mutants.forEach((mutant) => {
            if(mutant.killed) ++killed;
        });
        return killed;
    }

    render() {
        return (
			<div id="mutation-list">
            {
                (this.props.selected) ?
                <div className="container">
                    <div>
                        <div className="selected-file">{this.props.selected}</div>
                        <MutantOverview
                            count={this.props.mutants.length}
                            killed={this.getKilledCount()}
                        />
                    </div>
                    <div>
                        <ul>
                            {this.props.mutants.map(mutant => <Mutant filetext={this.props.filetext} key={mutant.id} {...mutant} />)}
                        </ul>
                    </div>
                </div>:
                <p>Select a class on the left to view it's mutants</p>
            }
			</div>
		);
    }
}

MutationsList.propTypes = {
    mutants: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string
};

export default MutationsList;
