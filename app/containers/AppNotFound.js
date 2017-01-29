import React, { Component } from 'react'

import { browserHistory } from 'react-router'

import section from './cssModules/section.scss'
import content from './cssModules/content.scss'

export default class AppNotFound extends Component {
  render () {
    return (
      <section>
        <h2 className={section.title}>Not Found</h2>
        <div className={section.content}>
          Not Found
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
        </div>
      </section>
    )
  }
}
