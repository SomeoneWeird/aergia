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
  downloadFile (filename, url, dlToDrive = false, done) {
    console.log('downloading to', path.resolve(config.drive.mountPoint, filename))

    let pathTo = path.resolve(os.tmpDir(), filename)

    if (dlToDrive === true) {
      pathTo = path.resolve(config.drive.mountPoint, filename)
    } else if (typeof dlToDrive === 'string') {
      pathTo = path.resolve(config.drive.mountPoint, dlToDrive, filename)
    }

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
      downloading: 'Decrypt9',
      progress: 0
    })
    const url = 'https://github.com/d0k3/Decrypt9WIP/releases/download/20161113/Decrypt9WIP-20161113-135126.zip'
    this.downloadFile('decrypt9.zip', url, false, (err) => {
      if (err) {
        return console.error('Error downloading decrypt9...', err)
      }

      let zip = new admZip(path.resolve(os.tmpDir(), 'decrypt9.zip'))
      zip.extractAllTo(os.tmpDir(), true)
      fsextra.move(path.resolve(os.tmpDir(), 'Decrypt9WIP.bin'), path.resolve(config.drive.mountPoint, 'safehaxpayload.bin'), (err) => {
        if (err) {
          return console.error('Error copying Decrypt9WIP.bin')
        }
        this.downloadSafehax()
      })
    })
  },
  downloadSafehax () {
    this.setState({
      ...this.state,
      downloading: 'Safehax',
      progress: 0
    })
    const url = 'https://github.com/TiniVi/safehax/releases/download/r19/safehax.3dsx'
    this.downloadFile('safehax.3dsx', url, '3ds', (err) => {
      if (err) {
        return console.error('Error downloading safehax...')
      }
      return this.downloadFasthax()
    })
  },
  downloadFasthax () {
    this.setState({
      ...this.state,
      downloading: 'Fasthax',
      progress: 0
    })
    const url = 'https://github.com/nedwill/fasthax/releases/download/v1.0.1/fasthax.3dsx'
    this.downloadFile('fasthax.3dsx', url, '3ds', (err) => {
      if (err) {
        return console.error('Error downloading fasthax...')
      }
      this.setState({
        ...this.state,
        downloading: null,
        progress: 0,
        finished: true
      })
    })
  },
  getContent () {
    if (this.state.downloading === null) {
      return <div>Loading...</div>
    } else if (this.state.finished === true) {
      return <div>
        Finished... click next
      </div>
    } else {
      return <div>
        <ScaleLoader color="#000000" width="20px" height="120px" />
        Downloading {this.state.downloading} ({this.state.progress}%)
      </div>
    }
  },
  next() {
    if (this.state.finished) {
      this.props.router.push('/??')
    } else {
      // do nothing if not finished...
    }
  },
  render() {
    return (
      <section>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
          <div className={content.button} onClick={this.next}>Next</div>
        </div>
      </section>
    )
  }
})

export default Decrypt9