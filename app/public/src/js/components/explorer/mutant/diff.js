import React from 'react';
import Highlight from 'react-highlight';

class Diff extends React.Component {
    constructor(props) {
        super(props);
        this.viewSize = 20;
    }

    getShortView() {
        let textLines = this.props.text.split('\n');
        let line = this.props.linenum;
        return textLines.slice(line-this.viewSize/2, line+this.viewSize/2+1).join('\n')
    }

    render() {
        return (
            <div id="diff">
                <div className='diff-title'>{this.props.title}</div>

    		    <Highlight className='java'>
                  {this.getShortView()}
                </Highlight>
            </div>
		);
    }
}

Diff.propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    linenum: React.PropTypes.number.isRequired
};

export default Diff;
