import React from 'react';

class FileTree extends React.Component {
    constructor(props) {
        super(props);
    }

    prettyDir() {
        var items = this.props.directory.split('/');
        return items[items.length - 1];
    }

    getIcon(type) {
        let icon = '';
        switch(type){
            case 'DIR':
                icon = 'folder-o';
                break;
            case 'CLASS':
                icon = 'circle-o';
                break;
            case 'PACKAGE':
                icon = 'circle';
                break;
        }

        return <i className={`fa fa-${icon}`} />;
    }

    render() {
        return (
			<div id="file-tree">
                <ul>
                    <li>
                        {this.getIcon('DIR')} {this.prettyDir()}
                        <ul>
                            {
                                this.props.files.map((item, i) => {
                                    return (
                                        <li 
                                            onClick={() => this.props.selectFile(item.name)}
                                            key={i}
                                            className={this.props.selected == item.name ? 'active':''}>
                                            {this.getIcon(item.type)} {item.name}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </li>
                    
                </ul>
			</div>
		);
    }
}

FileTree.propTypes = {
    directory: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string.isRequired,
    files: React.PropTypes.array.isRequired,
    selectFile: React.PropTypes.func.isRequired
};

export default FileTree;
