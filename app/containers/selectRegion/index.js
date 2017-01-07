import React, { Component } from 'react';

import { Link } from 'react-router';

import config from '../../config'

export default class selectRegion extends Component {
  setRegion (region) {
    return () => {
      config.region = region
      this.props.router.push('/config/version')
    }
  }
  render() {
    return (
      <div>
        <h3>Select which region your DS is</h3>
        <div onClick={this.setRegion('USA')}>USA</div>
        <div onClick={this.setRegion('EUR')}>EUR</div>
        <div onClick={this.setRegion('JPN')}>JPN</div>
        <div onClick={this.setRegion('KOR')}>KOR</div>
      </div>
    )
  }
}
