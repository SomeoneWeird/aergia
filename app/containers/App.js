import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './header'

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div className='row'>
          <Header />
          <div className='appBody col-xs-12'>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
