import React from 'react';

class Start extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div>
                <div onClick={() => this.props.onChooseDirectory('test')}>Start</div>
			</div>
		);
    }
}

export default Start;
