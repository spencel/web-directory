import React, { Component } from 'react';
import './contextMenu.css';
import NewCategoryButton from './NewCategoryButton';
import DeleteCategoryButton from './DeleteCategoryButton';

class ContextMenu extends Component {
  constructor( props ) {
		super( props );
		//console.log( props );
    this.state = {
		};
	}

	render() {
		var divStyle = {
			left: this.props.pLeft,
			top: this.props.pTop
		}
		return (
			<div className='ContextMenu' style={divStyle} onMouseLeave={this.props.hide} >
				<NewCategoryButton categoryId={this.props.categoryId} hideContextMenu={this.props.hide} />
				<DeleteCategoryButton func={this.func} categoryId={this.props.categoryId} hideContextMenu={this.props.hide} />
			</div>		
		);
	}
}

export default ContextMenu;