import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import config from '../../config'

import section from '../cssModules/section.scss'

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

      if (config.model === '2ds') {
        nextScreen = '/2dsbrickwarning'
      } else if (config.model === 'n3ds') {
        nextScreen = '/n3dsbrickwarning'
      } else {
        nextScreen = `/entry/${config.entrypoint}/launch`
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
          <br />
          <br />
          <br />
          <RaisedButton className={styles.button} label='No' onClick={this.isEnabled(false)} />
          <RaisedButton className={styles.button} label='Yes' onClick={this.isEnabled(true)} />
        </div>
      }
      case 2: {
        return <div>
          You need to connect to WiFi before you start..
          <br />
          <br />
          <br />
          <RaisedButton label='I have setup WiFi on my device' onClick={this.goForward} />
        </div>
      }
    }
  }
  render () {
    return (
      <section>
        <h2 className={section.title}>WiFi</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={this.goBack} />
        </div>
      </section>
    )
  }
}
