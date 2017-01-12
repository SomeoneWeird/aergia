import React, { Component } from 'react';
import Sidebar from './sidebar';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div className="row">
        <Sidebar />
        <div className="appBody col-xs-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}
