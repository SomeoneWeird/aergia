import React, { Component } from 'react';

import { Link } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

export default class selectRegion extends Component {
  setRegion (region) {
    return () => {
      config.region = region
      this.props.router.push('/config/version')
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Select which region your DS is</h2>
        <div className={section.content}>
          <div onClick={this.setRegion('USA')}>USA</div>
          <div onClick={this.setRegion('EUR')}>EUR</div>
          <div onClick={this.setRegion('JPN')}>JPN</div>
          <div onClick={this.setRegion('KOR')}>KOR</div>
        </div>
        <div className={section.navigation}>
          <Link className={content.button} to="/config/home">Back</Link>
        </div>
      </section>
    )
  }
}
