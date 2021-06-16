import React, { Component } from 'react';
import Tab from './Tab/Tab';

import './RecordsView.css';

class RecordsView extends Component {
  constructor () {
    super();
    this.state = {
      tab: "Все",
      searchText: ""
    };
  }
  records;
  recordsData;
  
  render() {


    return (
      <div>
        <div className="recordview-search">
          <input type="text" onChange={this.SearchTextChanged}/>
          <input type="button" onClick={this.changeTab}/>
        </div>
        <div className="recordsview-tabs">
          <Tab name="День" changeTab={this.changeTab}/>
          <Tab name="Неделя" changeTab={this.changeTab}/>
          <Tab name="Месяц" changeTab={this.changeTab}/>
          <Tab name="Список" changeTab={this.changeTab}/>
          <Tab name="Фильтр" changeTab={this.changeTab}/>
        </div>
        <div className="recrdsview-records">

        </div>
      </div>
    );
  }

  SearchTextChanged = (e) => {
    this.setState({searchText: e.target.value});
  }

  changeTab = async (value) => {
    switch(value){
      case "Поиск":
        await fetch('localhost/api/search',{
          method:"POST",
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
        await fetch('localhost/api/filter',{
          method:"POST",
          body: JSON.stringify({
        })
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.recordsData = data;
        });
        break;
      case "День":
        await fetch('localhost/api/day',{
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
        await fetch('localhost/api/week',{
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
        await fetch('localhost/api/month',{
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
        await fetch('localhost',{
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