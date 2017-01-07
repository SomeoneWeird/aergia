import React, { Component } from 'react';

import { Link } from 'react-router';

import config from '../../config'

export default class selectVersion extends Component {
  setVersion (version) {
    return () => {
      config.version = version
      this.props.router.push('/entry/determine')
    }
  }
  render() {
    return (
      <div>
        <h3>Select which version your DS is running</h3>
        <div onClick={this.setVersion('11.2.0')}>11.2.0</div>
      </div>
    )
  }
}
