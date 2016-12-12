import React from 'react';
import {TYPE as FileType} from '../../util/mutation';

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

    isTopLevel(item) {
        return item.tree.split('.').length < 2;
    }

    renderFiles(){
        return this.props.files.filter(this.isTopLevel).map(this.renderFileItem.bind(this));
    }

    renderFileItem(item, i) {
        return (
            <li 
                id={`fileitem-${item.tree}`}
                onClick={(item.type === FileType.CLASS) ? () => this.props.selectFile(item.name):null}
                key={i}
                className={this.props.selected == item.name ? 'active':''}>
                {this.getIcon(item.type)} {item.name}
                <ul>
                    {
                        this.props.files
                            .filter((childItem) => childItem.tree.split('.').length > 1)
                            .filter((function(childItem) {
                                return childItem.tree == this.tree + '.' + childItem.name;
                            }).bind(item))
                            .map((function(childItem, i) {
                                return this.renderFileItem(childItem, i);
                            }).bind(this))
                    }
                </ul>
            </li>
        );
    }

    render() {
        return (
			<div id="file-tree">
                <ul>
                    <li>
                        {this.getIcon('DIR')} {this.prettyDir()}
                        <ul>{this.renderFiles()}</ul>
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
