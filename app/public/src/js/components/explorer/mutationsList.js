import React from 'react';
import MutantOverview from './mutantOverview';

class MutationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div id="mutation-list">
                {this.props.selected}
                <MutantOverview 
                    count={150}
                    killed={30}
                />
			</div>
		);
    }
}

MutationsList.propTypes = {
    selected: React.PropTypes.string.isRequired
}

export default MutationsList;
