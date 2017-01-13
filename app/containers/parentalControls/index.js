import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

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
        return <div className="row middle-xs">
          Do you have Parental Controls enabled?
          <br/>
          <div className={content.button} onClick={this.isEnabled(true)}>Yes</div>
          <div className={content.button} onClick={this.isEnabled(false)}>No</div>
        </div>
      }
      case 2: {
        return <div>
          Please disable Parental Controls before going forward.
          <br/>
          <div className={content.button} onClick={this.goForward}>I have disabled parental controls</div>
        </div>
      }
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Parental Controls</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={this.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
