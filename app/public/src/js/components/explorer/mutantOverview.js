import React from 'react';

class MutationOverview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
      <div id="mutation-overview" className="column-layout">
        <div className='column-1' style={{textAlign: 'left'}}>
            {this.props.count} Mutants
        </div>
        <div className='column-1' style={{textAlign: 'right'}}>
            <span className="metric">
                <i className="fa fa-heartbeat live" />
                {this.props.count - this.props.killed} Live
            </span>/
            <span className="metric">
                <i className="fa fa-heart-o killed" />
                {this.props.killed} Killed
            </span>
        </div>
      </div>
    );
    }
}

MutationOverview.propTypes = {
    count: React.PropTypes.number.isRequired,
    killed: React.PropTypes.number.isRequired
};

export default MutationOverview;
