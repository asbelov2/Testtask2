import React, { Component } from 'react';
import AddForm from '../AddForm/AddForm';
import RecordsView from '../RecordsView/RecordsView';

import './Container.css';

class Container extends Component {
  render() {
    return (
      <div className="container" id="container">
        <RecordsView/>
        <AddForm/>
      </div>
    );
  }
}

export default Container;