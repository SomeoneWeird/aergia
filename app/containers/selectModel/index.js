import React, { Component } from 'react';

import { Link } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

export default class selectModel extends Component {
  setModel (model) {
    return () => {
      config.model = model
      this.props.router.push('/config/region')
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Model Selection</h2>
        <div className={section.content}>
          <div onClick={this.setModel('n3ds')}>New 3DS</div>
          <div onClick={this.setModel('o3ds')}>Old 3DS</div>
          <div onClick={this.setModel('o2ds')}>2DS</div>
        </div>
        <div className={section.navigation}>
          <Link className={content.button} to="/config/home">Back</Link>
        </div>
      </section>
    )
  }
}
