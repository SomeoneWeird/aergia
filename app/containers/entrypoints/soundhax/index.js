import os from 'os'
import path from 'path'
import fs from 'fs'

import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import request from 'request'
import requestProgress from 'request-progress'

import config from '../../../config'

import section from '../../cssModules/section.scss'
import content from '../../cssModules/content.scss'

// test code
config.region = 'eur'
config.model = 'n3ds'

const downloadTo = os.tmpdir()

let items = {
  soundhax: {
    url: `https://github.com/nedwill/soundhax/blob/master/soundhax-${config.region.toLowerCase()}-${config.model}.m4a?raw=true`,
    filename: 'soundhax.m4a'
  },
  hbsk: {
    url: 'http://smealum.github.io/ninjhax2/starter.zip',
    filename: 'starter.zip'
  }
}

let SoundHax = React.createClass({
  getInitialState() {
    return {
      downloads: {
        soundhax: 0,
        hbsk: 0,
        otherapp: 0
      }
    }
  },
  componentDidMount() {
    this.startDownload()
  },
  getProgress(dl) {
    return this.state.downloads[dl]
  },
  download(item) {
    console.log('downloading', item)
    requestProgress(request(items[item].url))
      .on('progress', (state) => {
        this.setState({
          ...this.state,
          downloads: {
            ...this.state.downloads,
            [item]: (state.percent * 100).toFixed(2)
          }
        })
      })
      .on('end', (err) => {
        if (err) {
          console.error(err)
        }
        this.setState({
          ...this.state,
          downloads: {
            ...this.state.downloads,
            [item]: 100
          }
        })
      })
      .pipe(fs.createWriteStream(path.resolve(downloadTo, items[item].filename)))
  },
  startDownload() {
    this.download('soundhax')
    this.download('hbsk')
  },
  render() {
    return (
      <section>
        <div className={section.content}>
          soundhax: {this.getProgress('soundhax')}%
          <br/>
          homebrew starter kit: {this.getProgress('hbsk')}%
          <br/>
          otherapp: {this.getProgress('otherapp')}%
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
})

export default SoundHax
