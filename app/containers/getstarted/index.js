import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import {
  Step,
  Stepper,
  StepButton
} from 'material-ui/Stepper'

import config from '../../config'

import section from '../cssModules/section.scss'
import content from '../cssModules/content.scss'

import styles from './index.css'

const totalSteps = 4

export default class getStarted extends Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0
    }
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
  }
  goBack () {
    if (this.state.step === 0) {
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
      this.props.router.push(`/entry/${config.entrypoint}/setup`)
    } else {
      this.setState({
        ...this.setState,
        step: this.state.step + 1
      })
    }
  }
  getStepContent () {
    switch (this.state.step) {
      case 0: {
        return <div>
          There are 4 main parts to this guide
          <br />
          <br />
          Here, we'll take you through what we're going to do..
        </div>
      }
      case 1: {
        return <div>
          We're going to download some exploits, set up and files,
          <br />
          <br />
          and then configure your (micro)SD card so it has
          <br />
          <br />
          all the necessary information on it for the next step.
        </div>
      }
      case 2: {
        return <div>
          We're going to downgrade your device from {config.version} to version 2.1
          <br />
          <br />
          This allows us to access a much older exploit we use
          <br />
          <br />
          to grab a unique file out of protected system memory.
        </div>
      }
      case 3: {
        return <div>
          In this step we'll actually install your Custom Firmware,
          <br />
          <br />
          then get you back safely to the latest firmware version
        </div>
      }
      case 4: {
        return <div>
          Here we will ensure that even when you update your system
          <br />
          <br />
          you won't lose access to your new CFW!
          <br />
          <br />
          <RaisedButton label='Start' onClick={this.goForward} />
        </div>
      }
    }
  }
  getContent () {
    return <div>
      <Stepper 
        activeStep={this.state.step}
        linear={false}
      >
        <Step>
          <StepButton onTouchTap={() => this.setState({step: 0})}>
            Get Started
          </StepButton>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({step: 1})}>
            SD Card Setup
          </StepButton>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({step: 1})}>
            Downgrading your device
          </StepButton>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({step: 1})}>
            Installing CFW
          </StepButton>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({step: 1})}>
            Finalising installation
          </StepButton>
        </Step>
      </Stepper>
      <div className={styles.stepContent}>
        {this.getStepContent()}
      </div>
    </div>
  }
  render () {
    return (
      <section>
        <h2 className={section.title}>Let's get started!</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={this.goBack} />
          <RaisedButton label='Next' style={{display: this.state.step === totalSteps ? 'none' : ''}} className={content.buttonNext} onClick={this.goForward} />
        </div>
      </section>
    )
  }
}
