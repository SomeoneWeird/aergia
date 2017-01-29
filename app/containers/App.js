import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header';

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
        <MuiThemeProvider>
          <Header />
        </MuiThemeProvider>
          <div className="appBody col-xs-11">
            {this.props.children}
          </div>
      </div>
    );
  }
}
