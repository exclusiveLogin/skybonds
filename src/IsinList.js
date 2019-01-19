import React, { Component } from 'react';
import './App.css';

class IsinList extends Component {

  constructor( props ){
    super( props );

    this.selectInsi = this.selectInsi.bind(this);
    this.getList = this.getList.bind(this);

  }


  selectInsi(e){
      this.props.insiChange(e);
    }


  getList(){
    debugger;
      return this.props.list && this.props.list.length ? 
          this.props.list.map(item => <button className="isinButton" value={item.id} key={item.id} onClick={()=>this.selectInsi(item.id)}>INSI_{item.id}</button>):
          <span>Список пуст</span>;
    }

  render() {

    return (
      <div className="isinList">
        <div className="isinContainer">{this.getList()}</div>
      </div>
      
    );
  }
}

export default IsinList;
