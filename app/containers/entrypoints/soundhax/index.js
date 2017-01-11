import os from 'os'
import path from 'path'
import fs from 'fs'

import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import request from 'request'
import requestProgress from 'request-progress'
import streamProgress from 'progress-stream'
import admZip from 'adm-zip'
import fsextra from 'fs-extra'
import async from 'async'

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
    filename: 'starter.zip',
    extract: true,
    extractFolderRoot: 'starter'
  }
}

let SoundHax = React.createClass({
  getInitialState() {
    return {
      downloads: {
        soundhax: 0,
        hbsk: 0,
        otherapp: 0
      },
      copy: {
        soundhax: 0,
        hbsk: 0,
        otherapp: 0
      }
    }
  },
  componentDidMount() {
    this.startDownload()
  },
  getDownloadProgress(dl) {
    return this.state.downloads[dl]
  },
  getCopyProgress(dl) {
    return this.state.copy[dl]
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
        this.handleComplete(item)
      })
      .pipe(fs.createWriteStream(path.resolve(downloadTo, items[item].filename)))
  },
  handleComplete(item) {
    let itemConfig = items[item]

    if (itemConfig.extract) {
      let zip = new admZip(path.resolve(downloadTo, itemConfig.filename))
      // TODO: check none of these files already exist before overwrite?
      zip.extractAllTo(config.drive.mountPoint, true)

      if (itemConfig.extractFolderRoot) {
        let files = []
        fsextra.walk(path.resolve(config.drive.mountPoint, itemConfig.extractFolderRoot))
          .on('data', function (file) {
            files.push(file.path)
          })
          .on('end', function () {
            async.each(files, function (file, done) {
              fsextra.move(file, file.replace(itemConfig.extractFolderRoot + '/', ''), { mkdirp: true }, function (err) {
                if (err && err.code === 'EEXIST') {
                  // ignore
                } else if (err) {
                  return done(err)
                }
                done()
              })
            }, function (err) {
              if (err) {
                return console.error(err)
              }
              // remove previous dir
              fsextra.remove(path.resolve(config.drive.mountPoint, itemConfig.extractFolderRoot))
              fin()
            })
          })
      } else {
        fin()
      }

      const fin = () => {
        this.setState({
          ...this.state,
          copy: {
            ...this.state.copy,
            [item]: 100
          }
        })
      }
    } else {
      let stat = fs.statSync(path.resolve(downloadTo, itemConfig.filename))
      let p = streamProgress({
        length: stat.size
      })

      p.on('progress', (progress) => {
        this.setState({
          ...this.state,
          copy: {
            ...this.state.copy,
            [item]: 100
          }
        })
      })

      // TODO: error handling
      fs.createReadStream(path.resolve(downloadTo, itemConfig.filename))
        .pipe(p)
        .pipe(fs.createWriteStream(path.resolve(config.drive.mountPoint, itemConfig.filename)))
    }
  },
  startDownload() {
    this.download('soundhax')
    this.download('hbsk')
    ipcRenderer.on('otherappURLReply', (event, url) => {
      items.otherapp = {
        url,
        filename: 'otherapp.bin'
      }
      this.download('otherapp')
    })
    ipcRenderer.send('otherappURL', JSON.stringify(config))
  },
  render() {
    return (
      <section>
        <div className={section.content}>
          soundhax download: {this.getDownloadProgress('soundhax')}%
          <br/>
          soundhax copy: {this.getCopyProgress('soundhax')}%
          <br/>
          homebrew starter kit download: {this.getDownloadProgress('hbsk')}%
          <br/>
          homebrew starter kit copy: {this.getCopyProgress('hbsk')}%
          <br/>
          otherapp download: {this.getDownloadProgress('otherapp')}%
          <br/>
          otherapp copy: {this.getCopyProgress('otherapp')}%
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
})

export default SoundHax
