import React, { Component } from 'react';

import { Link } from 'react-router';

import config from '../../config'

export default class selectModel extends Component {
  setModel (model) {
    return () => {
      config.model = model
      this.props.router.push('/config/region')
    }
  }
  render() {
    return (
      <div>
        <h3>Select which 3ds model you have</h3>
        <div onClick={this.setModel('n3ds')}>New 3DS</div>
        <div onClick={this.setModel('o3ds')}>Old 3DS</div>
        <div onClick={this.setModel('o2ds')}>2DS</div>
      </div>
    )
  }
}
