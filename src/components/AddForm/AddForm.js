import React, { Component } from 'react';
import ReactModal from 'react-modal';
import DataInputs from './DataInputs/DataInputs';

import './AddForm.css';

class AddForm extends Component {
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
        <button className="addform__button" onClick={this.handleOpenModal}>Add record</button>
        <ReactModal 
          className="addform"
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel="Add new record"
        >
          <form>
            <p>Тип события</p>
            <p><input className="addrecord__radio" id="meeting" type="radio" name="type" value="meeting" onClick={this.changeRecordType.bind(this)}/>Встреча</p>
            <p><input className="addrecord__radio" id="business" type="radio" name="type" value="business" onClick={this.changeRecordType.bind(this)}/>Дело</p>
            <p><input className="addrecord__radio" id="reminder" type="radio" name="type" value="reminder" onClick={this.changeRecordType.bind(this)}/>Памятка</p>
            <DataInputs recordtype={this.state.recordtype}/>
            <input type="submit" value="Создать событие"/>
            <button className="addform__button" onClick={this.handleCloseModal}>Close</button>
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
}

export default AddForm;