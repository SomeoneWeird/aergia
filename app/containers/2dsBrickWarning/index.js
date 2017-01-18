import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const totalSteps = 2
const nextScreen = '/ctrtransfer'

export default class TwoDSBrickWarning extends Component {
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
      You can brick your 2DS if you do a <b>System Format</b> while you're on a downgraded firmware.
      <br />
      <br />
      <br />
      <br />
      <b>Do not, under any circumstances, do a System Format.</b>
      <br />
      <br />
      <br />
      <br />
      <Link className={`${content.button} ${content.buttonKeepText} ${this.state.countdown === 0 ? '' : content.buttonDisabled}`} to={'/ctrtransfer'}>I will never do a system format while downgraded</Link>
      <br />
      <br />
      {this.getCountdown()}
    </div>
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>2DS Brick Warning</h2>
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
