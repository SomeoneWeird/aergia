import React, { Component } from 'react';

import { ipcRenderer } from 'electron';
import { Link, browserHistory } from 'react-router';
import bytes from 'bytes'

import config from '../../config'

import section from '../cssModules/section.scss'
import content from '../cssModules/content.scss'

// hax for the moment
let folder = require('path').resolve(require('os').tmpdir(), 'aergia')
try {
  require('fs').mkdirSync(folder)
} catch (e) {}

let selectSD = React.createClass({
  getInitialState() {
    return {
      drives: []
    }
  },
  componentDidMount() {
    ipcRenderer.on('driveListReply', (event, drives) => {
      drives = JSON.parse(drives)
      drives = drives.filter(function (drive) {
        return drive.system === false && drive.protected === false && drive.mountpoints.length
      }).map(function (drive) {
        return {
          description: drive.description,
          mountPoint: drive.mountpoints.length ? drive.mountpoints[0].path : 'Not mounted',
          size: bytes(drive.size)
        }
      })
      this.setState({
        drives
      })
    })
    this.processDrives()
  },
  processDrives () {
    ipcRenderer.send('driveList')
  },
  getDrives () {
    return this.state.drives.map(drive => {
      return <div key={drive.mountPoint} onClick={this.setDrive(drive)}>{drive.description} @ {drive.mountPoint} ({drive.size})</div>
    })
  },
  setDrive (drive) {
    return () => {
      config.drive = drive
      this.props.router.push(this.props.location.query.returnTo)
    }
  },
  render() {
    return (
      <section>
        <div className={section.content}>
          {this.getDrives().length > 0 ? (
            <div>
              <h3>Select which SD card you wish to use:</h3>
              {this.getDrives()}
            </div>
          ) : (
            <div>
              Oops, can't detect any valid drives.
            </div>
          )}
          <div onClick={this.processDrives}>Refresh</div>
          <div onClick={this.setDrive({ description: folder, mountPoint: folder })}>use {folder}</div>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
})

export default selectSD
