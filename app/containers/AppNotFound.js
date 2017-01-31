import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import section from './cssModules/section.scss'

export default class AppNotFound extends Component {
  render () {
    return (
      <section>
        <h2 className={section.title}>Not Found</h2>
        <div className={section.content}>
          Not Found
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
        </div>
      </section>
    )
  }
}
