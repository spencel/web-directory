import React, { Component } from 'react';
import './app.css';
import CategoryBrowser from './CategoryBrowser';

export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = { };
  }

  render() {
    return (
      <div className='App'>
        <CategoryBrowser />
      </div>
    );
  }

}