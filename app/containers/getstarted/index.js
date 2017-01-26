import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config'

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

import styles from './index.css'

const totalSteps = 5

export default class getStarted extends Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 1
    }
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
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
      this.props.router.push(`/entry/${config.entrypoint}/start`)
    } else {
      this.setState({
        ...this.setState,
        step: this.state.step + 1
      })
    }
  }
  getContent () {
    switch (this.state.step) {
      case 1: {
        return <div>
          <p>There are 4 main parts to this guide</p>
          <br />
          <br />
          <div className={styles.steps}>
            <b>(1)</b> SD Card Setup <br />
            <br />
            <b>(2)</b> Downgrading your device <br />
            <br />
            <b>(3)</b> Installing CFW <br />
            <br />
            <b>(4)</b> Finalising installation
          </div>
        </div>
      }
      case 2: {
        return <div>
          <h3>Step 1) SD Card Setup</h3>
          <br />
          <br />
          We're going to download some exploits, set up and files,
          <br />
          <br />
          and then configure your (micro)SD card so it has
          <br />
          <br />
          all the necessary information on it for the next step.
        </div>
      }
      case 3: {
        return <div>
          <h3>Step 2) Downgrading your device</h3>
          <br />
          <br />
          We're going to downgrade your device from {config.version} to version 2.1
          <br />
          <br />
          This allows us to access a much older exploit we use
          <br />
          <br />
          to grab a unique file out of protected system memory.
        </div>
      }
      case 4: {
        return <div>
          <h3>Step 3) Installing CFW</h3>
          <br />
          <br />
          In this step we'll actually install your Custom Firmware,
          <br />
          <br />
          then get you back safely to the latest firmware version
        </div>
      }
      case 5: {
        return <div>
          <h3>Step 4) Finalising installation</h3>
          <br />
          <br />
          Here we will ensure that even when you update your system
          <br />
          <br />
          you won't lose access to your new CFW!
          <br />
          <br />
          <div className={content.button} onClick={this.goForward}>Start</div>
        </div>
      }
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Let's get started!</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={this.goBack}>Back</div>
          <Link style={{display: this.state.step === totalSteps ? 'none' : ''}} className={`${content.button} ${content.buttonNext}`} onClick={this.goForward}>Next</Link>
        </div>
      </section>
    );
  }
}
