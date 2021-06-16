import React, { Component } from 'react';
import Tab from './Tab/Tab';
import Filter from './Filter/Filter';
import Record from './Record/Record';
import {RecordForm} from '../';
import './RecordsView.css';

class RecordsView extends Component {
  constructor () {
    super();
    this.state = {
      tab: "Список",
      searchText: ""
    };
  }
  records;  
  recordsData;
  
  render() {
    console.log(this.recordsData);
    if(this.recordsData && Array.isArray(this.recordsData)) {
    this.records = this.recordsData.map((record) => {
      return <Record record={record} id={record.record_id} key={record.record_id} refreshAll={() => this.forceUpdate()} />
    });
  }
  else {
    this.records = <div></div>;
  }
    return (
      <div>
        <div className="recordview-search">
          <input type="text" onChange={this.SearchTextChanged}/>
          <input type="button" value="Поиск" onClick={() => this.changeTab("Поиск")}/>
        </div>
        <div className="recordsview-tabs">
          <Tab name="День" changeTab={this.changeTab}/>
          <Tab name="Неделя" changeTab={this.changeTab}/>
          <Tab name="Месяц" changeTab={this.changeTab}/>
          <Tab name="Список" changeTab={this.changeTab}/>
          <Filter setRecordsData={this.setRecordsData.bind(this)} changeTab={this.changeTab}/>
        </div>
        <RecordForm refreshAll={() => this.forceUpdate()}/>
        <div className="recrdsview-records">
          {this.records}
        </div>
      </div>
    );
  }

  SearchTextChanged = (e) => {
    this.setState({searchText: e.target.value});
  }

  setRecordsData = (data) => {
    this.recordsData = data;
  }

  changeTab = async (value) => {
    switch(value){
      case "Поиск":
        await fetch('http://localhost:3001/api/search',{
          method:"POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            searchText: this.state.searchText
        })
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      case "Фильтр":
        break;
      case "День":
        await fetch('http://localhost:3001/api/day',{
          method:"GET",
          headers: { "Accept": "application/json" }
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      case "Неделя":
        await fetch('http://localhost:3001/api/week',{
          method:"GET",
          headers: { "Accept": "application/json" }
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      case "Месяц":
        await fetch('http://localhost:3001/api/month',{
          method:"GET",
          headers: { "Accept": "application/json" }
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      case "Список":
        await fetch('http://localhost:3001/api',{
          method:"GET",
          headers: { "Accept": "application/json" }
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      default:
        this.recordsData={};
        break;
    }
    this.setState({tab: value});
  }
}

export default RecordsView;