import React from 'react';

class MutationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div id="mutation-list">
                {this.props.selected}
			</div>
		);
    }
}

MutationsList.propTypes = {
    selected: React.PropTypes.string.isRequired
}

export default MutationsList;
