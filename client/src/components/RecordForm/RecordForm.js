import React, { Component } from 'react';
import ReactModal from 'react-modal';
import DataInputs from './DataInputs/DataInputs';

import './RecordForm.css';

class RecordForm extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      recordtype: null
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <input className="addform__button" type="button" value={this.props.name?this.props.name:"Добавить"} onClick={this.handleOpenModal}/>
        <ReactModal 
          className="addform"
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel={this.props.name==="Изменить"?"Edit record":"Add new record"}
        >
          <form onSubmit={this.onRecordSubmit}>
            <p>Тип события</p>
            <p><input className="addrecord__radio" id="Встреча" type="radio" name="type" value="Встреча" onClick={this.changeRecordType.bind(this)}/>Встреча</p>
            <p><input className="addrecord__radio" id="Дело" type="radio" name="type" value="Дело" onClick={this.changeRecordType.bind(this)}/>Дело</p>
            <p><input className="addrecord__radio" id="Памятка" type="radio" name="type" value="Памятка" onClick={this.changeRecordType.bind(this)}/>Памятка</p>
            <DataInputs recordtype={this.state.recordtype}/>
            <input type="submit" value={this.props.name==="Изменить"?"Сохранить изменения":"Создать событие"}/>
            <input className="addform__button" type="button" value="Отмена" onClick={this.handleCloseModal}/>
          </form>

        </ReactModal>
      </div>
    );
  }

  changeRecordType(e) {
    if(e.target.className==="addrecord__radio") {
      this.setState({recordtype: e.target.id});
    }
  }

  onRecordSubmit = async (e) => {
    e.preventDefault();
    if(this.props.name==="Изменить") {
      await fetch('http://localhost:3001/api/'+this.props.record.record_id,{
        method: "PATCH",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
              type:this.state.recordtype,
              start_date: document.getElementById("datainputs__start_date").value,
              end_date: this.state.recordtype!=="Памятка"?document.getElementById("datainputs__end_date").value:null,
              place: this.state.recordtype==="Встреча"?document.getElementById("datainputs__place").value:null,
              theme: document.getElementById("datainputs__theme").value
        })
      })
    }
    else {
      await fetch('http://localhost:3001/api',{
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
              type: this.state.recordtype,
              start_date: document.getElementById("datainputs__start_date").value,
              end_date: (this.state.recordtype!=="Памятка")?document.getElementById("datainputs__end_date").value:null,
              place: (this.state.recordtype==="Встреча")?document.getElementById("datainputs__place").value:null,
              theme: document.getElementById("datainputs__theme").value
      })
    })
  }
    this.props.refreshAll();
    this.handleCloseModal();
  }
}

export default RecordForm;