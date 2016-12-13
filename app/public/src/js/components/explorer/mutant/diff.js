import React from 'react';
import Highlight from 'react-highlight';

class Diff extends React.Component {
    constructor(props) {
        super(props);
        this.viewSize = 20;
    }

    getShortView() {
        let textLines = this.props.text.split('\n');
        let line = this.props.linenum - 1;

        const findFirstLine = () => {
            let firstLine = line;
            for(let i = line; i >= 0; --i) {
                let currLine = textLines[i].replace(/\s+/, '');
                if(currLine.length < 1) return i;
            }
            return 0;
        }
        const findLastLine = () => {
            let lastLine = line;
            for(let i = line; i < textLines.length; ++i) {
                let currLine = textLines[i].replace(/\s+/, '');
                if(currLine.length < 1) return i;
            }
            return textLines.length - 1;
        }

        let first = findFirstLine(line);
        let last = findLastLine(line);

        return textLines.slice(first, last + 1).join('\n');
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
