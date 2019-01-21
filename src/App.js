import React, { Component } from 'react';
import './App.css';
import IsinList from './IsinList';
const ReactHighstock = require('react-highcharts/ReactHighstock');

class App extends Component {

  constructor(){
    super();

    this.state = {
      insilist: [],
      loading: true,
      currentSelectedParam: 'Price',
      showTrendFlag: false,
    }

    this.selectInsi = this.selectInsi.bind(this);
    this.trendConfig = this.trendConfig.bind(this);
    this.trendSelectParam = this.trendSelectParam.bind(this);
    this.showTrendParams = this.showTrendParams.bind(this);
  }

  componentDidMount() {
    fetch('getisinlist.php')
      .then(response => response.json())
      .then(data => this.setState((state)=>{
        return {
          ...state, ...{insilist: data}
        }
      }));
  }

  selectInsi(id){
    console.log('isin select in APP', id);

    fetch('getisindata.php?isin='+id)
      .then(response => response.json())
      .then(data => this.setState((state)=>{
        return {
          ...state, ...{
            insidataRAW: data,
            insidataPrice: data.map(item=>item.price),
            insidataYield: data.map(item=>item.yield),
            insidataSpread: data.map(item=>item.spread),
            currentISIN: id,
            showTrendFlag: true
          }
        }
      }));
  }

  trendSelectParam(ev){

    let param = ev.target.value || "Price";
    console.log('selected params:', param);
    this.setState((state)=>{
      return {...state, currentSelectedParam: param}
    })
  }

  trendShow(){
    if(this.state.insidataPrice && this.state.insidataPrice.length) return <ReactHighstock config={this.trendConfig()} />
    
    return <div>Нет данных для построения графика</div>
  }

  trendConfig(){
    return {
    
      title: {
          text: 'Облигация ID: '+this.state.currentISIN,
      },

      series: [{
          name: 'Котировка облигации ' + this.state.currentISIN,
          data: this.state['insidata'+this.state.currentSelectedParam].map(item => Number(item)),
          tooltip: {
              valueDecimals: 2
          },
          pointInterval: 7 * 24 * 3600 * 1000,
      }],

      rangeSelector:{

        selected: 3,

        buttons: [{
          type: 'month',
          count: 3,
          text: '3m'
          },{
              type: 'month',
              count: 6,
              text: '6m'
          },{
            type: 'month',
            count: 12,
            text: '12m'
          },{
            type: 'year',
            count: 1,
            text: '1y'
          },{
            type: 'year',
            count: 3,
            text: '3y'
          },{
            type: 'year',
            count: 6,
            text: '6y'
          },{
          type: 'all',
          text: 'All'
          }]
      },

      xAxis:{
        //tickInterval: 24 * 3600 * 1000,
        type:'datetime'
      }
    }
  }

  showTrendParams(){
    return this.state.showTrendFlag ? <select placeholder="Выберите параметр облигации" onChange={this.trendSelectParam}>
              <option value="Price">Price</option>
              <option value="Yield">Yield</option>
              <option value="Spread">Spread</option>
            </select> : '';
  }
  

  render() {
    return (
      <div className="App">
        <h1>Информация об облигациях</h1>

        <h3>Список доступных облигаций</h3>
        <IsinList list={this.state.insilist} insiChange={this.selectInsi}/> 
        { this.trendShow() }
        { this.showTrendParams() }
      </div>
    );
  }
}

export default App;
