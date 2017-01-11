import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const images = {
  twoDS: require('./images/2ds.png'),
  o3DS: require('./images/old3dsxl.png'),
  n3DS: require('./images/new3dsxl.png')
}

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
          <img onClick={this.setModel('n3ds')} className={styles.device} src={images.n3DS} />
          <div onClick={this.setModel('o3ds')}>Old 3DS</div>
          <img onClick={this.setModel('o3ds')} className={styles.device} src={images.o3DS} />
          <div onClick={this.setModel('o2ds')}>2DS</div>
          <img onClick={this.setModel('o2ds')} className={styles.device} src={images.twoDS} />
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
