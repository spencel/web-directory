const categoryBrowser = ( state = [], action ) => {
    switch ( action.type ) {
      case 'ADD_CATEGORY':
        return [
          ...state,
          {
            id: action.id,
            text: action.categoryName,
            completed: false
          }
        ]
      default:
        return state
    }
  }

export default categoryBrowser