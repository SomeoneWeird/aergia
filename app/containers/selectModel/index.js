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

class Device extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <section>
        <div onClick={this.props.clickHandler}>{this.props.name}</div>
        <img onClick={this.props.clickHandler} className={styles.device} src={this.props.image} />
      </section>
    )
  }
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
          <Device clickHandler={this.setModel('n3ds')} name='New 3DS' image={images.n3DS} />
          <Device clickHandler={this.setModel('o3ds')} name='Old 3DS' image={images.o3DS} />
          <Device clickHandler={this.setModel('o2ds')} name='2DS' image={images.twoDS} />
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
