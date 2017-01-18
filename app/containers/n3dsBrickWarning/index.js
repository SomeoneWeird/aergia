import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const totalSteps = 2
const nextScreen = '/ctrtransfer'

export default class New3DSBrickWarning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countdown: 10
    }
    const next = () => {
      if (this.state.countdown === 0) {
        return
      }
      this.timer = setTimeout(() => {
        this.setState({
          ...this.state,
          countdown: this.state.countdown - 1
        }, next)
      }, 1000)
    }
    next()
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  getCountdown () {
    if (this.state.countdown) {
      return <b>{this.state.countdown}</b>
    }
  }
  getContent () {
    return <div>
      You can brick your New 3DS if you <b>Close the Lid</b> while you're on a downgraded firmware.
      <br />
      <br />
      <br />
      <br />
      <b>Do not, under any circumstances, Close your devices lid.</b>
      <br />
      <br />
      <br />
      <br />
      <Link className={`${content.button} ${content.buttonKeepText} ${this.state.countdown === 0 ? '' : content.buttonDisabled}`} to={'/ctrtransfer'}>I will never close my devices lid while downgraded</Link>
      <br />
      <br />
      {this.getCountdown()}
    </div>
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>New 3DS Brick Warning</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
