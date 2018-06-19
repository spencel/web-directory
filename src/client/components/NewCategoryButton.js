import React, { Component } from 'react';

export default class NewCategoryButton extends Component {
  constructor( props ) {
    super( props );
    this.state = {
		}
  }

  render() {
    return (
      <div className='NewCategoryButton' onClick={this.handleOnclick}>
        new
      </div>
    );
  }

}