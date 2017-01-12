import os from 'os'
import path from 'path'
import fs from 'fs'

import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { ScaleLoader } from 'halogen'

import request from 'request'
import requestProgress from 'request-progress'
import admZip from 'adm-zip'
import fsextra from 'fs-extra'

import config from '../../config'

import section from '../cssModules/section.scss'
import content from '../cssModules/content.scss'

import styles from './index.css'

let Decrypt9 = React.createClass({
  getInitialState() {
    return {
      text: '',
      downloading: null,
      progress: 0,
      finished: false
    }
  },
  componentDidMount() {
    try {
      fs.mkdirSync(path.resolve(config.drive.mountPoint, 'files9'))
    } catch (e) {
      console.log('Error creating files9 dir', e)
    }
    this.downloadDecrypt9WIP()
  },
  downloadFile (filename, url, dlToDrive, done) {
    this.setState({
      ...this.state,
      progress: 0
    })
    console.log('downloading to', path.resolve(config.drive.mountPoint, filename))

    const pathTo = path.resolve(dlToDrive ? config.drive.mountPoint : os.tmpDir(), filename)

    requestProgress(request(url))
      .on('progress', (state) => {
        this.setState({
          ...this.state,
          progress: (state.percent * 100).toFixed(0)
        })
      })
      .on('end', (err) => {
        if (err) {
          return done(err)
        }
        this.setState({
          ...this.state,
          progress: 100
        })
        return done()
      })
      .pipe(fs.createWriteStream(pathTo))
  },
  downloadDecrypt9WIP () {
    this.setState({
      ...this.state,
      downloading: 'Decrypt9'
    })
    const url = 'https://github.com/d0k3/Decrypt9WIP/releases/download/20161113/Decrypt9WIP-20161113-135126.zip'
    this.downloadFile('decrypt9.zip', url, false, (err) => {
      if (err) {
        return console.error('Error downloading decrypt9...', err)
      }

      let zip = new admZip(path.resolve(os.tmpDir(), 'decrypt9.zip'))
      zip.extractAllTo(os.tmpDir(), true)
      fsextra.move(path.resolve(os.tmpDir(), 'Decrypt9WIP.bin'), path.resolve(config.drive.mountPoint, 'safehaxpayload.bin'), function (err) {
        if (err) {
          return console.error('Error copying Decrypt9WIP.bin')
        }
        // next
      })
    })
  },
  getText () {
    if (this.state.downloading === null) {
      return <div>Loading...</div>
    } else if (this.state.finished === true) {
      return <div>Finished...</div>
    } else {
      return <div>Downloading {this.state.downloading} ({this.state.progress}%)</div>
    }
  },
  getContent () {
    return <div>
      <ScaleLoader />
      {this.getText()}
    </div>
  },
  render() {
    return (
      <section>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
})

export default Decrypt9
