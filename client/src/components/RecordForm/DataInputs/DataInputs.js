import React, { Component } from 'react';

import './DataInputs.css';

class DataInputs extends Component {

  render() {
    let enddate;
    let place;
    if(this.props.recordtype!=="Памятка"){
      enddate = <div><p>Дата и время окончания</p><p><input type="datetime-local" id="datainputs__end_date" name="enddate" required/></p></div>;
    }
    else{
      enddate = <div></div>;
    }
    if(this.props.recordtype==="Встреча"){
      place = <div><p>Место</p><p><input type="text" name="place" id="datainputs__place" required/></p></div>;
    }
    else{
      place = <div></div>;
    }
    return (
      <div>
        <p>Дата и время начала</p>
        <p><input type="datetime-local" id="datainputs__start_date" name="begindate" required/></p>
        {enddate}
        {place}
        <p>Тема</p>
        <p><input type="text" name="theme" id="datainputs__theme" required/></p>

      </div>
    );
  }
}

export default DataInputs;