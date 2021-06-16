import React, { Component } from 'react';
import RecordsView from '../RecordsView/RecordsView';

import './Container.css';

class Container extends Component {
  render() {
    return (
      <div className="container" id="container">
        <RecordsView/>
      </div>
    );
  }
}

export default Container;