import React, { Component } from 'react';

import { Link } from 'react-router';
import semver from 'semver'

import config from '../../../config'

const entrypoints = {
  n3ds: {
    '<=11.2.0': [
      'soundhax'
    ]
  },
  o3ds: {
    '<=11.2.0': [
      'soundhax'
    ]
  },
  o2ds: {
    '<=11.2.0': [
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

function otherEntrypoints () {
  let entrypoints = getEntrypoints()
  let out
  if (entrypoints.length > 1) {
    let points = entrypoints.map(name => {
      return <Link to={'/entry/' + name }>{name}</Link>
    })
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

export default class determineEntrypoint extends Component {
  render() {
    return (
      <div>
        {getEntrypoints().length > 0 ? (
          <div>
            We recommend you use <Link to={'/entry/' + getEntrypoints()[0]}>{getEntrypoints()[0]}</Link> as your exploit
          </div>
        ) : (
          <div>
            Unfortuntely it looks like there are no exploits for your system+version at the moment!
          </div>
        )}

        {otherEntrypoints()}
      </div>
    )
  }
}
