import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';


const flags = {
  usa: require('./images/usa.jpg'),
  eur: require('./images/eur.jpg'),
  jpn: require('./images/jpn.jpg'),
  kor: require('./images/kor.jpg')
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
        <div className="row">
          <div className={section.flagItem + " col-xs-6"}>
            <img onClick={this.setRegion('USA')} src={flags.usa} />
          </div>
          <div className={section.flagItem + " col-xs-6"}>
            <img onClick={this.setRegion('EUR')} src={flags.eur} />
          </div>
          <div className={section.flagItem + " col-xs-6"}>
            <img onClick={this.setRegion('JPN')} src={flags.jpn} />
          </div>
          <div className={section.flagItem + " col-xs-6"}>
            <img onClick={this.setRegion('KOR')} src={flags.kor} />
          </div>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
