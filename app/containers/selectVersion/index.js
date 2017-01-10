import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

export default class selectVersion extends Component {
  setVersion (version) {
    return () => {
      config.version = version
      this.props.router.push('/entry/determine')
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Select which version your DS is running</h2>
        <div className={section.content}>
          <div onClick={this.setVersion('11.2.0')}>11.2.0</div>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
