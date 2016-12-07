import React from 'react';

class Diff extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='diff-title'>{this.props.title}</div>

    		    <div className='diff'>
                    Diff View
                </div>
            </div>
		);
    }
}

Diff.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Diff;
