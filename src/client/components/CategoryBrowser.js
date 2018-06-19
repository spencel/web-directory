import React, { Component } from 'react';
import './categoryBrowser.css';
import Category from './Category';

export default class CategoryBrowser extends Component {
  constructor( props ) {
    super( props );
    this.state = {
			categories: null,
			contextMenuVisible: false
		}
	}

  componentDidMount() {
    fetch( '/api/getCategories' )
		.then( response => response.json())
		.then( responseJson => {
			this.setState({ categories: responseJson });
		});
	}
	
	getCategoriesJsx( categories ) {
		console.log( 'getCategoriesJsx' );
		var categoriesJsx = [];
		for ( var i = 0; i < this.state.categories.length; i++ ) {
      categoriesJsx.push( <Category key={i} pId={categories[ i ]._id} pName={categories[ i ].name} thisCategoryBrowser={this} /> );
		}
		return categoriesJsx;
	}

	handleOnCreateCategoryKeyUp = ( event ) => {
		if ( event.key === 'Enter' ) {
			console.log( event.key );
			console.log( JSON.stringify( event.target.value ));
			var categoryName = event.target.value;
			event.target.value = '';
			fetch( '/api/createCategory', {
				method: 'POST',
				body: JSON.stringify({
					categoryName: categoryName
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
			.then( response => response.json())
			.then( responseJson => {
				console.log( responseJson );
				var createdCategoryDocument = responseJson;
				this.setState(( prevState ) => {
					var categories = prevState.categories;
					categories.push( createdCategoryDocument );
					return { categories: categories };
				});
			});
		}
	}

	onCategoryMouseUp = ( event ) => {
		event.stopPropagation();
	}

	render() {
    return (
      <div className='CategoryBrowser'>
				{this.state.categories ? [
						<input key={0} className='CreateCategory' type='text' placeholder='new' onKeyUp={this.handleOnCreateCategoryKeyUp}/>,
						<div key={1} className='categoryList'>
							{this.getCategoriesJsx( this.state.categories )}
						</div>
				 ] : 
          <h1>Loading CategoryBrowser component.. please wait!</h1>
        }
      </div>
    );
	}
}