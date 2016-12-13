import React from 'react';
import Highlight from 'react-highlight';

class Diff extends React.Component {
    constructor(props) {
        super(props);
        this.viewSize = 20;
    }

    highlightMutation(code) {
        let codeLines = code.split('\n');
        let lineNum = parseInt(this.props.lineNum) - 1;
        let line = codeLines[lineNum];
        let mutStart = line.indexOf(this.props.from);
        let mutEnd = mutStart + this.props.from.length;

        let mutation;
        if(this.props.difftype === 'original') {
            mutation = this.props.from;
        } else {
            mutation = this.props.to;
        }

        let wrapped = `<span class="mutant ${this.props.difftype}">${mutation}</span>`;
        let newLine = line.substring(0, mutStart) + wrapped + line.substring(mutEnd);

        codeLines[lineNum] = newLine;
        return this.getShortView(codeLines.join('\n'));
    }

    getShortView(code) {
        let textLines = code.split('\n');
        let line = this.props.lineNum - 1;

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
                <pre className="diff">
                    <code dangerouslySetInnerHTML={{__html: this.highlightMutation(this.props.filetext)}} />
                </pre>
            </div>
		);
    }
}

export default Diff;
