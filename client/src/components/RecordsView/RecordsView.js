import React, { Component } from 'react';
import Tab from './Tab/Tab';

import './RecordsView.css';

class RecordsView extends Component {
  constructor () {
    super();
    this.state = {
      tab: "Все"
    };
  }

  render() {
    return (
      <div>
        <div className="recordsview-tabs">
          <Tab name="День" changeTab={this.changeTab}/>
          <Tab name="Неделя" changeTab={this.changeTab}/>
          <Tab name="Месяц" changeTab={this.changeTab}/>
          <Tab name="Все" changeTab={this.changeTab}/>
        </div>
        <div className="recrdsview-records">

        </div>
      </div>
    );
  }

  changeTab = (value) => {
    this.setState({tab: value});
  }
}

export default RecordsView;