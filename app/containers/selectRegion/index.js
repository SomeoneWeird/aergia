import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const flags = {
  usa: require('./images/usa.png'),
  eur: require('./images/eur.jpg'),
  jpn: require('./images/jpn.png'),
  kor: require('./images/kor.png')
}

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
          <img className={styles.flag} onClick={this.setRegion('USA')} src={flags.usa} />
          <img className={styles.flag} onClick={this.setRegion('EUR')} src={flags.eur} />
          <img className={styles.flag} onClick={this.setRegion('JPN')} src={flags.jpn} />
          <img className={styles.flag} onClick={this.setRegion('KOR')} src={flags.kor} />
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
