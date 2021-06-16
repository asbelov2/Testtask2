import React, { Component } from 'react';
import RecordForm from '../RecordForm/RecordForm';
import RecordsView from '../RecordsView/RecordsView';

import './Container.css';

class Container extends Component {
  render() {
    return (
      <div className="container" id="container">
        <RecordsView/>
        <RecordForm/>
      </div>
    );
  }
}

export default Container;