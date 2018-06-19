import React, { Component } from 'react';
import './categoryBrowser.css';
import ContextMenu from './ContextMenu';

class CategoryBrowser extends Component {
  constructor( props ) {
    super( props );
    this.state = {
			categories: null,
			contextMenuVisible: false
		}
		this.onCreateCategoryKeyUp = this.onCreateCategoryKeyUp.bind( this ); // required for functions to use 'this' from this class, e.g., using this.state, called from render function
		this.onContextMenu = this.onContextMenu.bind( this );
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
			categoriesJsx.push( <div key={i} id={categories[ i ]._id} onMouseUp={this.onCategoryMouseUp} onContextMenu={this.onContextMenu}>{categories[ i ].name}</div> );
		}
		return categoriesJsx;
	}

	onContextMenu( event ) {
		event.preventDefault();
		var left = event.pageX;
		var top = event.pageY;
		console.log( event.target.id );
		console.log( event );
		this.setState(() => {
			console.log( left );
			console.log( top );
			return { 
				contextMenuVisible: true,
				left: left,
				top: top
			};
		});
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
	}

  render() {
		console.log( 'this.state:' );
		console.log( this.state );
    return (
      <div className='CategoryBrowser'>
        {this.state.categories ? (
					<div>
						<input className='CreateCategory' type='text' placeholder='new' onKeyUp={this.onCreateCategoryKeyUp}/>,
						{ this.getCategoriesJsx( this.state.categories ) }
						{this.state.contextMenuVisible === true ? (
							<ContextMenu left={this.state.left} top={this.state.top} />
						) : (
							''
						)}
					</div>
        ) : (
          <h1>Loading CategoryBrowser component.. please wait!</h1>
        )}
      </div>
    );
  }
}

CategoryBrowser.propTypes = {

}

export default CategoryBrowser;