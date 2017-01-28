import os from 'os'
import path from 'path'
import fs from 'fs'

import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { ScaleLoader } from 'halogen'

import request from 'request'
import requestProgress from 'request-progress'
import StreamZip from 'node-stream-zip'
import fsextra from 'fs-extra'
import async from 'async'

import config from '../../../config'

import section from '../../cssModules/section.scss'
import content from '../../cssModules/content.scss'

import styles from './index.css'

let SoundHax = React.createClass({
  getInitialState() {
    return {}
  },
  componentDidMount() {

  },
  getContent () {
    return <div>
      Launch CTR Transfer...
    </div>
  },
  next() {
    if (this.state.finished) {
      this.props.router.push('/404')
    } else {
      // do nothing if not finished...
    }
  },
  render() {
    return (
      <section>
        <h2 className={section.title}>CTRTransfer Launch</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
          <div className={`${content.button} ${content.buttonNext} ${this.state.finished ? '' : content.buttonDisabled}`} onClick={this.next}>Next</div>
        </div>
      </section>
    )
  }
})

export default SoundHax
