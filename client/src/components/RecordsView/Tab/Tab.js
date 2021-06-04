import React, { Component } from 'react';

import './Tab.css';

class Tab extends Component {

  render() {
    return (
      <div>
        <input className="recordsview__tab" type="button" value={this.props.name} onClick={() => {this.props.changeTab(this.props.name)}}/>
      </div>
    );
  }
}

export default Tab;