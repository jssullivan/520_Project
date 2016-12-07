import React from 'react';

import MutantOverview from './mutantOverview';
import Mutant from './mutant';

class MutationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div id='mutation-list'>
                <div className='selected-file'>{this.props.selected}</div>
                <MutantOverview
                    count={150}
                    killed={30}
                />

                <ul>
                    {this.props.mutants.map(mutant => <Mutant key={mutant.id} {...mutant} />)}
                </ul>
			</div>
		);
    }
}

MutationsList.propTypes = {
    mutants: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string.isRequired
}

export default MutationsList;
