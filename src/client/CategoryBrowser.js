import React, { Component } from 'react';
import './categoryBrowser.css';

export default class CategoryBrowser extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      categories: null
		}
		this.onCreateCategoryKeyUp = this.onCreateCategoryKeyUp.bind( this ); // required for functions to use 'this' from this class, e.g., using this.state, called from render function
  }

  componentDidMount() {
    fetch( '/api/getCategories' )
		.then( response => response.json())
		.then( responseJson => {
			console.log( 'responseJson:' );
			console.log( responseJson );
			this.setState({ categories: responseJson });
		});
	}
	
	getCategoriesJsx( categories ) {
		var categoriesJsx = [];
		for ( var i = 0; i < this.state.categories.length; i++ ) {
			categoriesJsx.push( <div key={i} id={categories[ i ]._id} onMouseUp={this.onCategoryMouseUp} onContextMenu={this.onPreventContextMenu}>{categories[ i ].name}</div> );
		}
		return categoriesJsx;
	}

	onPreventContextMenu( event ) {
		event.preventDefault();
	}

	onCreateCategoryKeyUp( event ) {
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
			})
		}
	}

	onCategoryMouseUp( event ) {
		event.stopPropagation();
		console.log( event.target.id );
	}

  render() {
		console.log( 'this.state:' );
		console.log( this.state );
    return (
      <div className='CategoryBrowser'>
        {this.state.categories ? (
          <div>
						<input className='CreateCategory' type='text' placeholder='new' onKeyUp={this.onCreateCategoryKeyUp}/>
						{ this.getCategoriesJsx( this.state.categories ) }
          </div>
        ) : (
          <h1>Loading CategoryBrowser component.. please wait!</h1>
        )}
      </div>
    );
  }
}
