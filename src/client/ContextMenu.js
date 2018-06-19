import React, { Component } from 'react';
import './contextMenu.css';
import PropTypes from 'prop-types';

class ContextMenu extends Component {
  constructor( props ) {
    super( props );
    this.state = {
			//visible: this.props.visible
		};
	}

	render() {
		console.log( this.props );
		var divStyle = {
			left: this.props.left,
			top: this.props.top
		}
		return (
			//this.state.visible === true ?
				<div className='ContextMenu' style={divStyle}>
					<div>Remove</div>
					<div>Relocate</div>
				</div>
				//:
				//''			
		);
	}
}

export default ContextMenu;