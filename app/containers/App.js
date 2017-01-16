import React, { Component } from 'react';
import Sidebar from './sidebar';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <Sidebar location={this.props.location} />
        <div className="appBody col-xs-11">
          {this.props.children}
        </div>
      </div>
    );
  }
}
