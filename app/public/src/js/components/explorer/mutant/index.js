import React from 'react';

class Mutant extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.setState({ expanded: false });
    }

    toggle() {
        this.setState({ expanded: !this.state.expanded });
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
