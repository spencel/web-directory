import React, { Component } from 'react';
import './category.css';
import ContextMenu from './ContextMenu';


export default class Category extends Component {
  constructor( props ) {
    super( props );
    this.state = {
			isContextMenuVisible: false
		}
  }
    
	handleOnContextMenu = ( event ) => {
		event.preventDefault();
		var left = event.pageX - 2;
		var top = event.pageY - 2;
		this.setState(() => {
			//console.log( left );
			//console.log( top );
			return { 
				isContextMenuVisible: true,
				left: left,
				top: top
			};
		});
	}

	hideContextMenu = () => {
		console.log( 'hideContextMenu' );
		this.setState(() => {
			return { isContextMenuVisible: false };
		});
	}

  render() {
    return (
      <div className='Category' id={this.props.pId} onContextMenu={this.handleOnContextMenu}>
        {this.props.pName}
        {this.state.isContextMenuVisible ? <ContextMenu categoryId={this.props.pId} pLeft={this.state.left} pTop={this.state.top} hide={this.hideContextMenu} /> : ''}
      </div>
    );
  }

}