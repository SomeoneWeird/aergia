import os from 'os'
import path from 'path'

import React, { Component } from 'react';

import { Link } from 'react-router';
import semver from 'semver'

import config from '../../../config'

// function downloadSoundhax () {
//   let url = `https://github.com/nedwill/soundhax/blob/master/soundhax-${config.region}-${config.model}.m4a`
// }

// function downloadHBSK () {
//   let url = 'http://smealum.github.io/ninjhax2/starter.zip'

// }

// function downloadOtherapp () {
//   // ??????
//   return Promise.resolve()
// }

// function downloadFiles () {
//   Promise.all([
//     downloadSoundhax(),
//     downloadHBSK(),
//     downloadOtherapp()
//   ]).then(function () {

//   })
// }

let SoundHax = React.createClass({
  getInitialState() {
    return {
      progress: 0
    }
  },
  componentDidMount() {
    this.progressInterval = setInterval(() => {
      let progress = this.state.progress + 1
      if (progress > 100) {
        progress = 0
      }
      this.setState({ progress })
    }, 300)
  },
  getProgress() {
    return this.state.progress
  },
  render() {
    return (
      <div>
        progress: {this.state.progress}
      </div>
    )
  }
})

export default SoundHax
