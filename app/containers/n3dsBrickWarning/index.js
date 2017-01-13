import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

const totalSteps = 2
const nextScreen = '/ctrtransfer'

export default class New3DSBrickWarning extends Component {
  render() {
    return (
      <section>
        <h2 className={section.title}>New 3DS Brick Warning</h2>
        <div className={section.content}>
          You can brick your New 3DS if you <b>Close the Lid</b> while you're on a downgraded firmware.
          <br/>
          <b>Do not, under any circumstances, Close your devices lid.</b>
          <br/>
          <Link className={content.button} to={'/ctrtransfer'}>I will never close my devices lib while downgraded</Link>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
