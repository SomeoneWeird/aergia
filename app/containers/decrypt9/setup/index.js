import os from 'os'
import path from 'path'
import fs from 'fs'

import React from 'react'
import { browserHistory } from 'react-router'
import { ScaleLoader } from 'halogen'
import RaisedButton from 'material-ui/RaisedButton'

import request from 'request'
import requestProgress from 'request-progress'
import StreamZip from 'node-stream-zip'
import fsextra from 'fs-extra'

import config from '../../../config'

import section from '../../cssModules/section.scss'
import content from '../../cssModules/content.scss'

import styles from './index.css'

let Decrypt9 = React.createClass({
  getInitialState () {
    return {
      text: '',
      downloading: null,
      progress: 0,
      finished: false
    }
  },
  componentDidMount () {
    try {
      fs.mkdirSync(path.resolve(config.drive.mountPoint, 'files9'))
    } catch (e) {
      console.log('Error creating files9 dir', e)
    }
    this.downloadDecrypt9WIP()
  },
  downloadFile (filename, url, dlToDrive = false, done) {
    console.log('downloading to', path.resolve(config.drive.mountPoint, filename))

    let pathTo = path.resolve(os.tmpdir(), filename)

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
    const url = 'https://github.com/d0k3/Decrypt9WIP/releases/download/20170115/Decrypt9WIP-20170115-230509.zip'
    this.downloadFile('decrypt9.zip', url, false, (err) => {
      if (err) {
        return console.error('Error downloading decrypt9...', err)
      }

      let zip = new StreamZip({
        file: path.resolve(os.tmpdir(), 'decrypt9.zip'),
        storeEntries: true
      })

      zip.on('error', console.error)

      const fileName = 'Decrypt9WIP.bin'

      zip.on('ready', () => {
        zip.extract(fileName, os.tmpdir(), (err) => {
          if (err) {
            return console.error(err)
          }
          fsextra.move(path.resolve(os.tmpdir(), fileName), path.resolve(config.drive.mountPoint, 'safehaxpayload.bin'), (err) => {
            if (err) {
              return console.error(err)
            }
            this.downloadSafehax()
          })
        })
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
        finished: true
      })
    })
  },
  getContent () {
    if (this.state.downloading === null) {
      return <div>Loading...</div>
    } else if (this.state.finished === true) {
      return <div className={content.largeTick}>✓</div>
    } else {
      return <div>
        <ScaleLoader color='#000000' width='20px' height='120px' />
        <br />
        <br />
        <br />
        Downloading {this.state.downloading} ({this.state.progress}%)
      </div>
    }
  },
  next () {
    if (this.state.finished) {
      this.props.router.push('/ctrtransfer/setup')
    } else {
      // do nothing if not finished...
    }
  },
  render () {
    return (
      <section>
        <h2 className={section.title}>Decrypt9 Setup</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
          <RaisedButton label='Next' disabled={!this.state.finished} className={content.buttonNext} onClick={this.next} />
        </div>
      </section>
    )
  }
})

export default Decrypt9
