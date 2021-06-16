import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './Filter.css';

class Filter extends Component {
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
        <input className="filter__button" type="button" value="Фильтр" onClick={this.handleOpenModal}/>
        <ReactModal 
          className="filter"
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel={"Фильтр"}
        >
            <p>Тип события</p>
            <p><input className="filter__radio" id="Встреча" type="radio" name="type" value="Встреча" onClick={this.changeRecordType.bind(this)}/>Встреча</p>
            <p><input className="filter__radio" id="Дело" type="radio" name="type" value="Дело" onClick={this.changeRecordType.bind(this)}/>Дело</p>
            <p><input className="filter__radio" id="Памятка" type="radio" name="type" value="Памятка" onClick={this.changeRecordType.bind(this)}/>Памятка</p>
            <p>От</p>
            <p><input type="datetime-local" id="filter__from" name="begindate" /></p>
            <p>До</p>
            <p><input type="datetime-local" id="filter__to" name="enddate" /></p>
            <input className="filter_button" type="button" value="Отфильтровать" onClick={this.filter}/>
            <input className="filter_button" type="button" value="Отмена" onClick={this.handleCloseModal}/>
        </ReactModal>
      </div>
    );
  }

  filter = async () => {
    await fetch('http://localhost:3001/api/filter',{
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({  
              begin: document.getElementById("filter__from").value,
              end: document.getElementById("filter__to").value,
              type: this.state.recordtype
           })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.setRecordsData(data);
      });
      this.handleCloseModal();
    this.props.changeTab("Фильтр");
  }

  changeRecordType(e) {
    if(e.target.className==="filter__radio") {
      this.setState({recordtype: e.target.id});
    }
  }
}

export default Filter;