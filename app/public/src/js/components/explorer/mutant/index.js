import React from 'react';
import Diff from './diff';

class Mutant extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.expandedHeight = this.expandedHeight.bind(this)
    }

    componentWillMount() {
        this.setState({ expanded: false, isExpanding: false });

        window.document.addEventListener('contractMutants', () => {
            if (this.state.expanded) {
                this.setState({ expanded: false });
            }

            if (this.state.isExpanding) {
                this.setState({ isExpanding: false });
            }
        }, false);
    }

    toggle() {
        if (!this.state.expanded) {
            this.setState({ isExpanding: true });
            this.contractOthers();
        }

        this.setState({ expanded: !this.state.expanded });
    }

    contractOthers() {
        window.document.dispatchEvent(new Event('contractMutants'));
    }

    expandedHeight() {
        return 18 + this.expandContent.clientHeight;
    }

    getLocation() {
        let className = this.props.class.split('.');
        return `${className[className.length - 1]}:${this.props.lineNum}`;
    }

    render() {
        return (
			<li onClick={this.toggle} className={this.state.expanded && 'expanded'} style={this.state.expanded ? {height: this.expandedHeight()} : null}>
                <div className='title'>
                    <div className={this.props.killed ? 'indicator-killed' : 'indicator-live'}></div>
                    Mutant {this.props.id}: {this.props.type}
                </div>

                <div className='expand-content' ref={elem => this.expandContent = elem} style={!this.state.expanded ? {pointerEvents: 'none'} : null}>
                    <div className='location'>{this.getLocation()}</div>

                    <div className='column-layout diffs'>
                        <div className='' style={{width: '50%'}}>
                            <Diff difftype="original" title='Original' {...this.props} />
                        </div>

                        <div className='' style={{width: '50%'}}>
                            <Diff difftype="mutated" title='Mutated' {...this.props} />
                        </div>
                    </div>
                </div>
			</li>
		);
    }
}

Mutant.propTypes = {
    id: React.PropTypes.string.isRequired
}

export default Mutant;
