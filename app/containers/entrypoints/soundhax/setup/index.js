import path from 'path'
import fs from 'fs'

import { ipcRenderer } from 'electron'
import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import request from 'request'
import requestProgress from 'request-progress'
import StreamZip from 'node-stream-zip'
import fsextra from 'fs-extra'
import async from 'async'

import config from '../../../../config'

import section from '../../../cssModules/section.scss'
import content from '../../../cssModules/content.scss'

import styles from './index.css'

let SoundHax = React.createClass({
  getInitialState () {
    return {
      text: '',
      downloading: null,
      progress: 0,
      finished: false
    }
  },
  componentDidMount () {
    this.downloadSoundhax()
  },
  downloadFile (filename, url, done) {
    this.setState({
      ...this.state,
      progress: 0
    })
    console.log('downloading to', path.resolve(config.drive.mountPoint, filename))
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
      .pipe(fs.createWriteStream(path.resolve(config.drive.mountPoint, filename)))
  },
  downloadSoundhax () {
    this.setState({
      ...this.state,
      downloading: 'Soundhax'
    }, () => {
      const url = `https://github.com/nedwill/soundhax/blob/master/soundhax-${config.region.toLowerCase()}-${config.model}.m4a?raw=true`
      this.downloadFile('soundhax.m4a', url, (err) => {
        if (err) {
          return console.error('Error downloading soundhax...', err)
        }
        this.downloadOtherapp()
      })
    })
  },
  downloadOtherapp () {
    this.setState({
      ...this.state,
      downloading: 'otherapp.bin'
    }, () => {
      ipcRenderer.send('otherappURL', JSON.stringify(config))
    })
    ipcRenderer.on('otherappURLReply', (event, url) => {
      this.downloadFile('otherapp.bin', url, (err) => {
        if (err) {
          return console.error('Error downloading otherapp.bin...', err)
        }
        this.downloadHBSK()
      })
    })
  },
  downloadHBSK () {
    const zipPath = path.resolve(config.drive.mountPoint, 'starter.zip')

    const download = () => {
      this.downloadFile(zipPath, 'http://smealum.github.io/ninjhax2/starter.zip', (err) => {
        if (err) {
          return console.error('Error downloading starter.zip...', err)
        }
        return extract()
      })
    }

    const extract = () => {
      let zip = new StreamZip({
        file: zipPath,
        storeEntries: true
      })

      zip.on('error', console.error)

      zip.on('ready', () => {
        zip.extract(null, config.drive.mountPoint, (err) => {
          if (err) {
            return console.error(err)
          }
          return extracted()
        })
      })
    }

    const extracted = () => {
      let files = []
      fsextra.walk(path.resolve(config.drive.mountPoint, 'starter'))
        .on('data', function (file) {
          files.push(file.path)
        })
        .on('end', () => {
          async.each(files, function (file, done) {
            fsextra.move(file, file.replace('starter/', ''), { mkdirp: true }, function (err) {
              if (err && err.code === 'EEXIST') {
                // ignore
              } else if (err) {
                return done(err)
              }
              done()
            })
          }, (err) => {
            if (err) {
              return console.error(err)
            }

            // remove previous zip + dir
            fsextra.remove(zipPath)
            fsextra.remove(path.resolve(config.drive.mountPoint, 'starter'))

            this.setState({
              ...this.state,
              finished: true
            })
          })
        })
    }

    this.setState({
      ...this.state,
      downloading: 'Homebrew Starter Kit'
    }, function () {
      download()
    })
  },
  getContent () {
    if (this.state.downloading === null) {
      return <div>Loading...</div>
    } else if (this.state.finished === true) {
      return <div className={content.largeTick}>✓</div>
    } else {
      return <div className={styles.center}>
        <CircularProgress size={80} thickness={5} />
        <br />
        <br />
        <br />
        Downloading {this.state.downloading} ({this.state.progress}%)
      </div>
    }
  },
  next () {
    if (this.state.finished) {
      this.props.router.push('/decrypt9/setup')
    } else {
      // do nothing if not finished...
    }
  },
  render () {
    return (
      <section>
        <h2 className={section.title}>Soundhax Setup</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
          <RaisedButton label='Next' className={content.buttonNext} onClick={this.next} />
        </div>
      </section>
    )
  }
})

export default SoundHax
