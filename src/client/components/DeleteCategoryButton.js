import React, { Component } from 'react';
import Category from './Category';


export default class NewCategoryButton extends Component {
  constructor( props ) {
    super( props );
    this.state = {
    };
    console.log( props );
  }

  handleOnclick = () => {
    console.log( 'handleOnClick' );
    console.log( this.props );
    this.props.hideContextMenu();
    fetch( '/api/deleteCategory', {
      method: 'POST',
      body: JSON.stringify({
        categoryId: this.props.categoryId
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( response => response.json())
    .then( responseJson => {
      console.log( responseJson );
    });
  }

  render() {
    return (
      <div className='NewCategoryButton' onClick={this.handleOnclick} >
        delete
      </div>
    );
  }

}