import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const totalSteps = 2

export default class checkWifi extends Component {
  constructor () {
    super()
    this.state = {
      step: 1
    }
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
  }
  isEnabled (enabled) {
    return () => {
      // User has Wifi enabled
      if (enabled === true) {
        return this.setState({
          ...this.state,
          step: this.state.step + 1
        }, function () {
          this.goForward()
        })
      }
      this.goForward()
    }
  }
  goBack () {
    if (this.state.step === 1) {
      // go back
      return browserHistory.goBack()
    } else {
      this.setState({
        ...this.state,
        step: this.state.step - 1
      })
    }
  }
  goForward () {
    if (this.state.step === totalSteps) {
      let nextScreen

      if (config.model === 'o2ds') {
        nextScreen = '/2dsbrickwarning'
      } else if (config.model === 'n3ds') {
        nextScreen = '/n3dsbrickwarning'
      } else {
        nextScreen = '/ctrtransfer'
      }

      this.props.router.push(nextScreen)
    } else {
      this.setState({
        ...this.state,
        step: this.state.step + 1
      })
    }
  }
  getContent () {
    switch (this.state.step) {
      case 1: {
        return <div>
          Is your device connected to WiFi?
          <br/>
          <br/>
          <br/>
          <div className={`${content.button} ${styles.button}`} onClick={this.isEnabled(false)}>No</div>
          <div className={`${content.button} ${styles.button}`} onClick={this.isEnabled(true)}>Yes</div>
        </div>
      }
      case 2: {
        return <div>
          You need to connect to WiFi before you start..
          <br/>
          <br/>
          <br/>
          <div className={`${content.button} ${content.buttonKeepText}`} onClick={this.goForward}>I have setup WiFi on my device</div>
        </div>
      }
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>WiFi</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={this.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
