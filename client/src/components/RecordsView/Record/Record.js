import React, { Component } from 'react';
import RecordForm from '../../RecordForm/RecordForm';

import './Record.css';

class Record extends Component {
  render() {
    return (
      <div className="record">
        <div className="record__type">{this.props.record.type}</div>
        <div className="record-buttons">
            <input className="record-buttons__button" value="Удалить" type="button" onClick={this.deleteRecord.bind(this)}/>
            <RecordForm name="Изменить" onRecordSubmit={this.editRecord} refreshAll={this.props.refreshAll}/>
            <input className="record-buttons__button" value={this.props.record.completed?"Пометить невыполненым":"Выполнить"} type="button" onClick={this.changeCompletenessRecord.bind(this)}/>
        </div>
      </div>
    );
  }
  deleteRecord = async () => {
    await fetch('http://localhost:3001/api/'+this.props.record.record_id,{
        method: "DELETE",
        headers: { "Accept": "application/json" }
      })
    this.props.refreshAll();
  }

  changeCompletenessRecord = async () => {
    if(this.props.record.completed===true) {
        await fetch('http://localhost:3001/api/uncomplete/'+this.props.record.record_id,{
            method: "PATCH",
            headers: { "Accept": "application/json" }
          }) 
    }
    else {
        await fetch('http://localhost:3001/api/complete/'+this.props.record.record_id,{
            method: "PATCH",
            headers: { "Accept": "application/json" }
        })
    }   
    this.props.refreshAll();
  }
}


export default Record;