import React from 'react';

import MutantOverview from './mutantOverview';
import Mutant from './mutant';

class MutationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    getKilledCount() {
        let killed = 0;
        this.props.mutants.forEach((mutant) => {
            if(mutant.killed) ++killed;
        });
        return killed;
    }

    orderMutants(m1,m2) {
        if(m1.killed === m2.killed) return m1.id > m2.id ? 1 : -1;
        if(m1.killed === false) return -1;
        else return 1;
    }

    render() {
        return (
			<div id='mutation-list'>
            {
                (this.props.selected) ?
                <div className='container'>
                    <div>
                        <div className='selected-file'>{this.props.selected}</div>
                        <MutantOverview
                            count={this.props.mutants.length}
                            killed={this.getKilledCount()}
                        />
                    </div>
                    
                    <div className='mutants-container '>
                        <ul>
                            {
                                this.props.mutants
                                .sort(this.orderMutants)
                                .map(mutant => <Mutant filetext={this.props.filetext} key={mutant.id} {...mutant} />)
                            }
                        </ul>
                    </div>
                </div>:
                <div className='select-message'>
                    <span>Select a Class to View its Mutants</span>
                </div>
            }
			</div>
		);
    }
}

MutationsList.propTypes = {
    mutants: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string
};

export default MutationsList;
