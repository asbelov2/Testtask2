import React, { Component } from 'react';

import './DataInputs.css';

class DataInputs extends Component {

  render() {
    let enddate;
    let place;
    if(this.props.recordtype==="reminder"){
      enddate = <div><p>Дата и время окончания</p><p><input type="datetime-local" name="enddate" required/></p></div>;
    }
    else{
      enddate = <div></div>;
    }
    if(this.props.recordtype==="meeting"){
      place = <div><p>Место</p><p><input type="text" name="place" required/></p></div>;
    }
    else{
      place = <div></div>;
    }
    return (
      <div>
        <p>Дата и время начала</p>
        <p><input type="datetime-local" name="begindate" required/></p>
        {enddate}
        {place}
        <p>Тема</p>
        <p><input type="text" name="theme" required/></p>

      </div>
    );
  }
}

export default DataInputs;