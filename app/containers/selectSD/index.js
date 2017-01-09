import React, { Component } from 'react';

import { Link } from 'react-router';
import bytes from 'bytes'

import Drives from 'drivelist'

import config from '../../config'

let selectSD = React.createClass({
  getInitialState() {
    return {
      drives: []
    }
  },
  componentDidMount() {
    this.processDrives()
  },
  processDrives () {
    Drives.list(function (err, drives) {
      if (err) {
        console.error(err)
        return
      }
      drives = drives.filter(function (drive) {
        return drive.system === false && drive.protected === false && drive.mountPoints.length
      }).map(function (drive) {
        return {
          description: drive.description,
          mountPoint: drive.mountPoints[0].path,
          size: bytes(drive.size)
        }
      })
      this.setState({
        drives
      })
    })
  },
  getDrives () {
    return this.state.drives.map(drive => {
      return <div onClick={this.setDrive(drive)}>{drive.description} @ {drive.mountPoint} ({drive.size})</div>
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
      <div>
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
        <div onClick={this.setDrive('hax')}>bypass screen</div>
      </div>
    )
  }
})

export default selectSD
