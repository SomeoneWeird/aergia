import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

const totalSteps = 2
const nextScreen = '/ctrtransfer'

export default class TwoDSBrickWarning extends Component {
  render() {
    return (
      <section>
        <h2 className={section.title}>2DS Brick Warning</h2>
        <div className={section.content}>
          You can brick your 2DS if you do a <b>System Format</b> while you're on a downgraded firmware.
          <br/>
          <b>Do not, under any circumstances, do a System Format.</b>
          <br/>
          <Link className={content.button} to={'/ctrtransfer'}>I will never do a system format while downgraded</Link>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
