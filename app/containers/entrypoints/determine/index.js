import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import semver from 'semver'

import config from '../../../config'

import section from '../../cssModules/section.scss'
import content from '../../cssModules/content.scss'

import styles from './index.css'

const entrypoints = {
  n3ds: {
    '>=9.0.0 <=11.2.0': [
      'soundhax'
    ]
  },
  o3ds: {
    '>=9.0.0 <=11.2.0': [
      'soundhax'
    ]
  },
  o2ds: {
    '>=9.0.0 <=11.2.0': [
      'soundhax'
    ]
  }
}

export default class determineEntrypoint extends Component {
  getEntrypoints () {
    let validEntrypoints = []
    for (let k in entrypoints[config.model]) {
      if (semver.satisfies(config.version, k)) {
        validEntrypoints = validEntrypoints.concat(entrypoints[config.model][k])
      }
    }
    return validEntrypoints
  }
  getEntryLinks (entrypoints) {
    return entrypoints.map((name) => {
      return <div key={name} className={styles.entrypointButton}>
        <Link className={`${content.button}`} to={{ pathname: '/selectsd', query: { returnTo: `/entry/${name}/start` } }}>{name}</Link>
      </div>
    })
  }
  getSystemEntrypoints () {
    let entrypoints = this.getEntrypoints()
    if (entrypoints.length) {
      return <div>
        {this.getEntryLinks(entrypoints)}
      </div>
    } else {
      return <div>
        Unfortuntely no system entrypoints are compatible.
        <br /><br />
        Do you have any of the below games?
      </div>
    }
  }
  getGameEntrypoints () {
    return <div>
      TODO
    </div>
  }
  getContent () {
    return <div>
      <h3>System Entrypoints</h3>
      {this.getSystemEntrypoints()}
      <h3>Game Entrypoints</h3>
      {this.getGameEntrypoints()}
    </div>
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Select Exploit</h2>
        <div className={`${section.content} ${styles.center}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
