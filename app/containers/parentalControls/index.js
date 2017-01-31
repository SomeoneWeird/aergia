import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import section from '../cssModules/section.scss'

import styles from './index.css'

const totalSteps = 2
const nextScreen = '/checkWifi'

export default class parentalControls extends Component {
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
      // User has parental controls disabled
      if (!enabled) {
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
          Do you have Parental Controls enabled?
          <br />
          <br />
          <br />
          <RaisedButton className={styles.button} label='No' onClick={this.isEnabled(false)} />
          <RaisedButton className={styles.button} label='Yes' onClick={this.isEnabled(true)} />
        </div>
      }
      case 2: {
        return <div>
          Please disable Parental Controls before going forward.
          <br />
          <br />
          <br />
          <RaisedButton label='I have disabled parental controls' onClick={this.goForward} />
        </div>
      }
    }
  }
  render () {
    return (
      <section>
        <h2 className={section.title}>Parental Controls</h2>
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
