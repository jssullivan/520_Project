import React from 'react';

class Mutant extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.setState({ expanded: false, isExpanding: false });

        window.document.addEventListener('contractMutants', () => {
            this.setState({ expanded: false });
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

    render() {
        return (
			<li onClick={this.toggle} className={this.state.expanded && 'expanded'}>
                <div className='title'>
                    <div className={this.props.killed ? 'indicator-killed' : 'indicator-live'}></div>
                    Mutant {this.props.id}
                </div>
			</li>
		);
    }
}

Mutant.propTypes = {
    id: React.PropTypes.number.isRequired
}

export default Mutant;
