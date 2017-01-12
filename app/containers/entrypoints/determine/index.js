import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import semver from 'semver'

import config from '../../../config'

import section from '../../cssModules/section.scss'
import content from '../../cssModules/content.scss'

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

function getEntrypoints () {
  let validEntrypoints = []
  for (let k in entrypoints[config.model]) {
    if (semver.satisfies(config.version, k)) {
      validEntrypoints = validEntrypoints.concat(entrypoints[config.model][k])
    }
  }
  return validEntrypoints
}

function getEntryLink (name) {
  return <Link to={{ pathname: '/selectsd', query: { returnTo: `/entry/${name}/start` } }}>{name}</Link>
}

function otherEntrypoints () {
  let entrypoints = getEntrypoints()
  let out
  if (entrypoints.length > 1) {
    let points = entrypoints.map(getEntryLink)
    points.shift()
    out = <div>
      You can also use one of the following exploits:
      {points}
    </div>
  } else {
    out = <div></div>
  }
  return out
}

function getContent () {
  let entrypoints = getEntrypoints()
  if (entrypoints.length) {
    return <div>
      We recommend you use {getEntryLink(entrypoints[0])} as your exploit
      {otherEntrypoints()}
    </div>
  } else {
    return <div>
      Unfortuntely it looks like there are no exploits for your system+version at the moment!
    </div>
  }
}

export default class determineEntrypoint extends Component {
  render() {
    return (
      <section>
        <div className={section.content}>
          {getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
