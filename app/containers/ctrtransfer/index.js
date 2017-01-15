import os from 'os'
import path from 'path'
import fs from 'fs'

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { ScaleLoader } from 'halogen'

import Webtorrent from 'webtorrent'
import StreamZip from 'node-stream-zip'

import config from '../../config'

import section from '../cssModules/section.scss'
import content from '../cssModules/content.scss'

import styles from './index.css'

const magnetLinks = {
  eur: 'magnet:?xt=urn:btih:89acc9c1b488b8b38251de0ddf07975d6bd354a1&dn=2.1.0-4E%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce',
  jpn: 'magnet:?xt=urn:btih:3dbb9c9c85a33c6242f424dcbaebcacdd8a5912b&dn=2.1.0-4J%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce',
  usa: 'magnet:?xt=urn:btih:1609ce9ee7b0ed9b6dea0b3e7cca4fc52dad6ff4&dn=2.1.0-4U%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce'
}

const zipName = '2.1.0-4U_ctrtransfer_o3ds.zip'

const torrentClient = new Webtorrent()

let CTRTransfer = React.createClass({
  getInitialState() {
    return {
      extracting: false,
      downloading: null,
      progress: 0,
      finished: false
    }
  },
  componentDidMount() {
    this.setState({
      ...this.state,
      downloading: `CTR Transfer File (${config.region})`
    }, () => {
      this.downloadCTRfile()
    })
  },
  downloadCTRfile() {
    const magnetLink = magnetLinks[config.region] || magnetLinks.usa
    torrentClient.add(magnetLink, {
      path: os.tmpDir()
    }, (torrent) => {
      const progressInterval = setInterval(() => {
        this.setState({
          ...this.state,
          progress: (torrent.progress * 100).toFixed(0)
        })
      }, 500)

      torrent.on('done', () => {
        clearInterval(progressInterval)
        this.setState({
          ...this.state,
          extracting: true
        }, () => {
          let zip = new StreamZip({
            file: path.resolve(os.tmpDir(), zipName),
            storeEntries: true
          })

          zip.on('error', console.error)

          zip.on('ready', () => {
            zip.extract(null, path.resolve(config.drive.mountPoint, 'files9'), (err) => {
              if (err) {
                return console.error(err)
              }
              this.setState({
                ...this.state,
                finished: true
              })
            })
          })
        })
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
    } else if (this.state.extracting === true) {
      return <div>
        <ScaleLoader color="#000000" width="20px" height="120px" />
        Extracting files...
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
      this.props.router.push('/arm9loaderhax')
    } else {
      // do nothing if not finished...
    }
  },
  render() {
    return (
      <section>
        <h2 className={section.title}>CTR Transfer Setup</h2>
        <div className={section.content}>
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

export default CTRTransfer
